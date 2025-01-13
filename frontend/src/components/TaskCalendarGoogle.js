import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { CSpinner, CAlert, CButton } from '@coreui/react';
import './TaskCalendar.css';

const TaskCalendarGoogle = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (session?.provider_token) {
      loadGoogleTasks();
    }
  }, [session]);

  const loadGoogleTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get fresh session
      const { data: { session: currentSession }, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError) throw sessionError;

      if (!currentSession?.provider_token) {
        throw new Error('No valid session found. Please sign in again.');
      }

      console.log('Fetching task lists...');

      // First get all task lists
      const listsResponse = await fetch(
        'https://tasks.googleapis.com/tasks/v1/users/@me/lists',
        {
          headers: {
            'Authorization': `Bearer ${currentSession.provider_token}`,
            'Accept': 'application/json',
          },
        }
      );

      if (!listsResponse.ok) {
        console.error('Lists Response:', listsResponse);
        throw new Error(`Failed to fetch task lists: ${listsResponse.statusText}`);
      }

      const lists = await listsResponse.json();
      console.log('Task lists:', lists);

      // Fetch tasks from all lists
      const allTasks = [];
      for (const list of lists.items) {
        const tasksResponse = await fetch(
          `https://tasks.googleapis.com/tasks/v1/lists/${list.id}/tasks?showCompleted=true&showHidden=true`,
          {
            headers: {
              'Authorization': `Bearer ${currentSession.provider_token}`,
              'Accept': 'application/json',
            },
          }
        );

        if (!tasksResponse.ok) {
          console.error(`Failed to fetch tasks for list ${list.title}:`, tasksResponse);
          continue; // Skip this list if there's an error, but continue with others
        }

        const tasksData = await tasksResponse.json();
        if (tasksData.items) {
          allTasks.push(...tasksData.items);
        }
      }

      console.log('All tasks:', allTasks);

      // Format tasks for FullCalendar
      const formattedTasks = allTasks
        .filter(task => task && task.due) // Only include tasks with due dates
        .map(task => ({
          id: task.id,
          title: task.title,
          start: task.due.split('T')[0], // Get just the date part
          allDay: true,
          color: task.status === 'completed' ? '#28a745' : '#007bff',
          extendedProps: {
            description: task.notes,
            status: task.status,
            listId: task.listId,
          },
        }));

      console.log('Formatted tasks:', formattedTasks);
      setEvents(formattedTasks);

    } catch (error) {
      console.error('Error loading tasks:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle clicking on a task
  const handleEventClick = async (clickInfo) => {
    try {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      const taskId = clickInfo.event.id;
      const listId = clickInfo.event.extendedProps.listId;
      const newStatus = clickInfo.event.extendedProps.status === 'completed' ? 'needsAction' : 'completed';

      const response = await fetch(
        `https://tasks.googleapis.com/tasks/v1/lists/${listId}/tasks/${taskId}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${currentSession.provider_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: newStatus,
            completed: newStatus === 'completed' ? new Date().toISOString() : null,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update task status');
      }

      // Reload tasks to show updated status
      await loadGoogleTasks();
    } catch (error) {
      console.error('Error updating task:', error);
      setError('Failed to update task status');
    }
  };

  const handleSignInClick = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          scope: [
            'email',
            'profile',
            'https://www.googleapis.com/auth/tasks',
            'https://www.googleapis.com/auth/tasks.readonly'
          ].join(' '),
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in:', error);
      setError('Failed to sign in with Google');
    }
  };

  if (!session) {
    return (
      <div className="text-center p-3">
        <CButton
          color="primary"
          onClick={handleSignInClick}
        >
          Sign in with Google to view tasks
        </CButton>
      </div>
    );
  }

  return (
    <div className="fullcalendar-container">
      {error && (
        <CAlert color="danger" dismissible onClose={() => setError(null)}>
          {error}
        </CAlert>
      )}

      <div className="mb-3">
        <CButton
          color="primary"
          onClick={loadGoogleTasks}
          disabled={loading}
        >
          Refresh Tasks
        </CButton>
      </div>

      {loading ? (
        <div className="text-center p-3">
          <CSpinner color="primary" />
        </div>
      ) : (
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventClick={handleEventClick}
          eventContent={(eventInfo) => (
            <div className="event-content">
              <div style={{
                display: 'flex',
                alignItems: 'center',
                opacity: eventInfo.event.extendedProps.status === 'completed' ? 0.7 : 1
              }}>
                <span style={{
                  textDecoration: eventInfo.event.extendedProps.status === 'completed'
                    ? 'line-through'
                    : 'none'
                }}>
                  {eventInfo.event.title}
                </span>
              </div>
            </div>
          )}
          eventMouseEnter={(mouseEnterInfo) => {
            mouseEnterInfo.el.style.cursor = 'pointer';
            mouseEnterInfo.el.style.transition = 'transform 0.2s, box-shadow 0.2s';
            mouseEnterInfo.el.style.transform = 'scale(1.05)';
            mouseEnterInfo.el.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
          }}
          eventMouseLeave={(mouseLeaveInfo) => {
            mouseLeaveInfo.el.style.transform = 'none';
            mouseLeaveInfo.el.style.boxShadow = 'none';
          }}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay',
          }}
          height="auto"
          contentHeight="auto"
        />
      )}
    </div>
  );
};

export default TaskCalendarGoogle;
