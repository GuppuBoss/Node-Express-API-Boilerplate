exports.dump = (obj) => JSON.stringify(obj, null, 2);

exports.isEmptyObject = (obj) => {
    if (Object.keys(obj).length === 0 && obj.constructor === Object) {
        return true
    } else {
        return false
    }
}

exports.objectToArray = (obj) => {
    return Object.keys(obj).map(key => obj[key]);
}

/*
  Catch Errors Handler
  With async/await, you need some way to catch errors
  Instead of using try{} catch(e) {} in each controller, we wrap the function in
  catchErrors(), catch any errors they throw, and pass it along to our express middleware with next()
*/

exports.catchErrors = (fn) => {
    return function(req, res, next) {
        return fn(req, res, next).catch(next);
    };
};

/*
  Not Found Error Handler
  If we hit a route that is not found, we mark it as 404 and pass it along to the next error handler to display
*/
exports.notFound = (req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
};

/*
  Development Error Handler
  In development we show good error messages so if we hit a syntax error or any other previously un-handled error, we can show good info on what happened
*/
exports.developmentErrors = (err, req, res, next) => {
    console.log('🔥 Development Errors 🔥');
    err.stack = err.stack || '';
    const errorDetails = {
        message: err.message,
        status: err.status,
        stackHighlighted: err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>')
    };
    console.log('Error: ', err);
    res.status(err.status || 500);
    res.format({ 'application/json': () => res.json(errorDetails) });
};


/*
  Production Error Handler
  No stacktraces are leaked to user
*/
exports.productionErrors = (err, req, res, next) => {
    console.log('💥 Production Errors 💥');
    if(err.message !== 'Not Found') {
        // add some logic for Sentry 
    }
    let errorDetails = {
        message: err.message,
        error: {}
    }
    res.status(err.status || 500);
    res.format({ 'application/json': () => res.json(errorDetails) });
};

exports.basicAuth = (req, res, next) => {
    const auth = { login: 'idea94', password: '123456789' };
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = new Buffer(b64auth, 'base64').toString().split(':')
    if (login && password && login === auth.login && password === auth.password) {
        return next()
    }
    // Access denied...
    res.set('WWW-Authenticate', 'Basic remarks="500"') // change this
    res.status(401).send('Access Forbidden');
};