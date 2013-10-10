"use strict";

var OperationlineController = {

    index: function (req, res) {
        res.view({test_name: "this is a new line"});
    },

    setline: function (req, res) {

        var post_data = req.body, line;
        console.log("req", req.body);

        line = parseInt(post_data.line, 10);
        if (line.toString() === "NaN") {
            res.json({status: "wrong line data"});
        } else {

            Currentline.update({id: 1}, {line: line}, function (error, lines) {
                res.json({status: "success"});
            });

        }


    }
};
module.exports = OperationlineController;