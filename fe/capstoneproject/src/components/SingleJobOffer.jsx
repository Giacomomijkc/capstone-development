import React from 'react'
import { Link } from 'react-router-dom';  
import Button from "react-bootstrap/Button";
import './SingleJobOffer.css';

const SingleJobOffer = ({jobOffer}) => {
  return (
    <div className='d-flex flex-column my-5 mx-2 job-offer' style={{ width: '250px' }} key={jobOffer._id}>
            <div className='header d-flex justify-content-center'>
                <span className='offer-title mx-2'>{jobOffer.title.toUpperCase()}</span>
            </div>
          <div className='d-flex flex-column justify-content-between align-items-center'>
            <div className='mt-1'>
            <span className='tags'>                  
            {jobOffer.tags?.map((tag, index) => (
                        <React.Fragment key={tag}>
                        {index > 0 && <span className='tag-separator'> | </span>}
                        {tag}
                        </React.Fragment>
                    ))}
            </span>
            </div>
            <div className='mt-1 d-flex flex-column justify-content-between align-items-center'>
                <span className='offer-description info mx-2 p-2 text-center'>{jobOffer.description}</span>
            </div>
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <div>
                    <span className='price'>{jobOffer.budget.budget_value} {jobOffer.budget.budget_unit}</span>
                </div>
                <div>
                    <span className='info'>Deadline: {jobOffer.deadline}</span>
                </div>
                <div>
                    <span className='accepted-status'>Last edit on: {jobOffer.updatedAt.slice(0, 10)}</span>
                </div>
            </div>
            <div className='mt-2 d-flex justify-content-center align-items-center'>
            <Link>
                <Button className='make-deal-button my-2'>Make Deal</Button>
            </Link>
            </div>
          </div>
        </div>
  )
}

export default SingleJobOffer