/*---------------------
	:: OperationLine 
	-> controller
---------------------*/


var OperationlineController = {

    index: function (req, res) {
        Operationline.find().exec(function ( error, data ) {
            if(data.length!==0){

            }

        });


    }



};
module.exports = OperationlineController;