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
    env_production: {
      NODE_ENV: 'production',
      ENVIRONMENT: 'production',
      DATABASE: 'mongodb+srv://root:<password>localhost:27107/test', //your mongodb uri
      SERVER_PORT: 3030,
      SECRET: 'some_unique_secret_code_here_for_hashing', //your secrete key
      JWT_EXPIRY: '1d'
    },
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
    env_staging: {
      NODE_ENV: 'staging',
      ENVIRONMENT: 'staging',
      SENTRY_URI: 'https://YOUR_SENTRY_URL',
      BASE_URL: 'https://staging.mygoally.com',
      DATABASE: 'mongodb+srv://root:<password>localhost:27107/test', // your mongodb url
      SERVER_PORT: 3010,
      SECRET: 'some_unique_secret_code_here_for_hashing', //your secrete key
      JWT_EXPIRY: '1d'
    },
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
    env: {
      NODE_ENV: 'development',
      ENVIRONMENT: 'development',
      DATABASE: 'mongodb+srv://root:<password>localhost:27107/test', // your mongodb url
      SERVER_PORT: 7777,
      SECRET: 'some_unique_secret_code_here_for_hashing',
      SENTRY_URI: 'https://YOUR_SENTRY_URL',
      JWT_EXPIRY: '5m'
    }
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