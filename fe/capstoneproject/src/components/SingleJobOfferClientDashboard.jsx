import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientJobOffers } from '../redux/jobOffersSlice';
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import './SingleJobOfferClientDashboard.css';

const SingleJobOfferClientDashboard = ({ clientId }) => {
  const dispatch = useDispatch();
  const clientJobOffers = useSelector((state) => state.joboffers.jobOffers)

  useEffect(() => {
        dispatch(fetchClientJobOffers(clientId));
  }, [clientId, dispatch]);

  return (
    <>
      {clientJobOffers && clientJobOffers.map(clientJobOffer => (
        <div className='d-flex flex-column my-5 mx-2 job-offer' style={{ width: '250px' }} key={clientJobOffer._id}>
            <div className='header d-flex justify-content-center'>
                <span className='offer-title mx-2'>{clientJobOffer.title.toUpperCase()}</span>
            </div>
          <div className='d-flex flex-column justify-content-between align-items-center'>
            <div className='mt-1'>
            <span className='tags'>                  
            {clientJobOffer.tags?.map((tag, index) => (
                        <React.Fragment key={tag}>
                        {index > 0 && <span className='tag-separator'> | </span>}
                        {tag}
                        </React.Fragment>
                    ))}
            </span>
            </div>
            <div className='mt-1 d-flex flex-column justify-content-between align-items-center'>
                <span className='offer-description info mx-2 p-2 text-center'>{clientJobOffer.description}</span>
            </div>
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <div>
                    <span className='price'>{clientJobOffer.budget.budget_value}{clientJobOffer.budget.budget_unit}</span>
                </div>
                <div>
                    <span className='info'>Deadline: {clientJobOffer.deadline}</span>
                </div>
                <div>
                    <span className='accepted-status'>Last edit on: {clientJobOffer.updatedAt.slice(0, 10)}</span>
                </div>
            </div>
            <div className='mt-2 d-flex justify-content-center align-items-center'>
            <Link to={`/joboffers/${clientJobOffer._id}`}>
                <Button className='edit-button'>Manage</Button>
            </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SingleJobOfferClientDashboard;
