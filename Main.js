const { login, logout, signup, isLoggedIn, updateScore } = require('./Src/Users');
const { quiz } = require('./Src/Quiz');
const { getChar, getLine } = require('./Src/InputHandler');
const { hashInput } = require('./Src/Hashing')
function main() {
  const DataFiles = {
    users: "Database/users.csv",
    questions: "Database/question_answers.csv"
  };

  const headers = {
    users: ["name", "password", "login", "score"],
    questions: ["question", "a", "b", "c", "d", "correct_option"]
  };

  let username = "";
  let password = "";
  let score = 0;

  while (true) {
    console.log('\n----------------------------------\n');
    console.log('Main Menu:');
    console.log('1. Login');
    console.log('2. Signup');
    console.log('3. Start Quiz');
    console.log('4. Logout');
    console.log('5. Exit');
    const choice = getChar();
    console.log('\n----------------------------------\n');
    // camel case function names
    // console experience
    switch (choice) {
      case '1':
        username = getLine('Enter username: ', 'text');
        password = getLine('Enter password: ', 'password');
        login(DataFiles.users, headers.users, username, hashInput(password));
        break;
      case '2':
        username = getLine('Enter username: ', 'text');
        password = getLine('Enter password: ', 'password');
        let password_two = getLine('Enter password (again): ', 'password');
        if (password === password_two) {
          signup(DataFiles.users, headers.users, username, hashInput(password));
        }
        else {
          console.log("Passwords don't match try again!");
        }
        break;
      case '3':
        if (isLoggedIn(DataFiles.users, headers.users, username) === true) {
          console.log("Entered");
          score = quiz(DataFiles.questions, headers.questions);
          console.log(`Your score is: ${score}`);
          updateScore(DataFiles.users, headers.users, username, score);
        }
        break;
      case '4':
        logout(DataFiles.users, headers.users, username);
        break;
      case '5':
        logout(DataFiles.users, headers.users, username);
        console.log("GoodBye!");
        return;
      default:
        console.log('Invalid choice. Please enter 1, 2, 3 or 4.');
    }
  }
}

main();
