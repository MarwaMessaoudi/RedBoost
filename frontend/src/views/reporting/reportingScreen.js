import React, { useState, useEffect } from 'react';
import {
  CCard,
  CForm,
  CRow,
  CCol,
  CFormLabel,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CFormCheck,
  CCardImage,
  CButton,
  CSpinner,
  CFormTextarea
} from '@coreui/react';
import { useSelector, useDispatch } from 'react-redux';
import { loadActivitiesByProgramId } from '../../app/features/activity/activitySlice';
import { loadTasksByActivityId } from '../../app/features/task/taskSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCheckCircle } from 'react-icons/fa';
import { Document, Packer, Paragraph } from 'docx';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default function ReportingScreen() {
  const programs = useSelector((state) => state.programsSlice.programs);
  const activities = useSelector((state) => state.activity.activitiesByProgramId || []);
  const tasksByActivityId = useSelector((state) => state.task.tasksByActivityId || []);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedKpis, setSelectedKpis] = useState({});
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedProgram) {
      dispatch(loadActivitiesByProgramId(selectedProgram._id));
    }
  }, [selectedProgram, dispatch]);

  useEffect(() => {
    if (selectedActivities.length > 0) {
      selectedActivities.forEach((activityId) => {
        dispatch(loadTasksByActivityId(activityId));
      });
    }
  }, [selectedActivities, dispatch]);

  const handleProgramChange = (program) => {
    setSelectedProgram(program);
    setStep(2);
  };

  const handleDownloadReport = async () => {
    // Gather data for the report
    const reportData = {
      program: selectedProgram?.programTitle || 'N/A',
      activities: selectedActivities.map((activityId) => {
        const activity = activities.find((a) => a._id === activityId);
        return {
          name: activity?.name || 'N/A',
          kpis: Object.keys(selectedKpis).map((taskId) => {
            const task = tasksByActivityId.find((t) => t._id === taskId);
            return {
              taskName: task?.taskName || 'N/A',
              selectedKpis: Object.keys(selectedKpis[taskId] || {}).filter(
                (kpiId) => selectedKpis[taskId][kpiId]
              ).map((kpiId) => {
                const kpi = task.kpis.find(k => k._id === kpiId);
                return kpi ? kpi.label : 'Unknown KPI';
              }),
            };
          }),
        };
      }),
      additionalInfo: additionalInfo || 'N/A',
    };
  
    const API_KEY = 'AIzaSyDbXHLNx8MT8mdtu87t8sr4T8Ni18z0lhE';
     // Replace with your actual API key
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  
    try {
      const prompt = `
        Generate a detailed report based on the following data:
        Program: ${reportData.program}
        Activities:
        ${reportData.activities.map(
          (activity) => `
            - Activity Name: ${activity.name}
            - KPIs:
              ${activity.kpis.map(
                (kpi) => `
                * Task: ${kpi.taskName}
                * Selected KPIs: ${kpi.selectedKpis.join(', ')}
              `
              ).join('\n')}
          `
        ).join('\n')}
        Additional Information: ${reportData.additionalInfo}
  
        The report should be clear and concise, focusing on the key aspects of the program and activities, including the KPIs for each task. Format the response as plain text, with no extra symbols or explanations.
      `;
  
      const result = await model.generateContent(prompt);
  
      if (result?.response?.text) {
        const generatedText = await result.response.text();
        
        // Create a new Word document
        const doc = new Document();
  
        // Add content to the document
        doc.addSection({
          children: [
            new Paragraph({
              text: 'Reporting Information',
              heading: 'Heading1',
            }),
            new Paragraph({
              text: `Program: ${reportData.program}`,
            }),
            new Paragraph({
              text: 'Activities:',
            }),
            ...reportData.activities.map((activity) => [
              new Paragraph({
                text: `Activity: ${activity.name}`,
                bullet: { level: 0 },
              }),
              new Paragraph({
                text: 'KPIs:',
              }),
              ...activity.kpis.map((kpi) => new Paragraph({
                text: `Task: ${kpi.taskName}, KPIs: ${kpi.selectedKpis.join(', ')}`,
                bullet: { level: 1 },
              })),
            ]).flat(),
            new Paragraph({
              text: `Additional Information: ${reportData.additionalInfo}`,
            }),
            new Paragraph({
              text: generatedText, // Add generated AI content to the document
            }),
          ],
        });
  
        // Create a Blob from the document
        const blob = await Packer.toBlob(doc);
        const url = URL.createObjectURL(blob);
  
        // Create an anchor element to trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'report.docx'; // Set the file name
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url); // Clean up the URL object
  
      } else {
        throw new Error('Empty response or missing data.');
      }
    } catch (error) {
      console.error('Error generating or downloading report:', error);
      toast.error('Error generating or downloading report. ' + error.message);
    }
  };
  
  const handleActivityChange = (activityId) => {
    setSelectedActivities((prevState) =>
      prevState.includes(activityId)
        ? prevState.filter((id) => id !== activityId)
        : [...prevState, activityId]
    );
  };

  const handleKpiCheckboxChange = (taskId, kpiId) => {
    setSelectedKpis((prevState) => ({
      ...prevState,
      [taskId]: {
        ...(prevState[taskId] || {}),
        [kpiId]: !(prevState[taskId] && prevState[taskId][kpiId]),
      },
    }));
  };

  const handleNextStep = () => {
    if (step === 1 && !selectedProgram) {
      toast.error("Please select a program to proceed.");
      return;
    }

    if (step === 2 && selectedActivities.length === 0) {
      toast.error("Please select at least one activity to proceed.");
      return;
    }

    if (step === 3 && Object.keys(selectedKpis).length === 0) {
      toast.error("Please select at least one KPI to proceed.");
      return;
    }

    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const calculateProgress = () => {
    switch (step) {
      case 1:
        return 25; // 1/4 of the form is completed
      case 2:
        return 50; // 2/4 of the form is completed
      case 3:
        return 75; // 3/4 of the form is completed
      case 4:
        return 100; // The form is fully completed
      default:
        return 0;
    }
  };

  const renderStep1 = () => (
    <div style={{ maxWidth: '50rem', overflowX: 'auto' }}>
      <CFormLabel>Pick the Program</CFormLabel>
      {programs.length === 0 ? (
        <p>No programs available.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
          {programs.map((program) => (
            <CCard
              className="m-4"
              key={program._id}
              style={{ flex: '0 0 auto', maxWidth: '100rem' }}
            >
              <CCardImage src={program.logo} height="100rem" width="100rem" />
              <CFormCheck
                type="radio"
                id={program._id}
                label={program.programTitle}
                name="program"
                onChange={() => handleProgramChange(program)}
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              />
            </CCard>
          ))}
        </div>
      )}
    </div>
  );

  const renderStep2 = () => (
    <div style={{ height:'50%', overflowX: 'auto', marginTop: '2rem' }}>
      <CFormLabel>Pick an Activity</CFormLabel>
      {activities.length === 0 ? (
        <p>No activities available for the selected program.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
          {activities.map((activity) => (
            <CCard
              className="m-4 p-4"
              key={activity._id}
              style={{ flex: '0 0 auto', maxWidth: '100rem' }}
              textBgColor={activity.color}
            >
              <CFormCheck
                type="checkbox"
                id={activity._id}
                label={activity.name}
                name="activity"
                checked={selectedActivities.includes(activity._id)}
                onChange={() => handleActivityChange(activity._id)}
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              />
            </CCard>
          ))}
        </div>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div style={{ height: '50%',width:'100%' ,overflowX: 'auto' }}>
      <CFormLabel>Activity KPIs</CFormLabel>
      {selectedActivities.length === 0 ? (
        <p>No activities selected.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
          {selectedActivities.map((activityId) => {
            const activity = activities.find((a) => a._id === activityId);
            if (!activity) return null; // Skip if activity is not found
  
            return tasksByActivityId
              .filter((task) => task.status === 'valid')
              .map((task) => (
                <CCard
                  key={task._id}
                  className="m-2 p-2"
                  style={{ flex: '0 0 auto', maxWidth: '100rem' }}
                  textBgColor={activity.color}
                >
                  <CCardBody>
                    <h6>Task: {task.taskName}</h6>
                      {task.kpis && task.kpis.length > 0 ? (
                        task.kpis.map((kpi) => (
                          <CFormCheck
                            key={kpi._id}
                            type="checkbox"
                            id={`${task._id}-${kpi._id}`}
                            label={kpi.label}
                            name={`kpi-${task._id}`}
                           
                            checked={
                              selectedKpis[task._id] && selectedKpis[task._id][kpi._id]
                            }
                            onChange={() => handleKpiCheckboxChange(task._id, kpi._id)}
                            style={{
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              marginRight: '1rem',
                            }}
                          />
                        ))
                      ) : (
                        <p>No KPIs available for this task.</p>
                      )}
                    
                  </CCardBody>
                </CCard>
              ));
          })}
        </div>
      )}
    </div>
  );

  const renderStep4 = () => (
    <div style={{ height: '50%', width: '100%', marginTop: '2rem' }}>
      <CFormLabel>Additional Information</CFormLabel>
      <CFormTextarea
        id="additionalInfo"
        rows="4"
        
        value={additionalInfo}
        onChange={(e) => setAdditionalInfo(e.target.value)}
      />
    </div>
  );

  const progress = calculateProgress();

  return (
    <div style={{ justifyContent: 'center', height: '100vh' }}>
      <ToastContainer />
      <CRow>
        <CCol>
          <CCard style={{ height: '24rem', maxWidth: '100vh' }}>
            <CCardHeader>
              <CCardTitle>Reporting Information</CCardTitle>
            </CCardHeader>
            <CCardBody>
              <CForm>
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
                {step === 4 && renderStep4()}
                <div style={{ marginTop: '0.5rem' }}>
                  {step > 1 && (
                    <CButton color="secondary" onClick={handlePreviousStep}>
                      Previous
                    </CButton>
                  )}
                  {step < 4 && (
                    <CButton
                      color="primary"
                      onClick={handleNextStep}
                      style={{ marginLeft: '1rem' }}
                    >
                      Next
                    </CButton>
                  )}
                </div>
              </CForm>
              
            </CCardBody>
          </CCard>
        </CCol>
        <CCol>
  <CCard style={{ height: '50vh', padding: '10vh' }}>
    <CCardBody>
      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
        {progress === 100 ? (
          <>
            <FaCheckCircle size={50} color="green" />
            <br/>
            <CButton color="success" style={{ marginTop: '1rem' }} onClick={handleDownloadReport}>
              Download Report
            </CButton>
          </>
        ) : (
          <>
            <CSpinner 
              color={
                step === 1 ? 'info' : 
                step === 2 ? 'warning' : 
                step === 3 ? 'danger' : 
                'primary'
              }
            />
            <div style={{ marginTop: '1rem', fontSize: '1.5rem' }}>
              Step {step} of 4
            </div>
          </>
        )}
      </div>
    </CCardBody>
  </CCard>
</CCol>

      </CRow>
    </div>
  );
}
