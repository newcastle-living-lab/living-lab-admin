<template>

	<form class="form-vertical" @submit.prevent="saveAccount" v-if="user">

		<VFieldset legend="Account details">

			<VGroup name="name" label="Name" size="sm">
				<VInput type="text" id="name" v-model="user.name" />
			</VGroup>

			<VGroup name="email" label="Email address" size="sm">
				<VInput type="email" id="email" v-model="user.email" />
			</VGroup>

		</VFieldset>

		<fieldset class="form-actions">
			<button type="submit" class="btn btn-primary" name="submit-button">Update</button>
		</fieldset>

	</form>

</template>

<script>

import { get, commit, call, dispatch } from 'vuex-pathify';

import Network from '@adminRoot/services/Network';

export default {

	data() {
		return {
			user: null,
		}
	},

	methods: {

		getUser() {
			Network.getAuthUser()
				.then(user => this.user = user);
		},

		saveAccount() {
			commit('START_LOADING');
			Network.saveAccount(this.user)
				.then((res) => {
					if (res.success) {
						commit('SET_TOAST', { message: 'Your account has been updated.', type: 'success', seconds: 4 });
						dispatch('fetchAuthUser');
						this.getUser();
						return true;
					} else {
						commit('SET_TOAST', { message: 'Error saving your account details: ' + res.reason, type: 'error' })
					}
				})
				.catch((err) => commit('SET_TOAST', { message: 'Error saving your account details: ' + err, type: 'error' }))
				.finally(() => commit('STOP_LOADING'));
		}

	},

	mounted() {
		this.getUser();
	}

}

</script>
