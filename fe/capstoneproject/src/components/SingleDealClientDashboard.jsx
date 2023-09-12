import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientDeals } from '../redux/dealsSlice';
import DesignerInfo from './DesignerInfo';
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import './SingleDealClientDashboard.css';

const SingleDealClientDashboard = ({ clientId }) => {
    const getStatusClass = (status) => {
        switch (status) {
          case 'offered':
            return 'status-yellow'; 
          case 'accepted':
            return 'status-green'; 
          case 'denied':
            return 'status-red'; 
          case 'completed':
            return 'status-purple'; 
          default:
            return ''; 
        }
      };


    const dispatch = useDispatch();
    const clientDeals = useSelector((state) => state.deals.clientDeals)

    useEffect(() => {
        dispatch(fetchClientDeals(clientId));
    }, [dispatch, clientId]);
    
  return (
    <>
    {clientDeals && clientDeals.map(clientDeal => (
      <div className='d-flex flex-column my-5 mx-2 deal' style={{ width: '300px' }} key={clientDeal._id}>
          {clientDeal.designer && (
        <DesignerInfo designerId={clientDeal.designer} />
      )}
        <div className='d-flex justify-content-center align-items-center'>
          <div className='mt-2'>
            <span className='info'>{clientDeal.description}</span>
          </div>
        </div>
        <div className='d-flex justify-content-center align-items-center'>
          <div className='mt-2'>
            <span className='tags'>                  
            {clientDeal.tags?.map((tag, index) => (
                        <React.Fragment key={tag}>
                        {index > 0 && <span className='tag-separator'> | </span>}
                        {tag}
                        </React.Fragment>
                    ))}
            </span>
          </div>
        </div>
        <div className='d-flex justify-content-center align-items-center'>
          <div className='info mt-2'>
            <span className=''>Reworks included: {clientDeal.rework_limit}</span>
          </div>
        </div>
        <div className='d-flex justify-content-between align-items-center'>
          <div className='mt-2'>
          <span className='amount'>{clientDeal.timing.timing_value} {clientDeal.timing.timing_unit}</span>
          </div>
          <div className='mt-2'>
            <span className='amount'>{clientDeal.amount.amount_value} {clientDeal.amount.amount_unit}</span>
          </div>
        </div>
        <div>
  {clientDeal.status === 'accepted' && (
    <div className='d-flex justify-content-center align-items-center mt-2'>
      <span className='accepted-status'>Accepted on: {clientDeal.updatedAt.slice(0, 10)}</span>
    </div>
  )}

  {clientDeal.status === 'offered' && (
    <div className='d-flex justify-content-center align-items-center mt-2'>
      <span className='accepted-status'>Offered on: {clientDeal.updatedAt.slice(0, 10)}</span>
    </div>
  )}

  {clientDeal.status === 'denied' && (
    <div className='d-flex justify-content-center align-items-center mt-2'>
      <span className='accepted-status'>Denied on: {clientDeal.updatedAt.slice(0, 10)}</span>
    </div>
  )}

  {clientDeal.status === 'in progress' && (
    <div className='d-flex justify-content-center align-items-center mt-2'>
      <span className='accepted-status'>In progress on: {clientDeal.updatedAt.slice(0, 10)}</span>
    </div>
  )}

  {clientDeal.status === 'completed' && (
    <div className='d-flex justify-content-center align-items-center mt-2'>
      <span className='accepted-status'>Completed on: {clientDeal.updatedAt.slice(0, 10)}</span>
    </div>
  )}
</div>
        <div className='d-flex justify-content-between align-items-center mt-3'>
            <div>
            <Link to={`/deals/${clientDeal._id}`}>
                <Button className='edit-deal-button'>Manage</Button>
            </Link>
            </div>
            <div>
                <span className={`${getStatusClass(clientDeal.status)}`}>{clientDeal.status.toUpperCase()}</span>
            </div>
        </div>
      </div>
    ))}
  </>
  )
}

export default SingleDealClientDashboard