// youtube.js

var https = require("https");

var key = "AIzaSyCDR9t2Gt8C1G7x7Grle-ey2az36JsRfH0";
var url = "https://www.googleapis.com";
var path = "/youtube/v3/search";
var params = "?part=snippet&type=video&videoEmbeddable=true&maxResults=10&key=" + key + "&q=";

/* search
 *
 * Basic youtube searching
 *   - returns 10 embeddable video urls given a search term
 *   - can return video titles/thumbnails/length if we need to down the road
 *
 * @param s: string to search
 * @param callback: function that receives the id list
 *
 */
function search(s, callback) {
    var ids = [];

    https.get(url + path + params + s, (res) => {
        const statusCode = res.statusCode;
        const contentType = res.headers["content-type"];

        let error;

        if (statusCode !== 200) {
            error = new Error(`Request Failed.\nStatus Code: ${statusCode}`);
        } else if (!/^application\/json/.test(contentType)) {
            error = new Error(`Invalid content-type.\nExpected application/json but received ${contentType}`);
        }

        if (error) {
            console.log(error.message);
            res.resume();
            return;
        }

        res.setEncoding("utf8");
        let rawData = "";
        res.on("data", (chunk) => rawData += chunk);

        res.on("end", () => {
            try {
                let parsedData = JSON.parse(rawData);
                //console.log(parsedData["items"]);

                let baseURL = "https://www.youtube.com/watch?v=";

                // building id list
                for (var i = 0; i < 10; i++) {
                    ids.push(baseURL + parsedData["items"][i]["id"]["videoId"]);
                }

                //console.log(ids);
                callback(ids);

            } catch (e) {
                console.log(e.message);
            }
        });

    }).on("error", (e) => {
        console.log(`Got error: ${e.message}`);
    });
}


/* addToPlaylist
 * 
 * Simplified interface to relevant db query to add a song to an event
 *
 * NOTE: Event with the given ID must exist prior to attempting to add a song
 *  - will result in error if this condition is not met
 *
 * @param eventID: the foreign key ID of the event we are adding to
 * @param songURL: the URL of the specific song we are adding to the event database
 * @param sequence: the place in the playlist the song will be added to (should this autoincrement?)
 */
function addToPlaylist(eventID, songURL, sequence) {
    url = "https://djque.herokuapp.com/?query=";
    query = "INSERT INTO Event_Song VALUES (";
    query += eventID + ", '";
    query += songURL + "', 'youtube', ";
    query += sequence + ");";

    console.log(encodeURI(url + query));

    https.get(encodeURI(url + query), (res) => {
        const statusCode = res.statusCode;
        const contentType = res.headers["content-type"];

        let error;

        if (statusCode !== 200) {
            error = new Error(`Request Failed.\nStatus Code: ${statusCode}`);
        } else if (!/^application\/json/.test(contentType)) {
            error = new Error(`Invalid content-type.\nExpected application/json but received ${contentType}`);
        }

        if (error) {
            console.log(error.message);
            res.resume();
            return;
        }

        res.setEncoding("utf8");
        let rawData = "";
        res.on("data", (chunk) => rawData += chunk);

        res.on("end", () => {
            try {
                let parsedData = JSON.parse(rawData);

                console.log(parsedData);
            } catch (e) {
                console.log(e.message);
            }
        });

    }).on("error", (e) => {
        console.log(`Got error: ${e.message}`);
    });
}

/*// usage example; provide custom callback to handle result ids
//   -adding first result to event ID 1 in sequence spot #10
search("Red Hot Chili Peppers", (res) => {
    //console.log(res);
    console.log(`First Result: ${res[0]}`);
    console.log("Adding to event w/ Id 0...");
    addToPlaylist(1, res[0], 10);
    console.log("Done adding");
});*/
