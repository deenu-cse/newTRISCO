import React, { useState } from 'react';
import '../Styles/Authform.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function SignUp() {
  const [gkv, setGkv] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rollNo: '',
    collegeName: '',
    idCard: null,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      idCard: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = new FormData();

    submitData.append('name', formData.name);
    submitData.append('email', formData.email);
    submitData.append('password', formData.password);
    submitData.append('gkv', gkv ? 'true' : 'false');

    if (gkv) {
      submitData.append('rollNo', formData.rollNo);
      submitData.append('idCard', formData.idCard);
    } else {
      submitData.append('collegeName', formData.collegeName);
    }

    try {
      const response = await fetch('http://localhost:3000/signUp', {
        method: 'POST',
        body: submitData,
      });

      const resdata = await response.json();

      if (response.ok) {
        localStorage.setItem('userToken', resdata.userToken);
        localStorage.setItem('studentId', resdata.studentId);
        console.log('Success:', resdata);
        setFormData({
          name: '',
          email: '',
          password: '',
          rollNo: '',
          collegeName: '',
          idCard: null,
        });
        toast.success(resdata.message);
      } else {
        console.error('Backend Error:', resdata);
        toast.error(resdata.error || resdata.message);
      }
    } catch (error) {
      console.error('Error during sign-up process:', error);
      toast.error('An error occurred while signing up. Please try again later.');
    }
  };


  return (
    <>
      <ToastContainer />
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" placeholder="Enter your full name" required onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="email">Collage Email</label>
            <input type="email" id="email" placeholder="Enter your collage email" required onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" required onChange={handleChange} />
          </div>

          <label>Are you a GKV student?</label>

          <div className="flexgkv">
            <div className="form-group flex">
              <input type="radio" id="gkvYes" name="gkvStudent" onClick={() => setGkv(true)} required />
              <label htmlFor="gkvYes">Yes</label>
            </div>

            <div className="form-group flex">
              <input type="radio" id="gkvNo" name="gkvStudent" onClick={() => setGkv(false)} required />
              <label htmlFor="gkvNo">No</label>
            </div>
          </div>

          {gkv && (
            <>
              <div className="form-group">
                <label htmlFor="rollNo">Roll No.</label>
                <input type="number" id="rollNo" placeholder="Your GKV roll no." required onChange={handleChange} />
              </div>

              <div className="form-group">
                <label htmlFor="idCard">ID Card</label>
                <input type="file" id="idCard" accept="image/*" required onChange={handleFileChange} />
              </div>
            </>
          )}

          {!gkv && (
            <div className="form-group">
              <label htmlFor="collegeName">College Name</label>
              <input type="text" id="collegeName" placeholder="Your college name..." required onChange={handleChange} />
            </div>
          )}

          <button type="submit" className="signup-btn">Create Account</button>

          <p className="login-text">
            Already have an account? <a href="/userAuth/login">Log In</a>
          </p>
        </form>
      </div>
    </>
  );
}
