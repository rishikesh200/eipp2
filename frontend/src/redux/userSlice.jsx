import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  formData: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
  },
  errors: {},
  users: [],
  message: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setField: (state, action) => {
      state.formData[action.payload.field] = action.payload.value;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    resetForm: (state) => {
      state.formData = { ...initialState.formData };
      state.errors = {};
      state.message = '';
    },
  },
});

export const { setField, setErrors, setMessage, setUsers, resetForm } = userSlice.actions;

//  Register User
export const submitUser = (formData, navigate) => async (dispatch) => {
  try {
    dispatch(setErrors({}));
    const res = await axios.post('http://localhost:5057/api/users/register', formData);
    dispatch(setMessage('User registered successfully '));

    //  Reset form after success
    dispatch(resetForm());

    //  Navigate to list page after 1s
    setTimeout(() => {
      navigate('/');
    }, 1000);
  } catch (err) {
    if (err.response && err.response.data) {
      dispatch(setMessage(''));
      dispatch(setErrors(err.response.data));
    } else {
      dispatch(setMessage('Something went wrong, please try again.'));
    }
  }
};

//  Fetch all users
export const fetchUsers = () => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:5057/api/users');
    dispatch(setUsers(res.data));
  } catch (err) {
    console.error('Failed to fetch users:', err);
  }
};

export default userSlice.reducer;
