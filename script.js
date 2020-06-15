const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
    {
    question: "How many CEOs are black in the UKs FTSE 100?",
    choice1: "3",
    choice2: "2",
    choice3: "1",
    choice4: "0",
    answer: 3
    },
    {
    question: "Which London Borough has highest number of Black Carribean residents?",
    choice1: "Croydon",
    choice2: "Brent",
    choice3: "Lambeth",
    choice4: "Hackney",
    answer: 1
    },
    {
    question: "What was the name of the first black person to be employed by the British goverment?",
    choice1: "Everton Michaels",
    choice2: "Olaudah Equiano",
    choice3: "Bessie Coleman",
    choice4: "Patrice Washington",
    answer: 2
    },
    {
    question: "What was the name of the first person of black descent to vote in a Britsh general election?",
    choice1: "Ignatius Sancho",
    choice2: "Ottobah Cugoano",
    choice3: "John Blake",
    choice4: "Samuel Taylor",
    answer: 1
    },
    {
   question: "What percentage of British Carribean residents said they were likely to be a victim of crime in the next year?",
   choice1: "15%",
   choice2: "10%",
   choice3: "40%",
   choice4: "28%",
   answer: 4
   },
   {
   question: "What was the name of the first black person to win a medal at the Olympics for Great Britain?",
   choice1: "Jesse Owens",
   choice2: "Anthony Joshua",
   choice3: "Jack London",
   choice4: "Lindford Christie",
   answer: 3	    
   }
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 6;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        //go to the end page
        return window.location.assign('/end.html');
    }
    questionCounter++;
    progressText.innerText ="Question: " + questionCounter + "/" + MAX_QUESTIONS;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

      if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();