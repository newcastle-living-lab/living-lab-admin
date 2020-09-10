<template>

	<div class="container grid-xxs">

		<PageTitle title="Log in" />

		<NoticeView type="error" message="Incorrect email/password" v-if="errorMessage" />

		<form class="form-vertical" @submit.prevent="doLogin">

			<div class="card card-light">

				<div class="card-body">
					<div class="form-group">
						<label class="form-label" for="email">Username or email address</label>
						<VInput type="text" id="email" v-model="loginForm.email" />
					</div>
					<div class="form-group">
						<label class="form-label" for="password">Password</label>
						<VInput type="password" id="password" v-model="loginForm.password" />
					</div>
				</div>
				<div class="card-footer">
					<VButton
						class="btn-primary btn-block"
					>Log in</VButton>
				</div>

			</div>

		</form>

	</div>

</template>

<script>

import { get, commit, call, dispatch } from 'vuex-pathify';

import Network from '@/services/Network';

export default {

	data() {
		return {
			loginForm: {
				email: '',
				password: '',
			},
			errorMessage: false,
		}
	},

	computed: {
		...get([
			'authUser',
		]),
	},

	methods: {

		doLogin() {
			this.errorMessage = false;
			Network.loginUser(this.loginForm.email, this.loginForm.password)
				.then(res => {
					if (res.success) {
						dispatch('fetchAuthUser').then(res => {
							this.$router.push({ name: 'home' });
						});
						return;
					}
					this.errorMessage = res.reason;
				});
		}

	},

	mounted() {
		if (this.authUser && this.authUser.id) {
			this.$router.push({ name: 'home' });
			commit('SET_TOAST', { message: 'You are already logged in.', type: 'success', seconds: 4 });
		}
	}

}
</script>
