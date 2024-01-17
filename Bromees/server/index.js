const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3002;

app.use(cors());

// Connect to MongoDB
let dbConnectionUrl = "mongodb://localhost:27017/formData";
mongoose.connect(dbConnectionUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a schema for the user
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  password: String,
});

// Create a User model
const User = mongoose.model('User', userSchema);

// Middleware to parse JSON
app.use(bodyParser.json());

// Endpoint to handle user registration
app.post('/register', async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;

  // Create a new user instance
  const newUser = new User({
    firstName,
    lastName,
    username,
    email,
    password,
  });

  try {
      const userNameExist = await User.find({ username });
      if(userNameExist?.length > 0){
          return res.status(422).json({code: 422, msg: "User name already in use", userName: userNameExist.username});
        }
    const savedUser = await newUser.save();
    res.status(201).json({code: 201, msg: "New Data Saved.", userData:savedUser});
  } catch (error) {
    res.status(500).json({ error: 'Error creating user', msg:error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
