const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreElement = document.getElementById('score');

let shuffledQuestions, currentQuestionIndex, score;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  score = 0;
  scoreElement.innerText = score;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  if (correct) {
    score += 100;
    scoreElement.innerText = score;
  }
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

const questions = [
  {
    question: 'Who is the wife of Greek God Zeus?',
    answers: [
      { text: 'Hera', correct: true },
      { text: 'Artemis', correct: false },
      { text: 'Aphrodite', correct: false },
      { text: 'Medusa', correct: false }
    ]
  },
  {
    question: 'In the game god of war, kratos becomes the new god of war after defeating whom?',
    answers: [
      { text: 'Hercules', correct: false },
      { text: 'Apollo', correct: false },
      { text: 'Hades', correct: false },
      { text: 'Ares', correct: true }
    ]
  },
  {
    question: 'Which of the three main gods does not have a throne on Mount olympus?',
    answers: [
      { text: 'Poseidon', correct: false },
      { text: 'Zeus', correct: false },
      { text: 'Hades', correct: true },
      { text: 'All of them', correct: false }
    ]
  },
  {
    question: 'Which creature in Greek mythology was half-man and half-bull?',
    answers: [
      { text: 'Minotaur', correct: true },
      { text: 'Centaur', correct: false }
    ]
  }
];
