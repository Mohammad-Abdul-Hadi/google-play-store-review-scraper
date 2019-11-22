var gplay = require('google-play-scraper');
const winston= require('winston');
var num=20;

logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logFile'})
    ]
});

var myStringArray = ['APPLICATION','ANDROID_WEAR','ART_AND_DESIGN','AUTO_AND_VEHICLES','BEAUTY','BOOKS_AND_REFERENCE','BUSINESS','COMICS','COMMUNICATION','DATING','EDUCATION','ENTERTAINMENT','EVENTS','FINANCE','FOOD_AND_DRINK','HEALTH_AND_FITNESS','HOUSE_AND_HOME','LIBRARIES_AND_DEMO','LIFESTYLE','MAPS_AND_NAVIGATION','MEDICAL','MUSIC_AND_AUDIO','NEWS_AND_MAGAZINES','PARENTING','PERSONALIZATION','PHOTOGRAPHY','PRODUCTIVITY','SHOPPING','SOCIAL','SPORTS','TOOLS','TRAVEL_AND_LOCAL','VIDEO_PLAYERS','WEATHER','GAME','GAME_ACTION','GAME_ADVENTURE','GAME_ARCADE','GAME_BOARD','GAME_CARD','GAME_CASINO','GAME_CASUAL','GAME_EDUCATIONAL','GAME_MUSIC','GAME_PUZZLE','GAME_RACING','GAME_ROLE_PLAYING','GAME_SIMULATION','GAME_SPORTS','GAME_STRATEGY','GAME_TRIVIA','GAME_WORD','FAMILY','FAMILY_ACTION','FAMILY_BRAINGAMES','FAMILY_CREATE','FAMILY_EDUCATION','FAMILY_MUSICVIDEO','FAMILY_PRETEND'];
var arrayLength = myStringArray.length;

//following array of 'appId' is the output of python code. They were collected from 58 different appCategories in Google-play-store
var myStringArray2 = require("./appIdArr");

var arrayLength2 = myStringArray2.length;

var assocArray = new Object();

for(var i=0; i<arrayLength2; i++){ // arrayLength2
    gplay.app({appId: myStringArray2[i], throttle: 0.5 }) // 'com.tocaboca.tocakitchen2'
        .then((result) => {
            assocArray[result.appId] = result.reviews;
        });
}

var delayInMilliseconds = 10*1000; //10 second

setTimeout(function() {
  //your code to be executed after 10 second
  console.log(assocArray);

  var keys = Object.keys(assocArray);

  for(var i=0; i<keys.length; i++){ 
    gplay.reviews({
        appId: keys[i], // 'com.tocaboca.tocakitchen2'
        sort: gplay.sort.NEWEST,
        num: assocArray[keys[i]],
        throttle: 8
        })
        .then(logger.info, logger.info);
  }
}, delayInMilliseconds);
