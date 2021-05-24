var pm2 = require('pm2');

pm2.list((err, list) => {

  for (let index = 0; index < 4; index++) {

    pm2.connect(function () {
      pm2.sendDataToProcessId({
        type: 'process:msg',
        data: {
          apenasLoop: true
        },
        id: index, // id of procces from "pm2 list" command or from pm2.list(errback) method
        topic: 'some topic'
      }, function (err, res) {
        console.log(err, res)
        process.exit(2);
      });
    });
  }
})
