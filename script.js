const quizData = [
    { question: "What does the <head> tag contain in an HTML document?", options: ["Visible content", "Metadata", "Footer", "Scripts"], correct: 1 },
    { question: "Which CSS property sets the space inside an element?", options: ["margin", "padding", "border", "width"], correct: 1 },
    { question: "What does `document.getElementById()` do?", options: ["Adds an element", "Selects by ID", "Deletes an element", "Triggers event"], correct: 1 },
    { question: "Which tag is used to create a hyperlink in HTML?", options: ["<link>", "<href>", "<a>", "<hyper>"], correct: 2 },
    { question: "How do you make text bold in CSS?", options: ["font-style: bold;", "font-weight: bold;", "text-decoration: bold;", "text-style: bold;"], correct: 1 },
    { question: "Which method is used to log messages in JavaScript?", options: ["console.log()", "print()", "write()", "debug.log()"], correct: 0 },
    { question: "Which attribute specifies an image in HTML?", options: ["href", "src", "alt", "title"], correct: 1 },
    { question: "What is the purpose of the 'alt' attribute in an <img> tag?", options: ["To add a caption", "To specify alternative text", "To set the image title", "To link the image"], correct: 1 },
    { question: "Which CSS property controls the stacking order of elements?", options: ["position", "z-index", "display", "overflow"], correct: 1 },
    { question: "What does `typeof` return in JavaScript?", options: ["The type of a variable", "The size of a variable", "The scope of a variable", "The value of a variable"], correct: 0 }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let timerInterval;
  let timeLeft = 10;
  let totalTime = 0; // Added: Tracks the total time taken to complete the quiz
  
  function loadQuestion() {
    const questionElement = document.getElementById("question");
    const buttons = document.querySelectorAll(".options button");
    const timerElement = document.getElementById("timer");
  
    // Reset timer for the current question
    timeLeft = 10;
    timerElement.textContent = `Time left: ${timeLeft}s`;
  
    // Clear any existing timer intervals
    clearInterval(timerInterval);
  
    // Start the timer
    timerInterval = setInterval(() => {
      timeLeft--;
      totalTime++; // Increment the total time counter
      timerElement.textContent = `Time left: ${timeLeft}s`;
  
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        currentQuestion++;
        if (currentQuestion < quizData.length) {
          loadQuestion();
        } else {
          showScore();
        }
      }
    }, 1000);
  
    // Load the question and its options
    questionElement.textContent = quizData[currentQuestion].question;
    buttons.forEach((button, index) => {
      button.textContent = quizData[currentQuestion].options[index];
      button.classList.remove("correct", "incorrect"); // Reset button classes
      button.disabled = false; // Re-enable buttons
    });
  }
  
  function checkAnswer(selected) {
    const buttons = document.querySelectorAll(".options button");
    const correctIndex = quizData[currentQuestion].correct;
  
    // Highlight the selected button
    if (selected === correctIndex) {
      buttons[selected].classList.add("correct"); // Green for correct answer
      score++;
    } else {
      buttons[selected].classList.add("incorrect"); // Red for incorrect answer
      buttons[correctIndex].classList.add("correct"); // Highlight the correct answer
    }
  
    // Disable all buttons after an answer is selected
    buttons.forEach((button) => button.disabled = true);
  
    // Move to the next question after a short delay
    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion < quizData.length) {
        loadQuestion();
      } else {
        clearInterval(timerInterval);
        showScore();
      }
    }, 1000);
  }
  
  function showScore() {
    document.getElementById("question").textContent = "Quiz Completed!";
    document.querySelector(".options").style.display = "none";
    document.getElementById("timer").style.display = "none";
  
    // Display the final score and total time taken
    document.getElementById("score").textContent = `Your score: ${score} / ${quizData.length}
    \n......Total time taken: ${totalTime} seconds`;
  }
  
  // Start the quiz by loading the first question
  loadQuestion();
  