


import React, { useState } from 'react';
import axios from 'axios';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom'; 
import "./index.css"

function SignUp() {
  const [fullName, setFullname] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setrePassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const handlePostRequest = async (e) => {
    e.preventDefault();

    if (password !== rePassword) {
      setError('Passwords do not match!');
      return;
    }

    const postData = {
      fullName,
      userName,
      email,
      password,
      rePassword
    };

    try {
      const response = await axios.post('http://localhost:7261/api/Auth/register', postData);

      if (response.status === 201) {
        setSuccess('Registration successful!');
        setError("");  
        console.log('Response:', response.data);
        navigate('/login');
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <MDBContainer fluid>
      <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

              <form onSubmit={handlePostRequest}>
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size='lg' />
                  <MDBInput label='Your FullName' id='form0' type='text' className='w-100' value={fullName} onChange={(e) => setFullname(e.target.value)} />
                </div>

                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size='lg' />
                  <MDBInput label='Your UserName' id='form1' type='text' className='w-100' value={userName} onChange={(e) => setUserName(e.target.value)} />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size='lg' />
                  <MDBInput label='Your Email' id='form2' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size='lg' />
                  <MDBInput label='Password' id='form3' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="key me-3" size='lg' />
                  <MDBInput label='Repeat your password' id='form4' type='password' value={rePassword} onChange={(e) => setrePassword(e.target.value)} />
                </div>

                <button className='mb-4' size='lg' type='submit'>Register</button>

                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}

              </form>

            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
            </MDBCol>

          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default SignUp;
