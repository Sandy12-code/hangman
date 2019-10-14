// Various arrays
var wordOptions = ["galaxy","neptune","blackhole", "moon","eclipse","asteroid","jupiter","astronaut","telescope","mercury"];
var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var lettersGuessed = [];
var incorrectGuesses = [];

//Assigning wins/guesses left the correct number
var wins = 0;
var losses = 0;
var guessesLeft = 10;
var maxLength = 9;
var hasHit = false;
var randomWord = "";
var wordLength = 0;

//Creating variables to hold the references to the place in the HTML where we want to display the results.
var directionsText = document.getElementById ("directions");
var wordGuessed = document.getElementById ("wordGuessed");
var winText = document.getElementById ("winText");
var loseText = document.getElementById ("loseText");
var guessRemainText = document.getElementById ("guessRemainText");
var letterGuessedText = document.getElementById ("letterGuessedText");

//FUNCTIONS ===========================================

//Blank Space Function
var blankSpaceFunction = function(word) {
  
  //Makes blank space invisible
  for (var h = word.length; h < maxLength; h++){
    var space = document.getElementById("b" + h);
    space.style.visibility = "hidden";
    space.textContent = "";
  }
  
  //Makes blank space visible
  for (var v = 0; v < word.length; v++){
    var space = document.getElementById("b" + v);
    space.style.visibility = "visible";
    space.textContent = "";
  }
}

//Valid Input Function
var validInputFunction = function(s) {
  if (lettersGuessed.length > 0){
    if (lettersGuessed.includes(s)){
      return false;
    }
  }
  if (alphabet.includes(s)){
    return true;
  } 
  else {
    return false;
  }
}

//Comparison Function
var comparisonFunction = function(w) {
  //Get the letters within the string being guessed and ompare the letter to the letters in the array
  lettersGuessed.push(w);
  for (var str = 0; str < randomWord.length; str++){
    //Print the letter in the array to the blank space, and push the user's guess to the letters guessed array. 
    if (w == randomWord[str]) {
      var letter = document.getElementById("b" + str);
      console.log(letter);
      letter.textContent = w;
      wordLength--;
      hasHit = true;
    }
  }
  //If guessed letter is not in the word, -1 guesses left, push the user's guess to letters guessed array and print the wrong letters guessed for the user to see.
  if ((hasHit == false) && (guessesLeft > 0)){
    incorrectGuesses.push(w);
    guessesLeft--;
    letterGuessedText.textContent = "Letters Guessed: " + incorrectGuesses.toString();
    guessRemainText.textContent = "Guesses Left: " + guessesLeft;
  }
  hasHit = false;
}

//Reset Array Function
var resetArrayFunction = function (){
  alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
  lettersGuessed = [];
  incorrectGuesses = [];
}

//Play Function
var playFunction = function(){
  directionsText.textContent = "";
  randomWord = "";

  //Get a random word from the Word Options array
  randomWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
  console.log(randomWord);
  
  //Send the random word to the blank space function.
  blankSpaceFunction(randomWord);
  
  //Set up our initial values
  wordLength = randomWord.length;
  guessesLeft = 10;
  letterGuessedText.textContent = "LETTERS GUESSED: " + incorrectGuesses;
  guessRemainText.textContent = "GUESSES LEFT: " + guessesLeft;
  
  //Replay Feature
  if (userPlay == false){
    var userReplay = confirm("Let's play again!")
    return userReplay;
  }
  
}

//START GAME ========================================

//Asks the player if they want to play the game.
var userPlay = confirm("Do you want to play a game of Replace the Space?");
if ((userPlay == true) || (userReplay == true)) {
  
  directionsText.textContent = "Press any key to start replacing the spaces.";
  
  //Initializes our values for play and replay.
  playFunction();
  userPlay = false;
  //Continue Guessing Condition:
  if (guessesLeft > 0) {
    
    //User presses a key:
    document.onkeyup = function(event){
      var userGuess = event.key;
      
      //Changes the users guess to lower case
      var userGuessLow = userGuess.toLowerCase();
      
      //Check if key pressed is valid
      var validInput = validInputFunction(userGuessLow);
      // console.log(validInput);
      
      //Validity Condition
      if (validInput == true){
        //If valid pass for comparison to random word
        comparisonFunction(userGuessLow);
      }

      //Lose Condition:
      if (guessesLeft <= 0){
        //function that checks on the status of the game to break the code or end the game
        losses++;
        loseText.textContent = "LOSSES: " + losses;
        alert ("You lose.");
        resetArrayFunction();
        playFunction();
      }
      
      //Winning Condition:
      if (wordLength == 0) {
        wins++;
        winText.textContent = "WINS: " + wins;
        alert ("You win!");
        resetArrayFunction();
        playFunction();
      }
    }
  }
//If they player doesn't want to play, quit. 
} else {
  alert("Fine. I didn't want to play with you, anyways.")
}

//END OF GAME =============================================================