const request = require("request");
var userDetails;

function init_promise() {
    var options = {
        url: 'https://api.github.com/users/bmsohwinc',
        headers: {
            'User-Agent': 'request'
        }
    };

    return new Promise(function(resolve, reject) {
        request.get(options, function(error, response, body) {
            if (error) {
                reject(error);
            }
            else {
                resolve(JSON.parse(body));
            }
        });
    });
}

function main() {

    var initPromise = init_promise();

    initPromise.then(function(result) {

        userDetails = result;
        console.log("Obtained User Details");
        console.log(userDetails.name);

    }, function(err) {
        
        console.log(err);
        
    }).then(function(result_1) {
        console.log("Now here");
        
    }, function(err_2) {
        console.log(err_2);
    });

    console.log("Here");
}

main();