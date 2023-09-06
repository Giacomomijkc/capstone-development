import React from 'react';
import './SingleProject.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';  

const SingleProject = ({project, authorDesigner}) => {
  return (
    <>
    <div className='d-flex flex-column my-5 mx-2' style={{ width: '250px' }}>
      <Link to={`projects/${project._id}`}>
        <img className='project-cover' alt='project-cover' src={project.cover} />
      </Link>
        <div className='d-flex justify-content-between align-items-center'>
            <div className='mt-2'>
                {authorDesigner && (
                <>
                <Link to={`/designers/${authorDesigner._id}`}>
                  <img className='author-avatar mx-2' alt="Author Avatar" src={authorDesigner.avatar} />
                </Link>
                <span className='author-nickname mx-2'>{authorDesigner.nickname}</span>
                </>
            )} 
            </div>
            <div className='mt-2'>
                <span className='project-like'><FontAwesomeIcon icon={regularHeart} className='mx-2 icons' />{project.likes.length}</span>
                <span className='project-comment'> <FontAwesomeIcon icon={faComment} className='mx-2 icons' />{project.comments.length}</span>
            </div>
        </div>
      </div>
    </>
  )
}

export default SingleProject