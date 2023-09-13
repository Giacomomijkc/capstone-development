import React from 'react';
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import './SingleDesigner.css';

const SingleDesigner = ({designer}) => {
  return (
    <div className='d-flex justify-content-between align-items-center container-designer my-3 p-2' key={designer._id} style={{ width: '600px' }}>
        <img src={designer.avatar} alt="designer avatar" className='user-avatar'/>
        <span className='designer-nickname'>{designer.nickname}</span>
        <span>{designer.description}</span>
        <span className='tags'>                  
            {designer.tags?.map((tag, index) => (
                        <React.Fragment key={tag}>
                        {index > 0 && <span className='tag-separator'> | </span>}
                        {tag}
                        </React.Fragment>
                    ))}
            </span>
            <Link to={`/designers/${designer?._id}`}>
                <Button className='profile-button'>View Profile</Button>
            </Link>
    </div>
  )
}

export default SingleDesigner;