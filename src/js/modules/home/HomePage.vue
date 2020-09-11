<template>

	<div>

		<div class="container grid-lg" v-if="authUser">
			<PageTitle title="Home" v-if="authUser" />
		</div>

		<div class="container grid-sm" v-if="!authUser">
			<div class="empty" v-if="!authUser">
				<div class="empty-icon"></div>
				<p class="empty-title h5">You are not logged in.</p>
				<p class="empty-subtitle">Click the button to log in to your account.</p>
				<div class="empty-action">
					<router-link :to="{ name: 'login' }" class="btn btn-primary">Log in</router-link>
					<router-link :to="{ name: 'register' }" v-if="config.enableRegistration" class="btn btn-link">Register</router-link>
				</div>
			</div>
		</div>

	</div>

</template>

<script>

import { get, commit, call, dispatch } from 'vuex-pathify';

import Network from '@/services/Network';

export default {

	computed: {
		...get([
			'config',
			'authUser',
		]),
	},


}
</script>
