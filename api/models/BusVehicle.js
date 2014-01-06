"use strict";

module.exports = {

  tableName: "bus_vehicles",
  schema: true,

  attributes: {
    Vehicle_ID: { 
      type: "integer",
      defaultsTo: 0,
      primaryKey :true
    },
    License_Number: { 
      type: 'string', 
    },
    Device_ID: { 
      type: 'string', 
      defaultsTo: null, 
    },
    Route_Name: { 
      type: 'string', 
      defaultsTo: null, 
    } 
  }
};
