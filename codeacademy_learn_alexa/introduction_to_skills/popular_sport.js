"use strict";

var Alexa = require("alexa-sdk");

var handlers = {
  'LaunchRequest': function() {
    this.response.speak("Hello, what do you think is the world's most popular Sport?")
    	.listen("Tell me what you think is the world's most popular Sport");
    this.emit(':responseReady');
  },

  'MostPopularSportIntent': function () {
    var worldSport = this.event.request.intent.slots.sport.value;
    
    if(worldSport == "soccer"){
      this.reponse.speak("Correct! Soccer is the world's most popular Sport.");
    }
    else if(worldSport == undefined){
      this.response.speak("No problem boss, soccer is the world's most popular sport")
    }
    else{
      this.response.speak("You guessed that " + worldSport + " is the most popular. \
                          Actually, soccer is the world's most popular sport")
    }
    this.emit(':responseReady');
        
  },
}

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};