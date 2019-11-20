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

for(var i=0; i<2; i++){ // arrayLength
    gplay.list({
        category: gplay.category.GAME_ACTION,
        collection: gplay.collection.TOP_FREE,
        num: 2
      })
      .then((listOutput, err) => {
        if(err){
            console.error(err);
        }

        for(var k=0; k<listOutput.length; k++){
            gplay.reviews({
                appId: listOutput[k].appId,
                sort: gplay.sort.RATING,
                num: listOutput[k].reviews
            }).then(logger.info, logger.info);
        }
      });
}

