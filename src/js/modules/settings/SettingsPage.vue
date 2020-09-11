<template>

	<div class="container grid-lg">

		<PageTitle title="Settings" />

		<ul class="tab mb-8">
			<router-link
				v-for="(tab, idx) in tabs"
				:key="idx"
				:to="{ name: tab.id }"
				class="tab-item"
				tag="li"
				active-class="active"
				exact
			><a>{{ tab.label }}</a></router-link>
		</ul>

		<form class="form-vertical" @submit.prevent="submitForm">

			<router-view :settings="settings"></router-view>

			<fieldset class="form-actions mt-16">
				<button type="submit" class="btn btn-primary" name="submit-button" :disabled="isLoading">Save all settings</button>
				<span class="loading ml-4" v-show="isLoading"></span>
			</fieldset>

		</form>

	</div>

</template>

<script>

import { get, commit, call, dispatch } from 'vuex-pathify';

import Network from '@/services/Network';

const tabs = [
	{ id: 'general_settings', label: 'General' },
	{ id: 'email_settings', label: 'Email' },
];

const settingsKeys = [
	'users.enable_registration',
	'smtp.from_name',
	'smtp.from_email',
	'smtp.from_email',
	'smtp.auth_user',
	'smtp.auth_pass',
	'smtp.secure',
	'smtp.port',
	'smtp.host',
];

export default {

	data() {
		return {
			tabs: tabs,
			currentTab: tabs[0].id,
			settings: {}
		}
	},

	computed: {

		...get([
       		'isLoading',
			'authUser',
			'hasEditRole',
			'hasAdminRole',
		]),

	},

	methods: {

		getSettings() {
			commit('START_LOADING');
			Network.getSettings(settingsKeys)
				.then(res => this.settings = res.settings)
				.then(() => commit('STOP_LOADING'));
		},

		submitForm() {
			commit('START_LOADING');
			Network.saveSettings(this.settings)
				.then((res) => {
					if (res.success) {
						commit('SET_TOAST', { message: 'Settings have been saved.', type: 'success', seconds: 4 });
						this.getSettings();
					}
				})
				.catch((err) => commit('SET_TOAST', { message: 'Error saving settings: ' + err, type: 'error' }))
				.finally(() => commit('STOP_LOADING'));
		}

	},

	mounted() {
		this.getSettings();
		if (this.$route.name === 'settings') {
			this.$router.push({ name: 'general_settings' });
		}
	}

}
</script>
