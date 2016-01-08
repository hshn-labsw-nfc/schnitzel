var frisby = require('frisby');
var url = 'http://localhost:4444/'; //@TODO change into real URL later

/**
 * This method is used to create random numbers for the some variables.
 * Some Task require a unique variable.
 * @param min
 * @param max
 * @returns {*}
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Test for the location, riddle and tag backend
 * Always with a create and a get check.
 * @TODO the id's a real unfortunately. I would be cool if we could get a ID back with the create and check in get.
 */
frisby.create('')
    .post(url + 'api/admin/session/',
        {username: 'admin', password: 'passwort1337'},  //@TODO login data
        {json: true}, {headers: {'Content-Type': 'application/json'}})
    .expectStatus(200)
    .expectHeader('Content-Type', 'application/json; charset=utf-8')
    .expectJSONTypes({token: String})
    .afterJSON(function (res) {
        /* include auth token in the header of all future requests */
        frisby.globalSetup({
            request: {
                headers: {'x-auth-token': res.token}
            }
        });
        /**
         * Test for Location
         */
        frisby.create('Create')
            .post(url + 'api/admin/locations', {image: null, name: 'RandomRoom'+getRandomInt(1000000, 10), description: "asd"})
            .expectStatus(200)
            .expectHeader('Content-Type', 'application/json; charset=utf-8')
            .expectJSON({message: "Location created"})
            .toss();
        frisby.create('Get Login view')
            .get(url + 'api/admin/locations/568fb5edd9ab11bc29632820') //@TODO is die id einer bestimmten location
            .expectStatus(200)
            .expectHeader('Content-Type', 'application/json; charset=utf-8')
            .expectJSONTypes({
                name: String,
                description: String,
                isActive: Boolean,
                image: Object,
                heat: Number
            })
            .toss();

        /**
         * Test for Riddle
         */
        frisby.create('Create')
            .post(url + 'api/admin/riddles', {image: null, name: "123", description: "123", answer: "123", hint: "1232321"})
            .expectStatus(200)
            .expectHeader('Content-Type', 'application/json; charset=utf-8')
            .expectJSON({message: "Riddle created"})
            .toss();
        frisby.create('Get Login view')
            .get(url + 'api/admin/riddles/568fd3e8d9ab11bc29632828') //@TODO is die id einer bestimmten Riddles
            .expectStatus(200)
            .expectHeader('Content-Type', 'application/json; charset=utf-8')
            .expectJSONTypes({    name: String,
                image: Object,
                description: String,
                answer: String,
                hint: String
            })
            .toss();

        /**
         * Test for Tag
         */
        frisby.create('Create')
            .post(url + 'api/admin/tags', {tagID: getRandomInt(10000, 1), alias: "random"})
            .expectStatus(200)
            .expectHeader('Content-Type', 'application/json; charset=utf-8')
            .expectJSON({message: "Tag created"})
            .toss();
        frisby.create('Get Login view')
            .get(url + 'api/admin/tags/568fe33f6e0d55e4282ea5cd') //@TODO is die id einer bestimmten Tags
            .expectStatus(200)
            .expectHeader('Content-Type', 'application/json; charset=utf-8')
            .expectJSONTypes({
                tagID: String,
                alias: String
            })
            .toss();
    })
    .toss();

