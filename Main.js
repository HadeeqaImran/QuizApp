const { Login, Logout, Signup, isLoggedIn, UpdateScore } = require('./Users');
const { Quiz } = require('./Quiz');
const { getChar, getLine } = require('./InputHandler');

function Main() {
  const DataFiles = {
    users: "database/users.csv",
    questions: "database/question_answers.csv"
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

    switch (choice) {
      case '1':
        username = getLine('Enter username: ');
        password = getLine('Enter password: ');
        Login(DataFiles.users, headers.users, username, password);
        break;
      case '2':
        username = getLine('Enter username: ');
        password = getLine('Enter password: ');
        Signup(DataFiles.users, username, password);
        break;
      case '3':
        if (isLoggedIn(DataFiles.users, headers.users, username) === true) {
          console.log("Entered");
          score = Quiz(DataFiles.questions, headers.questions);
          console.log(`Your score is: ${score}`);
          UpdateScore(DataFiles.users, headers.users, username, score);
        }
        break;
      case '4':
        Logout(DataFiles.users, headers.users, username);
        break;
      case '5':
        Logout(DataFiles.users, headers.users, username);
        console.log("GoodBye!");
        return;
      default:
        console.log('Invalid choice. Please enter 1, 2, 3 or 4.');
    }
  }
}

Main();
