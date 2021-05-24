var pm2 = require('pm2');

pm2.list((err, list) => {

  let maisOcioso = list.reduce((previous, current) => {
    if ((!previous || (previous.monit.cpu > current.monit.cpu)) )
      return current;
    return previous;
  })

  pm2.connect(function () {
    pm2.sendDataToProcessId({
      type: 'process:msg',
      data: {
        quantidade: 10,
        apenasLoop: false
      },
      id: maisOcioso.pm_id, // id of procces from "pm2 list" command or from pm2.list(errback) method
      topic: 'some topic'
    }, function (err, res) {
      console.log(err, res)
      process.exit(2);
    });
  });

})



  //   pm2.stop('app-name', (err, proc) => {
  //   })

  //   pm2.restart('app-name', (err, proc) => {
  //   })

