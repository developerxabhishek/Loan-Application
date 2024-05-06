// Custom middleware to validate email, password, mobile number, and full name
export const validateCredentials = (req, res, next) => {
  const { email, password, mobile, fullName } = req.body;
  // Check if full name is provided and meets length criteria
  if (!fullName || fullName.length < 3 || fullName.length > 60) {
    return res
      .status(400)
      .json({ error: "Full name must be between 3 and 60 characters long" });
  }

  // Check if mobile number is provided and is valid
  if (!mobile || !validateMobileNumber(mobile)) {
    return res
      .status(400)
      .json({ error: "Invalid mobile number it should be of 10 digit" });
  }
  // Check if email is provided and is valid
  if (!email || !validateEmail(email)) {
    return res.status(400).json({ error: "Invalid email please include @" });
  }

  // Check if password is provided and meets length criteria
  if (!password || password.length < 6 || password.length > 20) {
    return res
      .status(400)
      .json({ error: "Password must be between 6 and 20 characters long" });
  }

  // If everything is valid, move to the next middleware
  next();
};

// Helper function to validate email format
const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

// Helper function to validate mobile number format
const validateMobileNumber = (mobileNumber) => {
  const re = /^\d{10}$/;
  return re.test(mobileNumber);
};
