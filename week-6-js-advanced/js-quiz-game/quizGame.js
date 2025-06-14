const questions = [
  {category: "Animals",
  question: "where leopards live?",
  choices: ["Australia", "Africa","America"],
  answer: "Africa",
  },
  {category: "Literature",
  question: "best acclaimed literature book in 2024?",
  choices: ["Intermezzo by Sally Rooney", "The God of the Woods by Liz Moore","James by Percival Everett"],
  answer: "James by Percival Everett",
  },
  {category: "Trees",
  question: "The biggest high tree on earth?",
  choices: ["Hyperion", "Helios","Icarus"],
  answer: "Hyperion",
  },
  {category: "Health",
  question: "How many diseases exist according to World Health Organization?",
  choices: ["+ 10 000", "+ 20 000","+ 30 000"],
  answer: "+ 10 000",
  },
  {category: "Sport",
  question: "which sportsperson has the highest net worth?",
  choices: ["Tiger Woods", "Michael Jordan","Cristiano Ronaldo"],
  answer: "Michael Jordan",
  }
];

function getRandomQuestion(arr) {
  let randomIndex = Math.floor(Math.random() * arr.length)
  let randomQuestionObj = arr[randomIndex]
  return randomQuestionObj;
}

function getRandomComputerChoice(choicesArr) {
  let randomChoiceIndex = Math.floor(Math.random() * choicesArr.length);
  let randomChoice = choicesArr[randomChoiceIndex]
  return randomChoice;
}

function getResults(question, computerChoice) {
  if (question.answer === computerChoice) {
    return "The computer's choice is correct!";
  }
  else {
    return `The computer's choice is wrong. The correct answer is : ${question.answer}`;
  }
}

const questionObj = getRandomQuestion(questions);
console.log("question-object :", questionObj);

const pcChoice = getRandomComputerChoice(questionObj.choices);
console.log("PC-Choice: ", pcChoice);

const result = getResults(questionObj, pcChoice);
console.log('result: ', result)