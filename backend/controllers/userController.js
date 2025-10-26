import User from '../models/User.js';

// ✅ Register user
export const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, dateOfBirth } = req.body;

  // Basic validation
  const errors = {};
  if (!firstName) errors.firstName = 'First Name is required';
  if (!lastName) errors.lastName = 'Last Name is required';
  if (!email) errors.email = 'Email is required';
  else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Invalid email format';
  if (!password) errors.password = 'Password is required';
  else if (password.length < 8) errors.password = 'Password must be at least 8 characters';
  if (password !== confirmPassword) errors.confirmPassword = 'Passwords must match';
  if (!dateOfBirth) errors.dateOfBirth = 'Date of Birth is required';
  else if ((new Date().getFullYear() - new Date(dateOfBirth).getFullYear()) < 18) 
    errors.dateOfBirth = 'Must be 18 years or older';

  if (Object.keys(errors).length > 0) return res.status(400).json(errors);

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ email: 'Email already exists' });

    const newUser = new User({ firstName, lastName, email, password, dateOfBirth });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully ✅' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Fetch all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
