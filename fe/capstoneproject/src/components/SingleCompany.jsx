import React from 'react';
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';

const SingleCompany = ({client}) => {
  return (
    <div className='d-flex justify-content-between align-items-center container-designer my-3 p-2' style={{ width: '600px' }}>
        <img src={client.avatar} alt="designer avatar" className='user-avatar'/>
        <span className='designer-nickname'>{client.company}</span>
        <span>{client.description}</span>
        <span className='tags'>                  
            {client.tags?.map((tag, index) => (
                        <React.Fragment key={tag}>
                        {index > 0 && <span className='tag-separator'> | </span>}
                        {tag}
                        </React.Fragment>
                    ))}
            </span>
            <Link to={`/clients/${client._id}`}>
                <Button className='profile-button'>View Profile</Button>
            </Link>
    </div>
  )
}

export default SingleCompany