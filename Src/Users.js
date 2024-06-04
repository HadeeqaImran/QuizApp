const { writeCSV, appendToCSV, readCSV } = require('../Services/CSVUtilities');

const isLoggedIn = (filePath, headers, name) => {
  const users = readCSV(filePath, headers);
  const user = users.find(user => user.name === name);
  if (user) {
    if (user.login === '1') {
      console.log("LoggedIn");
      return true;
    } else {
      return false;
    }
  }
};

// Reading some empty row at end and inserting it
// Password astriks
const login = (filePath, headers, name, password) => {
  let users = readCSV(filePath, headers);
  let user = users.find(user => user.name === name && user.password === password);
  if (user) {
    // Convert this to int and check
    if (user.login === '1') {
      console.log("User Already Logged In");
    } else {
      user.login = '1';
      writeCSV(filePath, users);
      console.log("User Logged In Successfully");
    }
  } else {
    console.log("User Not Found");
  }
};

const logout = (filePath, headers, name) => {
  const users = readCSV(filePath, headers);
  const user = users.find(user => user.name === name);
    if (user) {
    if (user.login === '1') {
      user.login = '0';
      writeCSV(filePath, users);
      console.log("User Logged Out Successfully");
    }
  } else {
    console.log("User Not Found");
  }
};

const signup = (filePath, headers, username, password ) => {
  const users = readCSV(filePath, headers);
  const user = users.find(user => user.name === username);
    if (user) {
      console.log("User already exists")
      return
    }
  row = [username, password, 0, 0]
  appendToCSV(filePath, row);
}
const updateScore = (filePath, headers, username, score) => {
  let users = readCSV(filePath, headers);
  let user = users.find(user => user.name === username);
  user.score = score;
  writeCSV(filePath, users);
};

module.exports = { isLoggedIn, login, signup, logout, updateScore };
