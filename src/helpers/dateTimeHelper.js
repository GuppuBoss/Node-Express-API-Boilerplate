const moment = require('moment');

exports.todayBracket = () => {
    const startDate = `${moment().format('YYYY-MM-DD')}T00:00:00.000Z`;
    const endDate = `${moment().format('YYYY-MM-DD')}T23:59:59.000Z`;
    return { startDate, endDate }
}
