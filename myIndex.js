var gplay = require('google-play-scraper');
const winston = require('winston');

logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'ReviewsCollected.txt' })
    ]
});

var myStringArray = ['APPLICATION', 'ANDROID_WEAR', 'ART_AND_DESIGN', 'AUTO_AND_VEHICLES', 'BEAUTY', 'BOOKS_AND_REFERENCE', 'BUSINESS', 'COMICS', 'COMMUNICATION', 'DATING', 'EDUCATION', 'ENTERTAINMENT', 'EVENTS', 'FINANCE', 'FOOD_AND_DRINK', 'HEALTH_AND_FITNESS', 'HOUSE_AND_HOME', 'LIBRARIES_AND_DEMO', 'LIFESTYLE', 'MAPS_AND_NAVIGATION', 'MEDICAL', 'MUSIC_AND_AUDIO', 'NEWS_AND_MAGAZINES', 'PARENTING', 'PERSONALIZATION', 'PHOTOGRAPHY', 'PRODUCTIVITY', 'SHOPPING', 'SOCIAL', 'SPORTS', 'TOOLS', 'TRAVEL_AND_LOCAL', 'VIDEO_PLAYERS', 'WEATHER', 'GAME', 'GAME_ACTION', 'GAME_ADVENTURE', 'GAME_ARCADE', 'GAME_BOARD', 'GAME_CARD', 'GAME_CASINO', 'GAME_CASUAL', 'GAME_EDUCATIONAL', 'GAME_MUSIC', 'GAME_PUZZLE', 'GAME_RACING', 'GAME_ROLE_PLAYING', 'GAME_SIMULATION', 'GAME_SPORTS', 'GAME_STRATEGY', 'GAME_TRIVIA', 'GAME_WORD', 'FAMILY', 'FAMILY_ACTION', 'FAMILY_BRAINGAMES', 'FAMILY_CREATE', 'FAMILY_EDUCATION', 'FAMILY_MUSICVIDEO', 'FAMILY_PRETEND'];
var arrayLength = myStringArray.length;

for (var i = 0; i < arrayLength; i++) {
    gplay.list({
        category: myStringArray[i],
        collection: gplay.collection.TOP_FREE,
        num: 1,
        throttle: 0.2
    })
        .catch(err => console.log("Error" + err))
        .then((resDetCat, errApps) => { //extract AppId from Details of Categories
            for (var j = 0; j < resDetCat.length; j++) {
                // console.log(resApps[j].appId);
                if (resDetCat[j] != null) {
                    gplay.app({
                        appId: resDetCat[j].appId,
                        throttle: 0.2
                    })
                        .catch(err2 => console.log("Error2" + err2)) // Most frequent error
                        .then((resDetApps, errRevs) => { //extract Review from Details of Apps
                            if (resDetApps != null) {
                                // console.log(resDetApps.appId, resDetApps.title, resDetApps.reviews);
                                gplay.reviews({
                                    appId: resDetApps.appId,
                                    sort: gplay.sort.NEWEST,
                                    num: resDetApps.reviews * 2,
                                    throttle: 0.2
                                })
                                    .catch(err3 => console.log("Error3" + err3))
                                    .then(logger.info, console.log);
                            }
                        });
                }
            }
        });
}