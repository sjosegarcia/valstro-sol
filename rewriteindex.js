"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_client_1 = require("socket.io-client");
var readline_1 = require("readline");
var searchProgram = function () {
    var socket = (0, socket_io_client_1.io)("http://localhost:3000");
    var rl = (0, readline_1.createInterface)({
        input: process.stdin,
        output: process.stdout,
    });
    var displayOutput = function (response) {
        var success = response;
        var failure = response;
        if (failure)
            console.log(failure.error);
        if (success)
            console.log("".concat(success.page, "/").concat(success.resultCount, " ").concat(success.name, " - [").concat(success.films, "]"));
    };
    socket.on("search", function (response) {
        displayOutput(response);
    });
    rl.setPrompt("What character would you like to search for? ");
    rl.prompt();
    rl.on("line", function (name) {
        socket.emit("search", { query: name });
    }).on("close", function () {
        socket.close();
        process.exit(0);
    });
};
searchProgram();
