const mainScreen = document.getElementById("main-screen");
const quizScreen = document.getElementById("quiz-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const timeSpan = document.getElementById("time-remaining");
const progressBar = document.getElementById("progress");
const resultScreen = document.getElementById("result-screen");
const resultText = document.getElementById("result-text");
const restartButton = document.getElementById("restart-btn");

const quizQuestions = [
  {
    question: "What is the full name of UEL?",
    answers: [
      { text: "University of Economics - Law", correct: false },
      { text: "University of Economics & Law, Vietnam National University, Ho Chi Minh City", correct: false },
      { text: "University of Economics - Law, Vietnam National University, Ho Chi Minh City", correct: true },
      { text: "University of Economics Law, Vietnam National University, Ho Chi Minh City", correct: false },
    ],
  },
  {
    question: "In which year was UEL established?",
    answers: [
      { text: "2009", correct: false },
      { text: "2010", correct: true },
      { text: "2011", correct: false },
      { text: "2008", correct: false },
    ],
  },
  {
    question: "Who is the current rector of UEL?",
    answers: [
      { text: "Assoc. Prof. Dr. Nguyễn Tiến Dũng", correct: false },
      { text: "Assoc. Prof. Dr. Nguyễn Văn Luân", correct: false },
      { text: "Assoc. Prof. Dr. Hoàng Công Gia Khánh", correct: true },
      { text: "None of the above", correct: false },
    ],
  },
  {
    question: "What is the official Wi-Fi password for UEL students?",
    answers: [
      { text: "uelwifi123", correct: false },
      { text: "studentuel", correct: false },
      { text: "maiyeuuel", correct: true },
      { text: "welcomeuel", correct: false },
    ],
  },
  {
    question: "On which date is the UEL’s Day student festival held every year?",
    answers: [
      { text: "November 5", correct: false },
      { text: "June 11", correct: false },
      { text: "November 6", correct: true },
      { text: "May 11", correct: false },
    ],
  },
  {
    question: "What is the traditional song of UEL students?",
    answers: [
      { text: "I am a UEL student", correct: false },
      { text: "Forward, UEL students", correct: false },
      { text: "Steady Steps, UEL Students", correct: true },
      { text: "UEL Student Anthem", correct: false },
    ],
  },
  {
    question: "What was the predecessor of UEL?",
    answers: [
      { text: "Faculty of Law under Vietnam National University, Ho Chi Minh City", correct: false },
      { text: "Faculty of Economics under Vietnam National University, Ho Chi Minh City", correct: true },
      { text: "Faculty of Economic Law under Vietnam National University, Ho Chi Minh City", correct: false },
      { text: "Faculty of Information Systems under Vietnam National University, Ho Chi Minh City", correct: false },
    ],
  },
  {
    question: "According to the current organizational structure of UEL, how many faculties are directly under the university?",
    answers: [
      { text: "8", correct: false },
      { text: "7", correct: false },
      { text: "10", correct: false },
      { text: "9", correct: true },
    ],
  },
  {
    question: "Currently, according to the organizational structure of the university, which unit has an incorrect name?",
    answers: [
      { text: "Administrative Office", correct: false },
      { text: "Finance Office", correct: false },
      { text: "Testing and Quality Assurance Office", correct: true },
      { text: "Communications Office", correct: false },
    ],
  },
  {
    question: "In which case would a student not be eligible for graduation at UEL?",
    answers: [
      { text: "Has not participated in the Summer Volunteer Program", correct: false },
      { text: "Has not obtained the Office Informatics certificate", correct: false },
      { text: "Has not obtained the National Defense Education certificate", correct: true },
      { text: "Has not participated in student scientific research activities", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let score = 0;
let timeRemaining = 10;
let timer;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;
  timeRemaining = 10;
  timeSpan.textContent = timeRemaining;

  mainScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
  startTimer();
}

function selectAnswer(event) {
  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function startTimer() {
  clearInterval(timer); 
  timeRemaining = 10; 
  timeSpan.textContent = timeRemaining;

  timer = setInterval(() => {
    timeRemaining--;
    timeSpan.textContent = `${timeRemaining.toString().padStart(2, '0')}`;

    if (timeRemaining <= 0) {
      clearInterval(timer);
      handleTimeOut();
    }
  }, 1000);
}

function handleTimeOut() {
  answersDisabled = true;

  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
  });

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");
  const passingScore = 5;

  if (score >= passingScore) {
    resultText.textContent = "WELCOME TO UEL!";
  } else {
    resultText.textContent = "GAME OVER";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}