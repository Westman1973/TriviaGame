// Questions
var triviaQuestions = [{
    question: "In the song Twelve Days of Christmas, what is given on the 7th day?",
    choices: ["Turtle Doves", "Ladies dancing", "Swans a-swimming", "Golden Rings"],
    answer: 2
},{
    question: "In what country did Silent Night originate?",
    choices: ["Germany", "Austria", "Belgium", "Canada"],
    answer: 1
},{
    question: "In what decade did Coca-Cola start using Santa Claus in advertisements?",
    choices: ["1920", "1940", "1960", "1980"],
    answer: 0
},{
    question: "What country is the Poinsettia, with its red and green foliage, native to?",
    choices: ["Mexico", "Norway", "Germany", "Cuba"],
    answer: 1
},{
    question: "What is the most popular meal for Christmas in Japan?",
    choices: ["KFC Chicken", "Turkey", "Chicken Stir Fry", "McDonalds"],
    answer: 0
}]

console.log(triviaQuestions);

var imgArray = ['xmas1', 'xmas2', 'xmas3', 'xmas4', 'xmas5'];
var currentQuestion; 
var correctAnswer; 
var incorrectAnswer; 
var unanswered; 
var seconds; 
var time; 
var answered; 
var userSelect;
var messages = {
	Right: "You are right!",
	Wrong: "Sorry, that's not right.",
	endTime: "Oh no!!! You ran out of time.",
	finished: "Let's see your scores."
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
	$('#RightAnswers').empty();
	$('#WrongAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	RightAnswer = 0;
	WrongAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctAnswer').empty();
		answered = true;
	
	//sets up new questions & choices
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].choices[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.choices').append(choices);
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
	seconds = 5;
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

	var RightAnswerText = triviaQuestions[currentQuestion].choices[triviaQuestions[currentQuestion].answer];
	var RightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#img').html('<img src = "assets/images/'+ imgArray[currentQuestion] +'.img" width = "400px">');
	
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		RightAnswer++;
		$('#message').html(messages.Right);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		WrongAnswer++;
		$('#message').html(messages.Wrong);
		$('correctAnswer').html('The correct answer was: ' + RightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctAnswer').html('The correct answer was: ' + RightAnswerText);
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
	$('#correctAnswer').empty();
	

	$('#finalMessage').html(messages.finished);
	$('#RightAnswers').html("Right Answers: " + RightAnswer);
	$('#WrongAnswers').html("Wrong Answers: " + WrongAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);

	
	
}