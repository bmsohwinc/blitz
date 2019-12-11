const request = require("request");
const exec = require("child_process").exec;
const fs = require("fs");

function main() {

    exec("bash build.sh", function(err, stdout, stderr) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Script ran!");            
        }
    });

    fs.readFile("public/output.txt", 'utf8', function(err, data) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(data);            
        }
    });
}

main();