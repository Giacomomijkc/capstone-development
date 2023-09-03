import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setAvatarURL, uploadAvatar, registerDesigner } from '../redux/designersSlice';
import './SignUpDesignerForm.css';

const SignUpDesignerForm = () => {

        const [showForm, setShowForm] = useState(false);
      
        const handleShowForm = () => {
          setShowForm(true);
        };
      
        const handleCloseForm = () => {
          setShowForm(false);
        };

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        nickname: '',
        description: '',
        tags: [],
        website: '',
        instagram: '',
        email: '',
        password: '',
        address: '',
        vatOrCf: '',
        //avatar: null,
    });

    const avatarURL = useSelector((state) => state.designers.avatarURL);
    const error = useSelector((state) => state.designers.error);

    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'tags') {
            setFormData({
                ...formData,
                [name]: value.split(',').map(tag => tag.trim()),
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    console.log(formData)

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const uploadData = new FormData();
        uploadData.append('avatar', file);
    
        try {
            await dispatch(uploadAvatar(uploadData));
            //dispatch(setAvatarURL(avatarURL)); // Imposta l'URL dell'avatar nello stato di Redux
        } catch (error) {
            console.error('File upload failed:', error);
        }
    };

    console.log(avatarURL)

    const handleSubmit = async (e) => {
        e.preventDefault();
    
    
        const designerData = {
            ...formData,
            avatar: avatarURL,
        };
    
        try {
            await dispatch(registerDesigner(designerData));
        } catch (error) {
            console.error('Designer registration failed:', error);

        }
    };

    console.log(error)
    

    return (
        <>
        {!showForm && (
        <div className='d-flex flex-column align-items-center signup-buttons'>
            <h1 className='title me-auto mb-4'>Sign up to Hubby!</h1>
            <Button className='button-google-singup'>
                Sign up with Google
            </Button>
                <p className='my-3'>OR</p>
            <Button className='button-email-singup' onClick={handleShowForm}>
                Use your email
            </Button>
        </div>
         )}
            {showForm && (
                <Form style={{ width: '30rem'}} encType='multipart/form-data' className='form' onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className='col-md-6'>
                            <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput1">
                                <Form.Label>Name</Form.Label>
                                <Form.Control 
                                className='input'
                                type="text" 
                                placeholder="Your Name" 
                                name="name"  
                                value={formData.name}
                                onChange={handleInputChange}
                                />
                            </Form.Group>
                        </div>
                        <div className='col-md-6'>
                            <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput2">
                                <Form.Label>Surname</Form.Label>
                                <Form.Control 
                                className='input'
                                type="text" 
                                placeholder="Your Surname" 
                                name="surname" 
                                value={formData.surname}
                                onChange={handleInputChange}
                                />
                            </Form.Group>
                        </div>
                        <div className='col-md-6'>
                            <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput3">
                                <Form.Label>Nickname</Form.Label>
                                <Form.Control 
                                className='input'
                                type="text" 
                                placeholder="Your Nickname" 
                                name="nickname"
                                value={formData.nickname} 
                                onChange={handleInputChange}
                                />
                            </Form.Group>
                        </div>
                        <div className='col-md-6'>
                            <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput4">
                                <Form.Label>Description</Form.Label>
                                <Form.Control 
                                className='input'
                                type="text" 
                                placeholder="Your Description" 
                                name="description" 
                                value={formData.description}
                                onChange={handleInputChange}
                                />
                            </Form.Group>
                        </div>
                        <div className='col-md-6'>
                            <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput5">
                                <Form.Label>Tags</Form.Label>
                                <Form.Control 
                                className='input'
                                type="text" 
                                placeholder="Tags about you" 
                                name="tags" 
                                value={formData.tags}
                                onChange={handleInputChange}
                                />
                            </Form.Group>
                        </div>
                        <div className='col-md-6'>
                            <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput6">
                                <Form.Label>Website</Form.Label>
                                <Form.Control 
                                className='input'
                                type="text" 
                                placeholder="Your website url" 
                                name="website" 
                                value={formData.website}
                                onChange={handleInputChange}
                                />
                            </Form.Group>
                        </div>
                        <div className='col-md-6'>
                            <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput7">
                                <Form.Label>Instagram</Form.Label>
                                <Form.Control 
                                className='input'
                                type="text" 
                                placeholder="Your Ig url" 
                                name="instagram" 
                                value={formData.instagram}
                                onChange={handleInputChange}
                                />
                            </Form.Group>
                        </div>
                        <div className='col-md-6'>
                            <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput8">
                                <Form.Label>Email</Form.Label>
                                <Form.Control 
                                className='input'
                                type="text" 
                                placeholder="Your Email" 
                                name="email"  
                                value={formData.email}
                                onChange={handleInputChange}
                                />
                            </Form.Group>
                        </div>
                        <div className='col-md-6'>
                            <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput9">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                className='input'
                                type="text" 
                                placeholder="Your Password" 
                                name="password" 
                                value={formData.password}
                                onChange={handleInputChange}
                                />
                            </Form.Group>
                        </div>
                        <div className='col-md-6'>
                            <Form.Group className="mb-3" controlId="createPostForm.ControlInput10">
                                <Form.Label>Address</Form.Label>
                                <Form.Control 
                                className='input'
                                type="text" 
                                placeholder="Your Address" 
                                name="address" 
                                value={formData.address}
                                onChange={handleInputChange}
                                />
                            </Form.Group>
                        </div>
                        <div className='col-md-6'>
                            <Form.Group className="mb-3" controlId="createPostForm.ControlInput11">
                                <Form.Label>VAT / Fiscal Code</Form.Label>
                                <Form.Control 
                                className='input'
                                type="text" 
                                placeholder="Your Vat or Fiscal Code" 
                                name="vatOrCf"
                                value={formData.vatOrCf}
                                onChange={handleInputChange} 
                                />
                            </Form.Group>
                        </div>
                        <div className='col-md-6'>
                            <Form.Group className="mb-3" controlId="createPostForm.ControlInput12">
                                <Form.Label>Avatar </Form.Label>
                                <Form.Control 
                                className='input'
                                type="file" 
                                placeholder="Upload an image" 
                                name="avatar"
                                onChange={handleFileUpload} 
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <div className='d-flex flex-column'>
                        <Button
                        className='form-button my-2'
                        type="submit"
                        variant="success"
                        >Create Your Designer Account
                        </Button>
                        <Button className='close-button my-3' onClick={handleCloseForm}>
                            Close
                        </Button>
                        {error && (
                            <div className="alert alert-danger me-auto " role="alert">
                                {error}
                            </div>
                        )}
                    </div>
                </Form>
            )}
        </>
    )
}

export default SignUpDesignerForm;