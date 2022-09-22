module.exports = {
  apps: [{
    name: 'prod',
    script: 'src/server.js',
    instances: 'max',
    autorestart: true,
    watch: false,
    exec_mode: 'cluster',
    ignore_watch: 'node_modules',
    max_memory_restart: '1G',
    log_date_format: 'YYYY-MM-DD HH:mm Z',
    error_file: 'logs/err.log',
    out_file: 'logs/out.log',
    log_file: 'logs/combined.log',
  },
  {
    name: 'stag',
    script: 'src/server.js',
    instances: 'max',
    autorestart: true,
    watch: false,
    exec_mode: 'cluster',
    ignore_watch: 'node_modules',
    max_memory_restart: '1G',
    log_date_format: 'YYYY-MM-DD HH:mm Z',
    error_file: 'logs/err.log',
    out_file: 'logs/out.log',
    log_file: 'logs/combined.log',
  },
  {
    name: 'dev',
    script: 'src/server.js',
    instances: 1,
    autorestart: true,
    watch: true,
    watch_delay: 1000,
    watch_options: {
      usePolling: true,
    },
    exec_mode: 'cluster',
    ignore_watch: ['node_modules', 'logs', '.git', '.idea'],
    max_memory_restart: '1G',
    log_date_format: 'YYYY-MM-DD HH:mm Z',
    error_file: 'logs/err.log',
    out_file: 'logs/out.log',
    log_file: 'logs/combined.log',
  }
  ],

  deploy: {
    production: {
      key: '/path/to/key.pem',
      user: 'node',
      host: '212.83.163.1',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/production',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};