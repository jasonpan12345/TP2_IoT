'use strict';

var connectionString = 'HostName=tp2-iot-hub.azure-devices.net;SharedAccessKeyName=service;SharedAccessKey=qxm4OYKV588PYHYltGeOT9bLjG0shXF0FTWrgYntdIA=';

var Client = require('azure-iothub').Client;

var deviceId = 'collect_temperature';

// Connexion au IoT
var client = Client.fromConnectionString(connectionString);

module.exports = function (data) {

  var methodParams = {
    methodName: 'action',
    payload: data, // data a envoyer
    responseTimeoutInSeconds: 30
  };

  // Appelle direct method de l'appareil
  client.invokeDeviceMethod(deviceId, methodParams, function (err, result) {
    if (err) {
      console.error('Failed to invoke method \'' + methodParams.methodName + '\': ' + err.message);
    } else {
      console.log('Response from ' + methodParams.methodName + ' on ' + deviceId + ':');
      console.log(JSON.stringify(result, null, 2));
    }
  });

  console.log("sending data to device");

}