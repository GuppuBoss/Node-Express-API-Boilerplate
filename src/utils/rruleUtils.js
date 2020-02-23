const {RRule} = require('rrule');

exports.parseSchedule = (schedule) => {
    return new RRule.fromString(schedule);
}
