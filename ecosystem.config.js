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
      DATABASE: 'mongodb+srv://scripts:jCb0wAVEfLDtUxyg@cluster0-49k2t.mongodb.net/mygoally?retryWrites=true&w=majority&authSource=admin',
      SERVER_PORT: 3030,
      SECRET: '8ZEJNSDJ95HD91ZDDNTK7Q0TQ3QSE7PC8J0ZKHRJBD2W9ZJ5O3',
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
      SENTRY_URI: 'https://cff130b15acc4931a6ef2e12a3a50e33@sentry.io/1237008',
      BASE_URL: 'https://staging.mygoally.com',
      DATABASE: 'mongodb+srv://scripts:jCb0wAVEfLDtUxyg@cluster0-49k2t.mongodb.net/mygoallybeta?retryWrites=true&w=majority&authSource=admin',
      SERVER_PORT: 3010,
      SECRET: '67YLLN6WGW4RUWDACQA4I1BHAIZX7PWQW10JFW1A',
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
      DATABASE: 'mongodb://node-express-starter:node-express-starter123@ds117535.mlab.com:17535/node-express-starter',
      SERVER_PORT: 7777,
      SECRET: 'some_unique_secret_code_here_for_hashing',
      SENTRY_URI: 'https://5a674f3cddc5410793fe9fd9acd5aff9@sentry.io/1352545',
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