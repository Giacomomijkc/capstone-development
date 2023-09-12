import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDesignerById } from '../redux/designersSlice';

const DesignerInfo = ({ designerId }) => {
  const dispatch = useDispatch();
  const designer = useSelector((state) => state.designers.singleDesigner);
  console.log(designer)

  useEffect(() => {
    dispatch(fetchDesignerById(designerId));
  }, [dispatch, designerId]);

  return (
    <div className='d-flex justify-content-between align-items-center'>
        <div>
            <img className='user-avatar' src={designer?.avatar} alt="designer img" />
        </div> 
        <div>
            <span className='user-nickname'>{designer ? designer.nickname : 'Loading...'}</span>  
        </div> 
    </div>
  );
};

export default DesignerInfo;