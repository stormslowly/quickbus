"use strict";

var OperationlineController = {

    index: function (req, res) {
        
        BusVehicle.findByRoute_NameIn(["校车专线1","校车专线2"],function(err,data){

          if(err){
            res.view("500.ejs");
          }

          data.sort(function(d1,d2){return d1.Rouote_Name>d2.Route_Name;});
          console.log(data)
          res.view({data: data});

        });
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