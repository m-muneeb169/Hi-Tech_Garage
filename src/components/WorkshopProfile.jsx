import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function WorkshopProfile() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fromDashboard = location.state?.fromDashboard;

    const handlePopState = () => {
      // check if came from dashboard
      if (fromDashboard) {
        navigate('/aslam-dashboard', { replace: true });
      } else {
        navigate(-1); // fallback to previous page in history
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [location.state, navigate]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Workshop Profile Page</h1>
    </div>
  );
}

export default WorkshopProfile;
