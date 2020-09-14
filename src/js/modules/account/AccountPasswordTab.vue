<template>

	<form class="form-vertical" @submit.prevent="savePassword">

		<NoticeView type="error" :message="errorMessage" v-if="errorMessage" />

		<VFieldset legend="Change password">

			<VGroup name="current_password" label="Current password" size="sm">
				<VInput type="password" id="current_password" v-model="currentPassword" />
			</VGroup>

			<VGroup name="new_password_1" label="New password" size="sm">
				<VInput type="password" id="new_password_1" v-model="newPassword1" />
			</VGroup>

			<VGroup name="new_password_2" label="New password" size="sm">
				<VInput type="password" id="new_password_2" v-model="newPassword2" />
			</VGroup>

		</VFieldset>

		<fieldset class="form-actions">
			<button type="submit" class="btn btn-primary" name="submit-button">Change password</button>
		</fieldset>

	</form>

</template>

<script>

import { get, commit, call, dispatch } from 'vuex-pathify';

import Network from '@/services/Network';

export default {

	data() {
		return {
			errorMessage: null,
			currentPassword: null,
			newPassword1: '',
			newPassword2: '',
		};
	},

	methods: {

		getValid() {

			var hasLength = (this.newPassword1.length >= 8);
			var isSame = (this.newPassword2 == this.newPassword1);

			if ( ! hasLength) {
				return 'Password must contain 8 characters or more.';
			}

			if ( ! isSame) {
				return 'New passwords must match.';
			}

			return true;
		},

		savePassword() {

			var err = this.getValid();
			if (err !== true) {
				this.errorMessage = err;
				return;
			}

			commit('START_LOADING');

			Network.changePassword(this.currentPassword, this.newPassword1)
				.then((res) => {
					if (res.success) {
						commit('SET_TOAST', { message: 'Your password has been updated.', type: 'success', seconds: 4 });
						this.currentPassword = '';
						this.newPassword1 = '';
						this.newPassword2 = '';
						return true;
					} else {
						commit('SET_TOAST', { message: 'Error changing password: ' + res.reason, type: 'error' })
					}
				})
				.catch((err) => commit('SET_TOAST', { message: 'Error changing password: ' + err, type: 'error' }))
				.finally(() => commit('STOP_LOADING'));
		}

	},

}

</script>
