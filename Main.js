const { readCsv, appendToCsv, writeCsv } = require('./CsvUtilities');
const { Login, Logout, isLoggedIn } = require('./Users');
const { Quiz } = require('./Quiz');
const { getChar, getLine } = require('./InputHandler');

async function Main() {
  const DataFiles = {
    users: "users.csv",
    questions: "question_answers.csv"
  };

  const headers = {
    users: ["name", "password", "login", "score"],
    questions: ["question", "a", "b", "c", "d", "correct_option"]
  };

  let users = [];
  try {
    users = await readCsv(DataFiles.users, headers.users);
  } catch {
    console.log("Error reading Users file");
  }

  console.log(users);
  let username = "";
  let password = "";
  let score = 0;

  const mainMenu = async () => {
    console.log('\n----------------------------------\n');
    console.log('Main Menu:');
    console.log('1. Login');
    console.log('2. Start Quiz');
    console.log('3. Logout');
    console.log('4. Exit');
    console.log('Enter choice (1, 2, 3, 4): ');
    const choice = await getChar();
    console.log('\n----------------------------------\n');
    return choice;
  };

  while (true) {
    const choice = await mainMenu();
    switch (choice) {
      case '1':
        username = await getLine('Enter username: ');
        password = "hadeeqapass";
        await Login(users, username, password);
        break;
      case '2':
        if (isLoggedIn(users, username)) {
          console.log("Entered");
          score = await Quiz(DataFiles.questions, headers.questions);
          console.log(`Your score is: ${score}`);
        }
        break;
      case '3':
        await Logout(users, username);
        break;
      case '4':
        console.log("GoodBye!");
        rl.close();
        return;
      default:
        console.log('Invalid choice. Please enter 1, 2, 3 or 4.');
    }
  }
}

Main();
