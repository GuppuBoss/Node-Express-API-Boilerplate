Run app in development mode
$ npm run dev

Stop dev app
$ npm run dev-stop

Clear log files
$ npm run clear-logs

App session
$ npm run app-session

Delete process id
$ pm2 delete pid 

Monitor Processes
$ pm2 monit

Traffic simulation
$ curl -s "http://localhost:3000?[1-1000]"

Deployment Example command
$ pm2 deploy ecosystem.config.js production

pm2 monitor = need to configure

*****************
PM2 LOGS ROTATE
*****************
Package: https://github.com/keymetrics/pm2-logrotate
Command: $ npm run save-logs# Node-Express-API-Boilerplate
