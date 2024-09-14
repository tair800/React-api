import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import "./index.css";

function Login() {
  const [userNameOrEmail, setUserNameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handlePostRequest = async (e) => {
    e.preventDefault();
    const postData = {
      userNameOrEmail,
      password,
    };
    try {
      console.log(postData);
      const response = await axios.post('http://localhost:7261/api/Auth/login', postData);

      if (response.status === 200) {
        const token = response.data.token; 
        localStorage.setItem('authToken', token); 
        setSuccess('Login successful!');
        setError("");  
        navigate('/');
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        const validationErrors = error.response.data.errors;
        setError(Object.values(validationErrors).flat().join('. ')); // Display validation errors
      } else {
        setError('Login failed. Please try again.');
      }
      setSuccess("");  // Clear success message
      console.error('Error:', error.response ? error.response.data : error.message); // Debugging: Log the error
    }
  };

  return (
    <div className="logins">
      <MDBContainer fluid>
        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol col='12'>
            <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
              <form onSubmit={handlePostRequest}>
                <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">Please enter your login and password!</p>

                  <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Email address' id='formControlLg' type='text' size="lg" value={userNameOrEmail} onChange={(e) => setUserNameOrEmail(e.target.value)} />
                  <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg2' type='password' size="lg" value={password} onChange={(e) => setPassword(e.target.value)} />

                  {error && <p style={{ color: 'red' }}>{error}</p>}
                  {success && <p style={{ color: 'green' }}>{success}</p>}

                  <p className="small mb-3 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>
                  
                  <MDBBtn type="submit" outline className='mx-2 px-5 border-1 border-white text-white' color='white' size='lg'>
                    Login
                  </MDBBtn>
                  <br />
                  <div>
                    <p className="mb-0">Don't have an account? <Link to="/SignUp" className='text-white-50 fw-bold'>Sign Up</Link></p>
                  </div>
                </MDBCardBody>
              </form>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Login;







