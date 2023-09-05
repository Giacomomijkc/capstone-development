import React from 'react';
import './SingleProject.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';

const SingleProject = ({project, authorDesigner}) => {
  return (
    <>
    <div className='d-flex flex-column my-5' style={{ width: '250px' }}>
        <img className='project-cover' alt='project-cover' src={project.cover} />
        <div className='d-flex justify-content-between align-items-center'>
            <div className='mt-2'>
                {authorDesigner && (
                <>
                <img className='author-avatar mx-2' src={authorDesigner.avatar} />
                <span className='author-nickname mx-2'>{authorDesigner.nickname}</span>
                </>
            )} 
            </div>
            <div className='mt-2'>
                <span className='project-like'><FontAwesomeIcon icon={faHeart} className='mx-2' />{project.likes.length}</span>
                <span className='project-comment'> <FontAwesomeIcon icon={faComment} className='mx-2' />{project.comments.length}</span>
            </div>
        </div>
      </div>
    </>
  )
}

export default SingleProject