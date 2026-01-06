const Users = require('../models/userModel');
const { ErrorResponse, SuccessResponse } = require('../helpers/responseHandler');
const responseMessages = require('../helpers/responseMessages');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const ACCESS_TOKEN_EXPIRES = process.env.JWT_EXPIRES_IN || '30d';
const REFRESH_TOKEN_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES_IN || '60d';

const createAccessToken = (payload) => {
	return jwt.sign(payload, process.env.JWT_SECRET || 'change_this_secret', { expiresIn: ACCESS_TOKEN_EXPIRES });
};

const createRefreshToken = (payload) => {
	const secret = process.env.REFRESH_TOKEN_SECRET || process.env.JWT_SECRET || 'change_this_secret';
	return jwt.sign(payload, secret, { expiresIn: REFRESH_TOKEN_EXPIRES });
};

const loginUser = async (username, email, password) => {
	if (!password || (!username && !email)) {
		return new ErrorResponse(400, 'Username or email and password are required');
	}

	try {
		const where = username ? { username } : { email };
		const user = await Users.findOne({ where });
		if (!user) {
			return new ErrorResponse(401, 'Invalid credentials');
		}

		const match = await bcrypt.compare(password, user.password);
		if (!match) {
			return new ErrorResponse(401, 'Invalid credentials');
		}


		const payload = { user_id: user.user_id, email: user.email, username: user.username };
		const accessToken = createAccessToken(payload);
		const refreshToken = createRefreshToken(payload);

		const userData = {
			user_id: user.user_id,
			email: user.email,
			username: user.username,
		};

		return new SuccessResponse(200, 'Login successful', { accessToken, refreshToken, user: userData });
	} catch (err) {
		return new ErrorResponse(500, 'Server error');
	}
};

const refreshTokens = async (oldToken) => {
	if (!oldToken) return new ErrorResponse(400, 'Refresh token required');
	try {
		const secret = process.env.REFRESH_TOKEN_SECRET || process.env.JWT_SECRET || 'change_this_secret';
		let payload;
		try {
			payload = jwt.verify(oldToken, secret);
		} catch (e) {
			return new ErrorResponse(401, 'Invalid or expired refresh token');
		}

		const user = await Users.findOne({ where: { user_id: payload.user_id } });
		if (!user) return new ErrorResponse(401, 'Invalid refresh token');

		const newPayload = { user_id: user.user_id, email: user.email, username: user.username };
		const accessToken = createAccessToken(newPayload);
		const refreshToken = createRefreshToken(newPayload);

		const userData = {
			user_id: user.user_id,
			email: user.email,
			username: user.username,
		};

		return new SuccessResponse(200, 'Token refreshed', { accessToken, refreshToken, user: userData });
	} catch (err) {
		return new ErrorResponse(500, 'Server error');
	}
};

const revokeRefreshToken = async (token) => {
	return new SuccessResponse(200, 'Logout successful');
};

module.exports = { loginUser, refreshTokens, revokeRefreshToken };