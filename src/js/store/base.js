import { make } from 'vuex-pathify';
// import debounce from 'lodash/debounce';

// import Aspects from '@/aspects';
import Network from '@/services/Network';

export const state = {
	authUser: null,
	isLoading: false,
	toast: {
		active: false,
		message: null,
		type: null,
		seconds: null
	}
};


export const getters = {

	hasUser(state) {
		return (state.authUser !== null && typeof state.authUser === 'object' && state.authUser.id ? true : false);
	},

	hasEditRole(state, getters) {
		return (getters.hasUser && state.authUser.roles.indexOf('edit') >= 0);
	},

	hasAdminRole(state, getters) {
		return (getters.hasUser && state.authUser.roles.indexOf('admin') >= 0);
	},
};


export const mutations = {

	// creates SET_* functions
	...make.mutations(state),

	START_LOADING(state) {
		state.isLoading = true;
	},

	STOP_LOADING(state) {
		state.isLoading = false;
	},

	SET_TOAST(state, { type, message, seconds }) {
		state.toast.active = true;
		state.toast.type = type;
		state.toast.message = message;
		state.toast.seconds = seconds;
	},

	CLEAR_TOAST(state) {
		state.toast.active = false;
		state.toast.type = null;
		state.toast.message = null;
		state.toast.seconds = null;
	},

};

export const actions = {

	fetchAuthUser({ state, commit }) {
		commit('SET_AUTH_USER', null);
		return Network.getAuthUser().then(user => {
			commit('SET_AUTH_USER', user);
			return user;
		});
	},

	logout({ state, commit, dispatch }) {
		return Network.logoutUser().then(res => {
			dispatch('fetchAuthUser');
		});
	}

}