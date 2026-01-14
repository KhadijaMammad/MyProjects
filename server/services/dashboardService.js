const CalendarEvent = require('../models/calendarModel');
const News = require('../models/newsModel');
const TaskModel = require('../models/taskModel');

const getDashboardData = async () => {
    const [calendar, news, tasks] = await Promise.all([
        CalendarEvent.findAll({ limit: 3, order: [['start_time', 'ASC']] }),
        News.findAll({ limit: 4, order: [['sent_at', 'DESC']] }),
        TaskModel.findAll({ where: { status: 'Open' }, limit: 5 })
    ]);

    return { calendar, news, tasks };
};

module.exports = { getDashboardData };