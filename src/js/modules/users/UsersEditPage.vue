<template>

	<div class="container grid-lg">

		<PageTitle title="Edit user account" />

		<p>
			<button class="btn btn-primary" @click.prevent="resendInvite" v-if="user && user.status == 5">Re-send invitation email</button>
		</p>


		<form class="form-vertical" @submit.prevent="saveUser" v-if="user && user.status != 5">

			<VFieldset legend="Account details">

				<VGroup name="name" label="Name" size="sm">
					<VInput type="text" id="name" v-model="user.name" />
				</VGroup>

				<VGroup name="email" label="Email address" size="sm">
					<VInput type="email" id="email" v-model="user.email" />
				</VGroup>

				<VGroup name="roles" label="Roles">
					<VCheckList name="roles" :options="rolesOptions" v-model="user.roles" />
				</VGroup>

				<VGroup name="status" label="Status">
					<VRadioList name="status" :options="statusOptions" v-model="user.status" />
				</VGroup>

			</VFieldset>

			<fieldset class="form-actions">
				<button type="submit" class="btn btn-primary" name="submit-button">Save</button>
			</fieldset>

		</form>

	</div>

</template>

<script>

import { get, commit, call, dispatch } from 'vuex-pathify';

import Network from '@adminRoot/services/Network';
import statuses from '@adminRoot/data/user_statuses';

export default {

	props: {
		'id': {
			type: [String, Number],
			coerce: function (val) {
				return parseInt(val, 10);
			}
		}
	},

	data() {
		return {
			user: null,
			rolesOptions: [
				{ value: 'admin', label: 'Admin' },
				{ value: 'edit', label: 'Edit' },
				{ value: 'view', label: 'View' },
			],
			statusOptions: [
				{ value: statuses.VERIFIED, label: 'Active' },
				{ value: statuses.DISABLED, label: 'Disabled' },
			]
		};
	},

	computed: {

		...get([
			'authUser',
			'hasEditRole',
			'hasAdminRole',
		]),

	},

	methods: {

		getUser() {
			Network.getUser(this.id)
				.then(user => this.user = user);
		},

		saveUser() {
			commit('START_LOADING');
			Network.saveUser(this.user)
				.then((res) => {
					if (res.success) {
						commit('SET_TOAST', { message: 'User details have been saved.', type: 'success', seconds: 4 });
						this.$router.push({ path: '/users' });
						// this.getUser();
						// return true;
					} else {
						commit('SET_TOAST', { message: 'Error saving user details: ' + res.reason, type: 'error' });
					}
				})
				// .then(() => commit('SET_TOAST', { message: 'User details have been saved.', type: 'success', seconds: 4 }))
				.catch((err) => commit('SET_TOAST', { message: 'Error saving user details: ' + err, type: 'error' }))
				.finally(() => commit('STOP_LOADING'));
		},

		resendInvite() {
			commit('START_LOADING');
			Network.resendUserInvitationEmail(this.user.id)
				.then(() => commit('SET_TOAST', { message: 'Email has been re-sent.', type: 'success', seconds: 4 }))
				.catch((err) => commit('SET_TOAST', { message: 'Error sending email: ' + err, type: 'error' }))
				.finally(() => commit('STOP_LOADING'));
		}

	},

	mounted() {
		this.getUser(this.id);
	}

}
</script>
