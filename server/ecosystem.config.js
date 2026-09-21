// ==========================================================
// NurseCalc Enterprise PM2 Cluster Configuration (1M Scale)
// ==========================================================
module.exports = {
  apps: [
    {
      name: 'nursecalc-api',
      script: './server.js',
      instances: 'max',       // Utilize 100% of available CPU cores
      exec_mode: 'cluster',   // Native Node.js cluster load balancing
      watch: false,
      max_memory_restart: '1G', // Gracefully restart if memory reaches 1GB
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000
      }
    }
  ]
};
