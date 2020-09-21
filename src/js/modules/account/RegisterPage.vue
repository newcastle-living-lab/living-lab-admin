<template>

	<div class="container grid-xxs">

		<PageTitle title="Create an account" />

		<NoticeView type="error" :message="errorMessage" v-if="errorMessage" />

		<form class="form-vertical mb-4" @submit.prevent="doRegister">

			<div class="card card-light">

				<div class="card-body">
					<div class="form-group">
						<label class="form-label" for="name">Name</label>
						<VInput type="text" id="name" v-model="newUser.name" />
					</div>
					<div class="form-group">
						<label class="form-label" for="email">Email address</label>
						<VInput type="email" id="email" v-model="newUser.email" />
					</div>
				</div>
				<div class="card-footer">
					<VButton
						class="btn-primary btn-block"
					>Register</VButton>
				</div>

			</div>

		</form>

		<div class="card card-sm">
			<div class="card-body">
				<div class="text-center">Already registered? <router-link :to="{ name: 'login' }">Log in</router-link>.</div>
			</div>
		</div>

	</div>

</template>

<script>

import { get, commit, call, dispatch } from 'vuex-pathify';

import Network from '@adminRoot/services/Network';

export default {

	data() {
		return {
			newUser: {
				name: '',
				email: '',
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

		doRegister() {
			this.errorMessage = false;
			Network.registerUser(this.newUser)
				.then(res => {
					if (res.success) {
						this.$router.push({ name: 'home' });
						commit('SET_TOAST', { message: 'Check your email for further instructions.', type: 'success' });
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
