<template>

	<div class="container grid-lg">

		<PageTitle title="User accounts" />

		<p>
			<router-link :to="{ name: 'users_invite' }" class="btn btn-success">Invite new user</router-link>
		</p>

		<table class="table" v-if="users.length > 0">
			<thead>
				<tr>
					<th width="5%">Status</th>
					<th width="20%">Email</th>
					<th width="20%">Name</th>
					<th width="5%">Admin</th>
					<th width="5%">Edit</th>
					<th width="5%">View</th>
					<th width="5%">Delete</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(user, idx) in users">
					<td>
						<UserStatusIcon :status="user.status" />
					</td>
					<td>
						<router-link :to="{ name: 'users_edit', params: { id: user.id } }">
							{{ user.email }}
						</router-link>
					</td>
					<td>
						{{ user.name }}
					</td>
					<td>
						<UserRoleIcon :roles="user.roles" hasRole="admin" />
					</td>
					<td>
						<UserRoleIcon :roles="user.roles" hasRole="edit" />
					</td>
					<td>
						<UserRoleIcon :roles="user.roles" hasRole="view" />
					</td>
					<td>
						<button class="btn btn-link btn-sm text-gray" @click.prevent="deleteUser(user)">
							<span class="icon-sm"><Trash2Icon /></span>
						</button>
					</td>
				</tr>
			</tbody>
		</table>

	</div>

</template>

<script>

import { get, commit, call, dispatch } from 'vuex-pathify';

import Trash2Icon from 'vue-feather-icons/icons/Trash2Icon';

import Network from '@adminRoot/services/Network';

import UserStatusIcon from './UserStatusIcon';
import UserRoleIcon from './UserRoleIcon';

export default {

	components: {
		UserStatusIcon,
		UserRoleIcon,
		Trash2Icon,
	},

	data() {
		return {
			users: []
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

		displayName(user) {
			if (user.email === user.name) {
				return user.email;
			}
			return user.email;
		},

		getUsers() {
			commit('START_LOADING');
			Network.getUsers()
				.then(users => this.users = users)
				.then(() => commit('STOP_LOADING'));
		},

		deleteUser(user) {
			if (confirm("Are you sure you want to delete this user?")) {
				Network.deleteUser(user.id)
					.then(() => commit('SET_TOAST', { message: 'User has been deleted.', type: 'success', seconds: 2 }))
					.then(this.getUsers());
			}
		}

	},

	mounted() {
		this.getUsers();
	}

}
</script>
