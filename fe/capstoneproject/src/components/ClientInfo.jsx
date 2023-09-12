import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClientById } from '../redux/clientsSlice';

const ClientInfo = ({ clientId }) => {
  const dispatch = useDispatch();
  const client = useSelector((state) => state.clients.client);

  useEffect(() => {
    dispatch(fetchClientById(clientId));
  }, [dispatch, clientId]);

  return (
    <div className='d-flex justify-content-between align-items-center'>
        <div>
            <img className='user-avatar' src={client?.avatar} alt="client img" />
        </div> 
        <div>
            <span className='user-nickname'>{client ? client.company : 'Loading...'}</span>  
        </div> 
    </div>
  );
};

export default ClientInfo;