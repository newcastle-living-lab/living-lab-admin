<template>

	<div class="container grid-lg">

		<PageTitle title="Set account password" />

		<NoticeView type="error" :message="errorMessage" v-if="errorMessage" />

		<form class="form-vertical" @submit.prevent="submitForm" v-if="validToken">

			<VFieldset legend="Account details">

				<VGroup name="email" label="Email address" size="sm">
					<VInput type="email" id="email" v-model="user.email" disabled />
				</VGroup>

				<VGroup name="password" label="New password" size="sm" hint="At least 8 characters.">
					<VInput type="password" id="password" v-model="newPassword" required minlength="8" />
				</VGroup>

			</VFieldset>

			<fieldset class="form-actions">
				<button type="submit" class="btn btn-primary" name="submit-button">Submit</button>
			</fieldset>

		</form>

	</div>

</template>

<script>

import { get, commit, call, dispatch } from 'vuex-pathify';

import Network from '@adminRoot/services/Network';

export default {

	props: {
		'id': {
			type: [String, Number],
			coerce: function (val) {
				return parseInt(val, 10);
			}
		},
	},

	data() {
		return {
			newPassword: '',
			user: null,
			token: null,
			validToken: false,
			errorMessage: false,
		}
	},

	/*computed: {
		...get([
			'authUser',
		]),
	},*/

	methods: {

		checkToken() {
			commit('START_LOADING');
			Network.checkUserVerifyToken(this.id, this.token)
				.then((res) => {
					if (res.success) {
						this.user = res.user;
						this.validToken = res.success
					} else {
						this.errorMessage = res.reason;
					}
				})
				.finally(() => commit('STOP_LOADING'));
		},

		submitForm() {

			this.errorMessage = false;

			if (this.newPassword.length < 8) {
				this.errorMessage = "Password must be 8 characters or longer."
			}

			var data = {
				id: this.id,
				token: this.token,
				password: this.newPassword,
			};

			commit('START_LOADING');
			Network.setInitialPassword(this.id, this.token, this.newPassword)
				.then((res) => {
					if (res.success) {
						dispatch('fetchAuthUser').then(res => {
							this.$router.push({ name: 'home' });
						});
						return true;
					} else {
						this.errorMessage = res.reason;
						return false;
					}
				})
				.then(() => {
					commit('SET_TOAST', { message: 'Your password has been set and you are now logged in!', type: 'success', seconds: 8 });
				})
				.finally(() => commit('STOP_LOADING'));

		}
	},

	mounted() {
		if (window.location.hash) {
			this.token = window.location.hash.substring(1);
			this.checkToken();
		}
	}

}
</script>
