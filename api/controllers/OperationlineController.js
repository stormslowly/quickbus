"use strict";


function swap_Vehicle_ID(data,res){

  var firstVehicleID = data[0].Vehicle_ID;

  data[0].Vehicle_ID = data[1].Vehicle_ID;
  data[1].Vehicle_ID = firstVehicleID;

  data[0].save(function(err){
    if(err){
      res.json({status:err});
    }
    data[1].save(function(err){
      if (err){
        res.json({status:err});
      }

      res.json({status:"success"});
    });
  }); 
}

var OperationlineController = {

  index: function (req, res) {

    BusVehicle.findByRoute_NameIn(["校车专线1","校车专线2"],function(err,data){
      if(err){
        res.view("500.ejs");
      }

      data.sort(function(d1,d2){return d1.Rouote_Name>d2.Route_Name;});
      console.log(data);
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

      BusVehicle.findByRoute_NameIn(["校车专线1","校车专线2"],function(err,data){
        if(line===1){
          
          if(data[0].Vehicle_ID===2000 && data[0].Route_Name === "校车专线1"){
            res.json({status: "success"});
          }else{
            swap_Vehicle_ID(data,res);
          }
        }else if(line===2){
          if(data[0].Vehicle_ID===2000 && data[0].Route_Name === "校车专线2"){
            res.json({status: "success"});
          }else{
            swap_Vehicle_ID(data,res);
          }

        }
      });
    }
  }
};  
module.exports = OperationlineController;