// 1. IMPORT
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const fs = require("fs");
const shell = require("shelljs");
const path = require('path');
const { spawn } = require('child_process');
const exec = require("child_process").exec;

// 2. CONSTRUCT
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// app.use(bodyParser.text());

// 3. GET
app.get("/", function(req, res) {
    console.log("Server has been pinged!! :)");
    res.sendFile(__dirname + "/index.html");
});

// 4. POST
app.post("/", function(req, res) {
    // var data = JSON.parse(req.body);
    var data = req.body;
    // console.log(req);
    // console.log(data);
    
    // >> was working well before using ajax and jquery in FE
    var the_code = data.the_code;
    var input = data.input;

    var path = __dirname;

    writeTheData(path + "/the_code.cpp", the_code);
    writeTheData(path + "/input.txt", input);
    console.log("Entering the executeThe... function");
    executeTheCodeAndReply(res);

    // console.log(the_code);
    // console.log(input);
    // console.log("Output is: ", "public/output.txt");
    
    // fs.readFile("public/output.txt", function(err, data) {

    //     if (err) {
    //         console.log("Error reading file: ", err);
    //     }
    //     else {
    //         console.log(data);            
    //     }
    // });

    // res.send("Thanks! We are evaluating your code... Please Wait... for ever");
    // res.sendFile(path + '/public/output.txt');
});

// 5. LISTEN
app.listen(3000, function() {
    console.log("Server started at Port: 3000");
});

// 6. UTILITY FUNCTIONS
function writeTheData(path, data) {
    fs.writeFile(path, data, (err) => {
        if (err) {
            throw err;
        }
    });
}

function executeTheCodeAndReply(res) {
    // const args = [];
    // const ls = spawn('bash', [path.join(__dirname, 'build.sh')].concat(args), { stdio: 'inherit' });

    // >> Asynchronously executing code snippets
    // shell.exec(__dirname + '/build.sh');
    // res.sendFile(__dirname + '/public/output.txt');

    // >> Synchronously executing...
    // new snippet downwards  ...
    var initPromise = init_promise();
    initPromise.then(function(result) {
        console.log(result);        
        res.sendFile(__dirname + '/public/output.txt');
    }, function(err) {
        // res.write();
        res.send("Sorry, the following error occured while processing :(" + err);
    });
}

function init_promise() {

    return new Promise(function(resolve, reject) {
        // run the script here...
        console.log("[I] Executing the script...");
        exec("bash build.sh", function(err, stdout, stderr) {            
            if (err || stderr) {
                console.log(stderr);                
                reject(stderr);
            }
            else {
                resolve("[I] Script ran successfully");
            }
        })
    });
}

// 7. USEFUL LINKS

// >> Processing the POST data
// https://www.geeksforgeeks.org/javascript-program-to-write-data-in-a-text-file/
// https://stackoverflow.com/questions/50606001/cant-get-request-payload-in-express-js-node
// https://stackoverflow.com/questions/4295782/how-to-process-post-data-in-node-js

// >> Getting ACE data
// https://stackoverflow.com/questions/8963855/how-do-i-get-value-from-ace-editor
// https://stackoverflow.com/questions/20915497/send-value-of-div-on-form-submit

// >> Running Shell script using shell.js
// https://stackoverflow.com/questions/44647778/how-to-run-shell-script-file-using-nodejs

// >> Running Shell script using child_process and call_back()
// https://stackoverflow.com/questions/37732331/execute-bash-command-in-node-js-and-get-exit-code

// >> Running C++ with i/o files
// https://stackoverflow.com/questions/17531573/command-to-run-c-with-input-from-file

// >> For Synchronous JS code execution
// https://nodejs.org/api/child_process.html
// https://www.freecodecamp.org/news/javascript-from-callbacks-to-async-await-1cc090ddad99/
// https://stackoverflow.com/questions/41212267/wait-for-an-event-to-happen-before-sending-http-response-in-nodejs
// https://medium.com/@ExplosionPills/javascript-synchronization-patterns-ec8c05ac05be

// >> Best tutorial for implementing Promises
// https://medium.com/dev-bits/writing-neat-asynchronous-node-js-code-with-promises-32ed3a4fd098

// >> Reading files and console-logging the data
// https://stackoverflow.com/questions/9168737/read-a-text-file-using-node-js

// >> Writing data to frontend element in the same page
// https://stackoverflow.com/questions/45218712/update-html-input-value-in-node-js-without-changing-pages


//      -- ---------    Scrap Works -------- --- 
//            Working HTML code
// <!DOCTYPE html>
// <html>
//     <head>
//         <meta charset="utf-8">
//         <title>testForm</title>

//         <!-- CSS File linking -->
//         <link rel="stylesheet" href="">

//         <style>
            
//             h1 {
//                 width: 100%;

//             }

//             form {
//                 height: 700px;
//             }


//             #input {
//                 height: 200px;
//                 max-height: 200px;
//             }

//             #editor {
//                 margin: 0;
//                 position: relative;
//                 /* top: 100px; */


//                 font-size: 1rem;
//                 width: 100%;
//                 /* max-width: 100%; */
//                 height: 400px;
//             }
        
//         </style>


//     </head>
//     <body>

//         <h1>C++ Local Web IDE</h1>

//         <form id="code_area" action="/" method="POST">
            
//             <!-- cols="70" rows="70" -->
//             <!-- <textarea name="code" id="editor">
//                 // Your code here...
//             </textarea> -->
            
//             <div id="editor">
// #include&lt;bits/stdc++.h&gt;
// using namespace std;

// int main() {
    
//     printf("Hello World!");
//     return 0;
// }
//             </div>


//             <textarea name="input" id="input"></textarea>
//             <button type="submit" name="run"> RUN </button>

//         </form>

//         <output form="code_area"></output>

//         <script class="form" src="ace-builds/src-min-noconflict/ace.js" type="text/javascript" charset="utf-8"></script>
//         <script>
//             var editor = ace.edit("editor");
//             editor.setTheme("ace/theme/gruvbox");
//             editor.session.setMode("ace/mode/c_cpp");
//         </script>


//     </body>
// </html>



// Data obtained...
// '\r\n#include<bits/stdc++.h>\r\nusing namespace std;\r\n\r\nint main() {\r\n    \r\n    printf("Hello World!");\r\n    return 0;\r\n}\r\n            '


