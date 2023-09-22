import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDesignerDeals, startDeal, endDeal, deleteDeal } from '../redux/dealsSlice';
import { fetchClients } from '../redux/clientsSlice';
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import './SingleDealDesignerDashboard.css';

const SingleDealDesignerDashboard = ({ designerId }) => {
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
          case 'in progress':
            return 'status-blu'; 
          default:
            return ''; 
        }
      };


    const dispatch = useDispatch();
    const designerDeals = useSelector((state) => state.deals.designerDeals)
    const clients = useSelector((state) => state.clients.clients)
    console.log(designerDeals)

    useEffect(() => {
        dispatch(fetchDesignerDeals(designerId));
        dispatch(fetchClients());
    }, [dispatch, designerId]);

    console.log(clients)

    const handleStartDeal = async (dealId) => {
      await dispatch(startDeal(dealId));
      await dispatch(fetchDesignerDeals(designerId));
      console.log('lanciato fetchDesignerDeals')
      await dispatch(fetchClients());
      console.log('lanciato fetchClients')
    }

    const handleEndDeal = async (dealId) => {
      await dispatch(endDeal(dealId));
      await dispatch(fetchDesignerDeals(designerId));
      console.log('lanciato fetchDesignerDeals')
      await dispatch(fetchClients());
      console.log('lanciato fetchClients')
    }

    const handleDeleteDeal = async (dealId) => {
      await dispatch(deleteDeal(dealId));
      await dispatch(fetchDesignerDeals(designerId));
      console.log('lanciato fetchDesignerDeals')
      await dispatch(fetchClients());
      console.log('lanciato fetchClients')
    }
    
  return (
    <>
{designerDeals && designerDeals.map(designerDeal => {
  const client = clients?.find(c => c._id === designerDeal.client);
  return (
    <div className='d-flex flex-column my-5 mx-2 deal' style={{ width: '350px' }} key={designerDeal._id}>
      {client && (
        <div className='d-flex justify-content-between align-items-center'>
          <Link className='links' to={`/clients/${client._id}`}>
            <div>
              <img className='user-avatar' src={client.avatar} alt="client img" />
            </div> 
            <div>
              <span className='user-nickname'>{client.company}</span>  
            </div> 
          </Link>
        </div>
      )}
      <div className='d-flex justify-content-center align-items-center'>
        <div className='mt-2'>
          <span className='info'>{designerDeal.description}</span>
        </div>
      </div>
      <div className='d-flex justify-content-center align-items-center'>
        <div className='mt-2'>
          <span className='tags'>                  
          {designerDeal.tags?.map((tag, index) => (
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
          <span className=''>Reworks included: {designerDeal.rework_limit}</span>
        </div>
      </div>
      <div className='d-flex justify-content-between align-items-center'>
        <div className='mt-2'>
        <span className='amount'>{designerDeal.timing.timing_value} {designerDeal.timing.timing_unit}</span>
        </div>
        <div className='mt-2'>
          <span className='amount'>{designerDeal.amount.amount_value} {designerDeal.amount.amount_unit}</span>
        </div>
      </div>
      <div>
      {designerDeal.status === 'accepted' && (
          <div className='d-flex justify-content-center align-items-center mt-2'>
            <span className='accepted-status'>Accepted on: {designerDeal.updatedAt.slice(0, 10)}</span>
          </div>
        )}

        {designerDeal.status === 'offered' && (
          <div className='d-flex justify-content-center align-items-center mt-2'>
            <span className='accepted-status'>Offered on: {designerDeal.updatedAt.slice(0, 10)}</span>
          </div>
        )}

        {designerDeal.status === 'denied' && (
          <div className='d-flex justify-content-center align-items-center mt-2'>
            <span className='accepted-status'>Denied on: {designerDeal.updatedAt.slice(0, 10)}</span>
          </div>
        )}

        {designerDeal.status === 'in progress' && (
          <div className='d-flex justify-content-center align-items-center mt-2'>
            <span className='accepted-status'>In progress on: {designerDeal.updatedAt.slice(0, 10)}</span>
          </div>
        )}

        {designerDeal.status === 'completed' && (
          <div className='d-flex justify-content-center align-items-center mt-2'>
            <span className='accepted-status'>Completed on: {designerDeal.updatedAt.slice(0, 10)}</span>
          </div>
        )}
      </div>
              {/* Gestione dinamica in base allo stato */}
              <div className='d-flex justify-content-between align-items-center mt-3'>
          <div>
            {/* Stato OFFERED */}
            {designerDeal.status === 'offered' && (
              <span className='status-text'>Waiting for Client Action</span>
            )}
            {/* Stato ACCEPTED */}
            {designerDeal.status === 'accepted' && (
              <>
              <div className='d-flex justify-content-center align-itmes-center'>
              <Button className='edit-deal-buttons mx-2' onClick={() => handleStartDeal(designerDeal._id)}>Start</Button>
              </div>
              </>
            )}
            {/* Stato DENIED */}
            {designerDeal.status === 'denied' && (
            <>
            <div className='d-flex justify-content-center align-itmes-center'>
            <Button className='edit-deal-buttons mx-2' onClick={() => handleDeleteDeal(designerDeal._id)}>Delete</Button>
            </div>
            </>
            )}
            {/* Stato IN PROGRESS */}
            {designerDeal.status === 'in progress' && (
              <>
              <div className='d-flex justify-content-center align-itmes-center'>
              <Button className='edit-deal-buttons mx-2' onClick={() => handleEndDeal(designerDeal._id)}>End</Button>
              </div>
              </>
            )}
            {/* Stato COMPLETED */}
            {designerDeal.status === 'completed' && (
              <>
              <div className='d-flex justify-content-center align-itmes-center'>
                <Link className='links' >
                  <Button className='edit-deal-buttons mx-2'>Invoice</Button>
                </Link>
              </div>
              </>
            )}
          </div>
          <div>
            <span className={`${getStatusClass(designerDeal.status)}`}>{designerDeal.status.toUpperCase()}</span>
          </div>
        </div>
    </div>
  );
})}
  </>
  )
}



export default SingleDealDesignerDashboard