const authService = require('../services/authService');

const loginUser = async (req, res) => {
  const { username, email, password } = req.body;
  const result = await authService.loginUser(username, email, password);
    if (!result || result.status === false) {
    return res.status(result && result.statusCode ? result.statusCode : 400).json(result);
  }

  return res.status(result.statusCode || 200).json(result);
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  const result = await authService.refreshTokens(refreshToken);
  if (!result || result.status === false) {
    return res.status(result && result.statusCode ? result.statusCode : 400).json(result);
  }
  return res.status(result.statusCode || 200).json(result);
};

const logoutUser = async (req, res) => {
  const { refreshToken } = req.body;
  const result = await authService.revokeRefreshToken(refreshToken);
  return res.status(result.statusCode || 200).json(result);
};

module.exports = { loginUser, logoutUser, refreshToken };