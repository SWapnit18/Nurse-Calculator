const cluster = require('cluster');
const os = require('os');

const numCPUs = os.availableParallelism ? os.availableParallelism() : os.cpus().length;

if (cluster.isPrimary || cluster.isMaster) {
  console.log(`=======================================================`);
  console.log(`🚀 [NurseCalc 1M Scale Engine] Primary process ${process.pid} is running`);
  console.log(`⚡ Spawning ${numCPUs} multi-threaded worker instances across all CPU cores...`);
  console.log(`=======================================================`);

  // Fork workers for all CPU cores
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Auto-heal and restart dead workers
  cluster.on('exit', (worker, code, signal) => {
    console.warn(`[NurseCalc Auto-Healer] Worker ${worker.process.pid} exited (signal: ${signal}, code: ${code}). Respawning replacement worker...`);
    cluster.fork();
  });
} else {
  // Workers share the TCP connection on port 5000 via OS round-robin
  require('./server.js');
  console.log(`  ✓ Worker ${process.pid} listening and processing requests.`);
}
