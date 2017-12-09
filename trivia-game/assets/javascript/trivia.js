$(document).ready(function() {
    $("#introSection").hide();
    $("#messageSection").hide();
    $('#instructionModal').modal();
    $('.parallax').parallax(); // function for MaterializeCSS parallax componenet
    $('.tooltipped').tooltip({ // delay function for button tool tips
        delay: 50
    });


    $("#introSection").fadeIn(1000 * 5, function() { // fade in page elements
        // fadeIn function
    });

    $("#questionSpace").hide()
    var correctCounter = 0,
        incorrectCounter = 0,
        unansweredCounter = 0,
        currentQuestionIndex = 0;


    var congratsMessages = ['Great going cadet', 'On the money astrophysicist', "To Infinity!"];

    function randomNum(x) {
        var roll = Math.floor(Math.random() * x);
        return roll;
    }

    function randomCongrats() {
        var messageRoll = randomNum(congratsMessages.length);
    }

    function countDown() {
        $('.pickAnswer').click(function() {
            $(this).data('clicked', true);
        });
        var i = 30;
        var myInterval = setInterval(function() {

            if (i < 10) {
                $('#timerSeconds').html("0" + i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            } else {
                $('#timerSeconds').html(i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            }

            if (i === 0) {
                unansweredCounter++;
                clearInterval(myInterval);
                currentQuestionIndex++;
                $('#timer').effect("pulsate", {
                    times: 25
                }, 1000 * 5);
                i = 30;
                postQuestion(currentQuestionIndex);
            } else {
                i--;
            }
        }, 1000);
    }

    var questions = [
        // question 1
        {
            "q": "How big is the sun?",
            "c": ["432,288 miles", "553,211 miles", "732.983 miles"],
            "answer": 0
        },
        // question 2
        {
            "q": "How long would it take a space shuttle (going 5 miles per second) to travel a light year?",
            "c": ["37,200 years", "20,320 years", "60,730 years"],
            "answer": 0
        },
        // question 3
        {
            "q": "What did Pluto get reclassified to in 2005?",
            "c": ["A moon", "A minor planet", "A dwarf planet"],
            "answer": 2
        },
        // question 4
        {
            "q": "Which two planets in the solar system do not have moons?",
            "c": ["Saturn and Pluto", "Uranus and Mars", "Venus and Mercury"],
            "answer": 2
        },
        // question 5
        {
            "q": "What does NASA stand for?",
            "c": ["National Aeronautics and Space Administration", "National Astronauts and Space Aerodynamics", "National Astrophysics and Space Admiration"],
            "answer": 0
        },
        // question 6
        {
            "q": "Scientists estimate that the univers is _________ years old.",
            "c": ["30.18 billion", "13.82 billion", "2 billion"],
            "answer": 1
        },
        // question 7
        {
            "q": "How many years does it take for the Sun to travel around the galaxy?",
            "c": ["103 million years", "225 million years", "34 billion years"],
            "answer": 1
        },
        // question 8
        {
            "q": "What are Saturn's rings made of?",
            "c": ["star dust and comet debris", "sulfur and sand", "ice and rock"],
            "answer": 2
        },
        // question 9
        {
            "q": "Unidentified type of matter that does not emit or interact with light?",
            "c": ["dark matter", "gravity", "orbiting matter"],
            "answer": 0
        },
        // question 10
        {
            "q": "The golden record is ____________",
            "c": ["The planet made up of the most gold", "a record compiled by Carl Sagan for the Voyager", "the furthest humans have traveled away from Earth"],
            "answer": 1
        }
    ];


    function postQuestion(n) {

        if (currentQuestionIndex < questions.length) {
            $('#question').remove();
            $('.pickAnswer').remove();
            countDown();
            $('#questionContainer').append("<div id='question'>" + questions[n].q + "</div>");
            for (var i = 0; i < questions[n].c.length; i++) {
                var newDiv = $("<div>");
                newDiv.addClass("pickAnswer").attr("indexnum", i).text(questions[n].c[i]);
                $('#choices').append(newDiv);
            }


        } else {
            resetGame(); // the conditional successfully loops the game
        }

        $(".pickAnswer").on("click", function() {
            var userChoice = $(this).attr('indexnum'); // stored as a string not a number
            userChoice = parseInt(userChoice);

            // checks if user is correct and will tally accordingly
            if (userChoice === questions[currentQuestionIndex].answer) {
                correctCounter++;
                currentQuestionIndex++
                randomCongrats();

            } else {
                incorrectCounter++;
                currentQuestionIndex++;

            }
            postQuestion(currentQuestionIndex);
        })
    }

    function startTrivia() {
        $('#messageSection').hide();
        $('#gameMessage').empty()
        $('#questionContainer').show();
        $('#choices').show();
        $("#timer").show();
        correctCounter = 0;
        incorrectCounter = 0;
        unansweredCounter = 0;
        currentQuestionIndex = 0;

        postQuestion(currentQuestionIndex);

    }

    function resetGame() {
        $('#messageSection').show();
        $('#questionContainer').hide();
        $('#choices').hide();
        $('#timer').hide()

        $('#gameMessage').append("<h2>You have completed the game!</h2>");
        $('#gameMessage').append("<h4>Total Correct: " + correctCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Incorrect: " + incorrectCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Unanswered: " + unansweredCounter + "</h4>");

        setTimeout(startTrivia, 1000 * 10);

    }



    $("#startButton").on("click", function() {
        $("#buttonRow").hide();
        $("#introCard").remove();
        $("#timer").append("<span id='timerMinutes'>00</span>:<span id='timerSeconds'>00</span>");
        $("#questionSpace").show();

        startTrivia();


    })


});
