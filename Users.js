const { writeCsv } = require('./CsvUtilities');

const isLoggedIn = (data, name) => {
  const user = data.find(user => user.name === name);
  if (user) {
    return user.login === '1';
  }
  return false;
};

const Login = async (data, name, password) => {
  const user = data.find(user => user.name === name);
  if (user) {
    if (user.login === '1') {
      console.log("User Already Logged In");
    } else {
      user.login = '1';
      try {
        await writeCsv("users.csv", data);
        console.log("User Logged In Successfully");
      } catch (error) {
        console.log("User Login Failed!");
      }
    }
  } else {
    console.log("User Not Found");
  }
};

const Logout = async (data, name) => {
  const user = data.find(user => user.name === name);
  if (user) {
    if (user.login === '1') {
      user.login = '0';
      try {
        await writeCsv("users.csv", data);
        console.log("User Logged Out Successfully");
      } catch (error) {
        console.log("User Logout Failed!");
      }
    } else {
      console.log("User Already Logged Out");
    }
  } else {
    console.log("User Not Found");
  }
};

module.exports = { isLoggedIn, Login, Logout };

// isLoggedIn()
// Login
// Do not let call anyother without login
// Start Quiz
// Give 5 random questions
// Total Score
// Update score in CSV

// ------------------------------ Extension ------------------------------
// Make admin user to call read and update securely
// View Account
// Update Account Information 
// Delete Account
