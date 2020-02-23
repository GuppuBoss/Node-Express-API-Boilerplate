const moment = require('moment-timezone');

exports.timeZoneOffSetInSeconds = (timeZone) => {
    const utc = moment(moment().tz('UTC').format('YYYY-MM-DD hh:mm:ss a'));
    const here = moment(moment().tz('UTC').tz(timeZone).format('YYYY-MM-DD hh:mm:ss a'));
    return moment.duration(here.diff(utc)).asSeconds();
}

exports.getDateTime = () => {
    return moment().format();
}
