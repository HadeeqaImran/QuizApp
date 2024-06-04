const { writeCsv, appendToCsv, readCsv } = require('./CsvUtilities');

const isLoggedIn = (filePath, headers, name) => {
  const users = readCsv(filePath, headers);
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
const Login = (filePath, headers, name, password) => {
  let users = readCsv(filePath, headers);
  let user = users.find(user => user.name === name && user.password === password);
  if (user) {
    if (user.login === '1') {
      console.log("User Already Logged In");
    } else {
      user.login = '1';
      writeCsv(filePath, users);
      console.log("User Logged In Successfully");
    }
  } else {
    console.log("User Not Found");
  }
};

const Logout = (filePath, headers, name) => {
  const users = readCsv(filePath, headers);
  const user = users.find(user => user.name === name);
    if (user) {
    if (user.login === '1') {
      user.login = '0';
      writeCsv(filePath, users);
      console.log("User Logged Out Successfully");
    } else {
      console.log("User Already Logged Out");
    }
  } else {
    console.log("User Not Found");
  }
};

const Signup = (filePath, username, password ) => {
  row = [username, password, 0, 0]
  appendToCsv(filePath, row);
}
const UpdateScore = (filePath, headers, username, score) => {
  let users = readCsv(filePath, headers);
  let user = users.find(user => user.name === username);
  user.score = score;
  writeCsv(filePath, users);
};

module.exports = { isLoggedIn, Login, Signup, Logout, UpdateScore };
