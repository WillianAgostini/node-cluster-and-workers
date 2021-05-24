const process = require('process');
const { Worker, workerData } = require('worker_threads')


function startWorker(path, cb) {
  const worker = new Worker(path, { workerData: null })
  worker.on('message', (msg) => {
    cb(null, msg)
  })
  worker.on('exit', (code) => {
    if (code != 0)
      console.error(new Error(`Worker finalizado com exit code = ${code}`))
  })
  return worker
}

process.on('message', function (packet) {
  console.log(packet);

  let workers = []

  if (packet.data.apenasLoop) {
    setInterval(() => {
      let date = new Date();
      console.log(`loop ${date.getSeconds()} segundos... ${workers.length} workers`);
    }, 1000);
  }
  else {

    for (let index = 0; index < packet.data.quantidade; index++) {

      // Inicia o worker em outra thread
      let a = startWorker(__dirname + '/worker-code.js', (err, result) => {
        if (err) return console.error(err)
        console.log(`Duração = ${(result.end - result.start) / 1000} segundos`)

        process.send({
          type: 'process:msg',
          data: {
            success: true
          }
        });
      })

      workers.push(a);
    }

  }

});



