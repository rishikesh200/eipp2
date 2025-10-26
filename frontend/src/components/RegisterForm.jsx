import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setField, setErrors, setMessage, submitUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css';

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { formData, errors, message } = useSelector((state) => state.user);

  const validate = () => {
    const errs = {};
    if (!formData.firstName) errs.firstName = 'First Name is required';
    if (!formData.lastName) errs.lastName = 'Last Name is required';
    if (!formData.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Invalid email format';
    if (!formData.password) errs.password = 'Password is required';
    else if (formData.password.length < 8) errs.password = 'Password must be at least 8 characters';
    if (formData.confirmPassword !== formData.password) errs.confirmPassword = 'Passwords must match';
    if (!formData.dateOfBirth) errs.dateOfBirth = 'Date of Birth is required';
    else {
      const dob = new Date(formData.dateOfBirth);
      const age = new Date().getFullYear() - dob.getFullYear();
      if (age < 18) errs.dateOfBirth = 'Must be 18 years or older';
    }
    dispatch(setErrors(errs));
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    dispatch(setField({ field: e.target.name, value: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(submitUser(formData, navigate));
    }
  };

  //  Navigate to User List
  const goToUserList = () => {
    navigate('/');
  };

  return (
    <div className="userlist_form-container">
      <h2 className="userlist_form-title">Register User</h2>
      {message && <p className="userlist_success-msg">{message}</p>}
      
      <form className="userlist_form" onSubmit={handleSubmit}>
        <div className="userlist_form-group">
          <label>First Name</label>
          <input type="text" name="firstName" className="userlist_form-control" value={formData.firstName} onChange={handleChange} />
          {errors.firstName && <small className="userlist_error">{errors.firstName}</small>}
        </div>
        <div className="userlist_form-group">
          <label>Last Name</label>
          <input type="text" name="lastName" className="userlist_form-control" value={formData.lastName} onChange={handleChange} />
          {errors.lastName && <small className="userlist_error">{errors.lastName}</small>}
        </div>
        <div className="userlist_form-group">
          <label>Email</label>
          <input type="email" name="email" className="userlist_form-control" value={formData.email} onChange={handleChange} />
          {errors.email && <small className="userlist_error">{errors.email}</small>}
        </div>
        <div className="userlist_form-group">
          <label>Password</label>
          <input type="password" name="password" className="userlist_form-control" value={formData.password} onChange={handleChange} />
          {errors.password && <small className="userlist_error">{errors.password}</small>}
        </div>
        <div className="userlist_form-group">
          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" className="userlist_form-control" value={formData.confirmPassword} onChange={handleChange} />
          {errors.confirmPassword && <small className="userlist_error">{errors.confirmPassword}</small>}
        </div>
        <div className="userlist_form-group">
          <label>Date of Birth</label>
          <input type="date" name="dateOfBirth" className="userlist_form-control" value={formData.dateOfBirth} onChange={handleChange} />
          {errors.dateOfBirth && <small className="userlist_error">{errors.dateOfBirth}</small>}
        </div>

        <div className="userlist_btn-group">
          <button type="submit" className="userlist_submit-btn">Register</button>
          <button type="button" className="userlist_view-btn" onClick={goToUserList}>View User List</button>
        </div>
      </form>
    </div>
  );
}
