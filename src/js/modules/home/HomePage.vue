<template>

	<div class="container grid-lg">
		<PageTitle title="Home" v-if="authUser" />

		<div class="empty" v-if="!authUser">
			<div class="empty-icon">

			</div>
			<p class="empty-title h5">You are not logged in.</p>
			<p class="empty-subtitle">Click the button to log in to your account.</p>
			<div class="empty-action">
				<router-link :to="{ name: 'login' }" class="btn btn-primary">Log in</router-link>
			</div>
		</div>
	</div>

</template>

<script>

import { get, commit, call, dispatch } from 'vuex-pathify';

export default {

	props: {
		currentUser: [Boolean, Object]
	},

	computed: {
		...get([
			'authUser',
		]),
	},

}
</script>
