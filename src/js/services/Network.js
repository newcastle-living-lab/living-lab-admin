import axios from 'axios';

import pick from 'lodash/pick';

var baseURL = '/api';

const http = axios.create({
	baseURL: baseURL,
	validateStatus: function (status) {
		return (status >= 200 && status < 300) || (status === 401 || status === 403);
	},
});

export default {

	getAuthUser() {
		return http.get('/auth/session')
			.then(res => res.data && res.data.success ? res.data.user : null);
	},

	logoutUser() {
		return http.delete('/auth/session')
			.then(res => res.data);
	},

	loginUser(email, password) {
		return http.post('/auth/session', { username: email, password: password })
			.then(res => res.data)
	},

	registerUser(user) {
		return http.post('/users/register', user)
			.then(res => res.data)
	},

	getUsers() {
		return http.get('/users')
			.then(res => res.data.users);
	},

	getUser(id) {
		const userId = parseInt(id, 10);
		return http.get(`/users/${userId}`)
			.then(res => res.data.user);
	},

	inviteUser(user) {
		return http.post('/users/invite', user)
			.then(res => res.data);
	},

	deleteUser(id) {
		const userId = parseInt(id, 10);
		return http.delete(`/users/${userId}`)
			.then(res => res.data);
	},

	saveUser(user) {
		const userId = parseInt(user.id, 10);
		return http.put(`/users/${userId}`, user)
			.then(res => res.data);
	},

	saveAccount(user) {
		const userData = pick(user, ['name', 'email']);
		return http.put(`/auth/user`, userData)
			.then(res => res.data);
	},

	changePassword(currentPassword, newPassword) {
		const data = {
			current_password: currentPassword,
			new_password: newPassword,
		};
		return http.post(`/auth/password`, data)
			.then(res => res.data);
	},

	resendUserInvitationEmail(id) {
		const userId = parseInt(id, 10);
		return http.post(`/users/send_invite_email/${userId}`)
			.then(res => res.data);
	},

	checkUserVerifyToken(id, token) {
		const userId = parseInt(id, 10);
		return http.post(`/users/check_verify_token/${userId}/${token}`)
			.then(res => res.data);
	},

	setInitialPassword(id, token, password) {
		const userId = parseInt(id, 10);
		const data = { password: password };
		return http.post(`/users/set_initial_password/${userId}/${token}`, data)
			.then(res => res.data);
	},

	getSettings(settings) {
		return http.get(`/settings`, { params: { keys: settings }})
			.then(res => res.data);
	},

	saveSettings(settings) {
		return http.put(`/settings`, settings)
			.then(res => res.data);
	}

}
