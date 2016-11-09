// youtube.js

var key = "AIzaSyCDR9t2Gt8C1G7x7Grle-ey2az36JsRfH0";
var url = "https://www.googleapis.com";
var path = "/youtube/v3/search";
var params = "?part=snippet&type=video&videoEmbeddable=true&maxResults=50&key=" + key + "&q=";

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
var search = function (s, callback) {
    fetch(url + path + params + s).then((res) => {
        return res.json();
    }).then((res) => {
        let ids = [];

        for (var i = 0; i < 50; i++) {
            ids.push(res["items"][i]["id"]["videoId"]);
        }

        callback(ids);
    });
};

var getTitles = function (s, callback) {
    fetch(url + path + params + s).then((res) => {
        return res.json();
    }).then((res) => {
        let ids = [];

        for (var i = 0; i < 50; i++) {
            ids.push(res["items"][i]["snippet"]["title"]);
        }

        callback(ids);
    });
};

/* addToPlaylist
 * 
 * Simplified interface to relevant db query to add a song to an event
 *
 * NOTE: Event with the given ID must exist prior to attempting to add a song
 *  - will result in error if this condition is not met
 *
 * @param eventID: the foreign key ID of the event we are adding to
 * @param songURL: the URL of the specific song we are adding to the event database
 * @param callback: gets the JSON result from mySQL
 *
 */
var addToPlaylist = function (eventID, songURL, callback) {
    var url = "https://djque.herokuapp.com/?query=";
    var query = `SELECT songAmt FROM Events WHERE id=${eventID};`;

    // get current songAmt
    fetch(encodeURI(url + query)).then((res) => {
        return res.json();
    }).then((res) => {
        var songAmt = res[0]["songAmt"];
        songAmt++;

        // update songAmt
        query = `UPDATE Events SET songAmt=${songAmt} WHERE id=${eventID}`;
        fetch(encodeURI(url + query));

        // add to playlist
        query = "INSERT INTO Event_Song (eventId, songUrl, provider, sequence) VALUES (";
        query += eventID + ", '";
        query += songURL + "', 'youtube', ";
        query += songAmt + ");";

        fetch(encodeURI(url + query)).then((res) => {
            callback(res);
        });
    });
};

exports.search = search;
exports.getTitles = getTitles;
exports.addToPlaylist = addToPlaylist;
