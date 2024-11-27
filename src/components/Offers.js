import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Offers.css';

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        console.log(token);
        const response = await axios.get('http://localhost:8080/api/v1/student/offers', {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },        }); 
        console.log(response)
        setOffers(response.data);
      } catch (error) {
        console.error('Error fetching offers', error);
      }
    };
    fetchOffers();
  }, []);


  
  
  const handleApply = async (offerId) => {
  //   try {
  //     const token = localStorage.getItem('jwtToken');
  //     await axios.post(
  //       `http://localhost:8080/apply/${offerId}`,
  //       { cvLink },
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  //     alert('Application submitted successfully!');
  //   } catch (error) {
  //     console.error('Error applying', error);
  //     alert('Failed to apply. Please try again.');
  //   }
  // };
  console.log("here",offerId);
  navigate(`/apply/${offerId}`);
  };

  return (
    <div className="offers-container">
      <h2 className="offers-title">Available Offers</h2>
      <div className="offers-list">
        {offers.map((offer) => (
          <div key={offer.id} className="card offer-card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{offer.jobProfile}</h5>
              <p className="card-text">{offer.organisationName
              }</p>
              <p className="card-text">{offer.jobDescription}</p>
              <p className="card-text">{offer.organisationAddress}</p>
              <p className="card-text">{offer.requiredDomain}</p>
              <p className="card-text">{offer.requiredGrade}</p>
              <p className="card-text">{offer.requiredSpecialisation}</p>
              <button
                className="btn btn-primary"
                onClick={() => handleApply(offer.placement_id)}
              >
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
