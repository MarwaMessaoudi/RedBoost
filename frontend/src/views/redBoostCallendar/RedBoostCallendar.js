import React, { useState, useEffect } from 'react';
import RedBoostTaskCalendar from './RedBoostTaskCalendar';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
} from '@coreui/react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useSelector } from 'react-redux';

export default function RedBoostCallendar() {
  const supabase = useSupabaseClient();
  const platformUser = useSelector((state) => state.user); // Adjust based on your Redux store structure
  const [isGoogleSignedIn, setIsGoogleSignedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check Supabase auth status
    const checkGoogleAuthStatus = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error.message);
        setIsGoogleSignedIn(false);
      } else {
        setIsGoogleSignedIn(!!session);
      }
    };

    checkGoogleAuthStatus();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsGoogleSignedIn(!!session);
    });

    // Cleanup listener
    return () => {
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [supabase]);

  const googleSignIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          scopes: [
            'email',
            'profile',
            'https://www.googleapis.com/auth/calendar',
            'https://www.googleapis.com/auth/calendar.events',
          ].join(' '),
          redirectTo: `${window.location.origin}`,
        },
      });
      if (error) throw error;
      console.log('Google sign-in data:', data);
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setIsGoogleSignedIn(false);
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  useEffect(() => {
    setShowModal(!isGoogleSignedIn);
  }, [isGoogleSignedIn]);

  // Check if the user is signed in with Redux user or Supabase
  const isSignedIn = platformUser?.isAuthenticated || isGoogleSignedIn;

  return (
    <>
      {isSignedIn ? (
        <RedBoostTaskCalendar />
      ) : (
        <CModal visible={showModal} onClose={() => setShowModal(false)}>
          <CModalHeader>
            <CModalTitle>Login Required</CModalTitle>
          </CModalHeader>
          <CModalBody>
            Please connect to Gmail to view your RedBoost Agenda.
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={googleSignIn}>
              Login with Gmail
            </CButton>
            <CButton color="secondary" onClick={() => setShowModal(false)}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
      )}
    </>
  );
}
