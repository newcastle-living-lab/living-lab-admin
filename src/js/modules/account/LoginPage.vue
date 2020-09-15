<template>

	<div class="container grid-xxs">

		<PageTitle title="Log in" />

		<NoticeView type="error" message="Incorrect email/password" v-if="errorMessage" />

		<form class="form-vertical mb-4" @submit.prevent="doLogin">

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

		<div class="card card-sm" v-if="config.enableRegistration">
			<div class="card-body">
				<div class="text-center">New to Living Lab? <router-link :to="{ name: 'register' }">Create an account</router-link>.</div>
			</div>
		</div>

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
			'config',
			'authUser',
		]),
	},

	methods: {

		doLogin() {
			this.errorMessage = false;
			Network.loginUser(this.loginForm.email, this.loginForm.password)
				.then(res => {
					if ( ! res.success) {
						throw new Error( (res && res.reason ? res.reason : 'Unknown error') );
					}
					return (res.returnTo && res.returnTo.length ? res.returnTo : null);
				})
				.then((returnTo) => {
					dispatch('fetchAuthUser').then(res => {
						if (returnTo) {
							window.location.href = returnTo;
						} else {
							this.$router.push({ name: 'home' });
						}
					});
				})
				.catch((err) => {
					this.errorMessage = err;
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
