import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ApplyPlacement.css';

const ApplyPlacement = () => {
  const params = useParams(); // Get all params

  console.log("All params:", params); 
  const { offerId: placementId } = params;
  const [cvFile, setCvFile] = useState(null);
  const [about, setAbout] = useState('');
  const [error, setError] = useState('');

  // const handleCvChange = (e) => {
  //   setCvFile(e.target.files[0]);
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!cvFile || !about) {
      setError('Please upload a CV and provide details about your application.');
      return;
    }

    try {
      // const formData = new FormData();
      // formData.append('placementId', placementId);
      // formData.append('cvFile', cvFile);
      // formData.append('about', about);
      const token = localStorage.getItem('jwtToken');
      console.log("here**",placementId)
      const response = await axios.post(
        'http://localhost:8080/api/v1/student/apply',
        {
          placement_id: placementId,
          cv_application: cvFile,
          about: about,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      alert('Application submitted successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Failed to apply placement', error);
      alert('Failed to submit application. Please try again.');
    }
  };


  return (
    <div className="apply-container">
    <div className="apply-form-card">
      <h2 className="apply-title">Apply for Placement</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">About</label>
          <textarea
            className="form-control"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Upload CV</label>
          <input
            type="text"
            className="form-control"
            value={cvFile}
            onChange={(e) => setCvFile(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary w-100">
          Apply
        </button>
      </form>
    </div>
  </div>
  );
};

export default ApplyPlacement;
