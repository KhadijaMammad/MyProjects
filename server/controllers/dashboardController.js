const dashboardService = require('../services/dashboardService');

const getDashboard = async (req, res) => {
    try {
        const data = await dashboardService.getDashboardData();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Xəta!", error: error.message });
    }
};

module.exports = { getDashboard };