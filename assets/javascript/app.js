// Questions
var triviaQuestions = [{
    question: "In the song Twelve Days of Christmas, what is given on the 7th day?",
    answerList: ["Turtle Doves", "Ladies dancing", "Swans a-swimming", "Golden Rings"],
    answer: 2
},{
    question: "In what country did Silent Night originate?",
    answerList: ["Germany", "Austria", "Belgium", "Canada"],
    answer: 1
},{
    question: "In what decade did Coca-Cola start using Santa Claus in advertisements?",
    answerList: ["1920", "1940", "1960", "1980"],
    answer: 0
},{
    question: "What was the first year that the Rockefeller Center Christmas Tree was put up?",
    answerList: ["1937", "1929", "1933", "1931"],
    answer: 2
},{
    question: "In what country did the custom of putting up a Christmas tree originate?",
    answerList: ["Britain", "America", "Finland", "Germany"],
    answer: 3
},{
    question: "Who created the first electric light Christmas display?",
    answerList: ["Edward Johnson", "Thomas Edison", "Charles Wesley", "John Doe"],
    answer: 1
},{
    question: "What country is the Poinsettia, with its red and green foliage, native to?",
    answerList: ["Mexico", "Norway", "Germany", "Cuba"],
    answer: 1
},{
    question: "What is the most popular meal for Christmas in Japan?",
    answerList: ["KFC Chicken", "Turkey", "Chicken Stir Fry", "McDonalds"],
    answer: 0
},{
    question: "What northeastern US state holds the Guinness record for largest snowman?",
    answerList: ["Vermont", "Washington", "Maine", "Alaska"],
    answer: 2   
},{
    question: "What color is Rudolf's nose?",
    answerList: ["Red", "Green", "Orange", "Black"],
    answer: 0
}]

console.log(triviaQuestions);

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10'];
var currentQuestion; 
var correctAnswer; 
var incorrectAnswer; 
var unanswered; 
var seconds; 
var time; 
var answered; 
var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "Sorry, that's not right.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 4500)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 4500);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);

	var audioElement = document.createElement("audio");
	audioElement.setAttribute('src', 'assets/images/wildCard.mp3');
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
	$('#startOverBtn').on("click", function() {
		audioElement.play();
	})
	
}