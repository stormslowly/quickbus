/*---------------------
	:: OperationLine 
	-> controller
---------------------*/


var OperationlineController = {

    index: function( req, res ){
        res.view();

    },

    setline: function (req, res) {

        console.log("req",req.body);

        Operationline.find().exec(function ( error, data ) {
            if(data.length!==0){
//               console.log(data);
            }

        });

        res.json({a:"shelly"});

    }



};
module.exports = OperationlineController;