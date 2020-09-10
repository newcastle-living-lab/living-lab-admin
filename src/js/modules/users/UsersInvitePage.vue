<template>

	<div class="container grid-lg">

		<PageTitle title="Invite new user" />

		<form class="form-vertical" @submit.prevent="submitForm">

			<VFieldset legend="Account details">

				<VGroup name="email" label="Email address" size="sm">
					<VInput type="email" id="email" v-model="newUser.email" />
				</VGroup>

				<VGroup name="name" label="Name" size="sm">
					<VInput type="text" id="name" v-model="newUser.name" />
				</VGroup>

				<VGroup name="roles" label="Roles" size="sm">
					<VCheckList name="roles" :options="rolesOptions" v-model="newUser.roles" />
				</VGroup>

			</VFieldset>

			<p>Clicking 'Invite new user' will send an email, which they must verify by clicking a link.</p>

			<fieldset class="form-actions">
				<button type="submit" class="btn btn-primary" name="submit-button">Invite new user</button>
			</fieldset>

		</form>

	</div>

</template>

<script>

import { get, commit, call, dispatch } from 'vuex-pathify';

import Network from '@/services/Network';

export default {

	data() {
		return {
			newUser: {
				email: '',
				name: '',
				roles: []
			},
			rolesOptions: [
				{ value: 'admin', label: 'Admin' },
				{ value: 'edit', label: 'Edit' },
				{ value: 'view', label: 'View' },
			],
		}
	},

	computed: {

		...get([
			'authUser',
			'hasEditRole',
			'hasAdminRole',
		]),

	},

	methods: {

		submitForm() {
			Network.inviteUser(this.newUser)
				.then(() => {
					commit('SET_TOAST', { message: 'An invitation has been emailed to the user!', type: 'success', seconds: 5 });
					this.$router.push({ name: 'users' });
				});
		},

	}

}
</script>
