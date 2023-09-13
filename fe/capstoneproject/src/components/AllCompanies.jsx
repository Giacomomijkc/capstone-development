import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClients } from '../redux/clientsSlice';
import SingleCompany from './SingleCompany';

const AllCompanies = () => {

    const dispatch = useDispatch();
    const clients = useSelector((state) => state.clients.clients);

    useEffect(() => {;
        dispatch(fetchClients())
    }, [dispatch]);
  return (
    <div className='d-flex flex-column flex-wrap justify-content-center align-items-center'>
    {clients &&
    clients.map((client) => {
        return (
            <SingleCompany client={client} />
        );
        })
    }
    </div>
  )
}

export default AllCompanies