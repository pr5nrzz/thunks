/*
    # Instructions

    1. You'll do the same thing as the previous exercise(s), but now you should use thunks.

    2. Expected behavior:
        - Request all 3 files at the same time (in "parallel").
        - Render them ASAP (don't just blindly wait for all to finish loading)
        - BUT, render them in proper (obvious) order: "file1", "file2", "file3".
        - After all 3 are done, output "Complete!".
*/

function fakeAjax(url, cb) {
    var fake_responses = {
        "file1": "The first text",
        "file2": "The middle text",
        "file3": "The last text"
    };
    var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

    console.log("Requesting: " + url);

    setTimeout(function () {
        cb(fake_responses[url]);
    }, randomDelay);
}

function output(text) {
    console.log(text);
}

// **************************************

function getFile(url) {
    var resp;

    fakeAjax(url, function output(text) {
        if (!responses[url]) {
            responses[url] = text;

            if (resp != undefined) {
                resp(text);
            }
        }
    });

    return function thunk(cb) {
        if (url in responses) {
            cb(responses[url]);
        } else {
            resp = cb;
        }
    }
}

var responses = {};

var thunk1 = getFile("file1");
var thunk2 = getFile("file2");
var thunk3 = getFile("file3");

thunk1(function ready(text) {
    output(text);
    thunk2(function ready(text) {
        output(text);
        thunk3(function ready(text) {
            output(text);
            output("Complete!");
        });
    });
});





