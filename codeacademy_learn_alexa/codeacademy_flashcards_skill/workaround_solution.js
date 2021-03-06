'use strict';

var Alexa = require('alexa-sdk');

var flashcardsDictionary = [
    {
      question: 'how do you find the length of a string?',
      rubyAnswer: 'length',
      pythonAnswer: 'Len',
      javascriptAnswer: 'length'
    },
    {
      question: 'how do you print to the console or terminal?',
      rubyAnswer: 'puts',
      pythonAnswer: 'print',
      javascriptAnswer:'console.log'
    },
    {
       question:'are boolean terms capitalized or not capitalized?',
       rubyAnswer: 'not capitalized',
       pythonAnswer: 'capitalized',
       javascriptAnswer: 'not capitalized'
     }];

var DECK_LENGTH = flashcardsDictionary.length;

var handlers = {
  // Open Codecademy Flashcards
  'LaunchRequest': function() {
    this.attributes['language'] = '';
    this.attributes['numberCorrect'] = 0;
    this.attributes['currentFlashcardIndex'] = 0;

    this.response
        .speak('Welcome to Flashcards. In this session, do you want to test' +
        ' your knowledge in Ruby, Python, or Javascript?').listen('Which language would you like to practice? ');
    this.emit(':responseReady');
  },

  // Test my {language} knowledge
  'AskQuestion': function() {
   
   var language = this.attributes['language'];
   var currentFlashcardIndex = this.attributes['currentFlashcardIndex'];
   var currentQuestion = flashcardsDictionary[currentFlashcardIndex]['question'];
   var quest = 'In ' + language +', ' + currentQuestion;
   
   this.response.speak(quest).listen(quest);
   this.emit(':responseReady');
 
  },

  'SetMyLanguageIntent': function() {
     this.attributes['language'] = this.event.request.intent.slots.languages.value;
    var language = this.attributes['language'];
    this.response
        .speak('Okay, I will ask you some questions about ' +
        language + '. Here is your first question.');
    this.emit('AskQuestion');
  },

  // User gives an answer
  'AnswerIntent': function() {
    var userAnswer = this.event.request.intent.slots.answer.value;
    
    var language = this.attributes['language'];
    var languageAnswer = language + 'Answer';

    var correctAnswer = flashcardsDictionary[this.attributes['currentFlashcardIndex']][languageAnswer];

    if (userAnswer === correctAnswer) {
      
      this.attributes['numberCorrect']++;
      var numberCorrect = this.attributes['numberCorrect'];
      
      this.response
          .speak('Nice job! The correct answer is ' + correctAnswer + '. You ' +
            'have gotten ' + numberCorrect + ' out of ' + DECK_LENGTH + ' ' +
            language + ' questions correct. Here is your next question.');


    } else {
      
      var numberCorrect = this.attributes['numberCorrect'];
      this.response
          .speak('Sorry, the correct answer is ' + correctAnswer + '. You ' +
          'have gotten ' + numberCorrect + ' out of ' + DECK_LENGTH + ' ' +
          language + ' questions correct. Here is your next question.');
    }

    this.attributes['currentFlashcardIndex']++;
    this.emit(':responseReady');
    this.emit('AskQuestion');
  },
  
  
  // Stop
  'AMAZON.StopIntent': function() {
      this.response.speak('Ok, let\'s play again soon.');
      this.emit(':responseReady');
  },

  // Cancel
  'AMAZON.CancelIntent': function() {
      this.response.speak('Ok, let\'s play again soon.');
      this.emit(':responseReady');
  }
};

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};
