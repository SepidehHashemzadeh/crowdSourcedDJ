var mockFetch = require('mock-fetch-api');
var url = 'https://djque.herokuapp.com/?query=';

test('database records users properly', () => {
    var sql = 'SELECT * FROM USERS';
    var query = encodeURI(url + sql);

    var response = '[{"id":"10154230939168043","name":"Abhijoy Saha","email":"abjsaha@ucla.edu"},\
    {"id":"10207199943705889","name":"Michelle Doelling","email":"medoelling@gmail.com"},\
    {"id":"10208856888673232","name":"Adam Jones","email":"12adam34jones56@gmail.com"},\
    {"id":"10210790641300220","name":"Killian Jackson","email":"killianjackson@yahoo.com"},\
    {"id":"1497325176948296","name":"Sepideh Hashemzadeh","email":"sepideh.h91@gmail.com"},\
    {"id":"755826817888438","name":"Michelle Wang","email":"michellewang13@mittymonarch.com"}]';

    mockFetch.when('GET', query).respondWith(200, response);

    return fetch(query).then((res) => {
        return res.json();
    }).then((data) => {
        expect(data.length).toBe(6);
        expect(data[2]['name']).toBe('Adam Jones');
        expect(data[4]['name']).not.toBe('Michelle Wang');
    });
});

test('database contains proper tables', () => {
    var sql = 'SHOW TABLES';
    var query = encodeURI(url + sql);

    var response = '[{"Tables_in_CS130":"Event_Song"},\
    {"Tables_in_CS130":"Event_User"},\
    {"Tables_in_CS130":"Events"},\
    {"Tables_in_CS130":"Invites"},\
    {"Tables_in_CS130":"Users"}]';

    mockFetch.when('GET', query).respondWith(200, response);

    return fetch(query).then((res) => {
        return res.json();
    }).then((data) => {
        expect(data.length).toBe(5);
        expect(data[2]['Tables_in_CS130']).toBe('Events');
        expect(data[4]['Tables_in_CS130']).not.toBe('Event_Song');
    });
});
