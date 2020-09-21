<template>

	<div class="container grid-lg">

		<PageTitle title="Settings" />

		<ul class="tab mb-8">
			<li
				v-for="(tab, idx) in tabs"
				:key="idx"
				:class="tab.id == currentTab ? 'active' : ''"
				class="tab-item"
				tag="li"
			><a href="#" @click.prevent="currentTab = tab.id">{{ tab.label }}</a></li>
			<!-- <router-link
				v-for="(tab, idx) in tabs"
				:key="idx"
				:to="{ name: tab.id }"
				class="tab-item"
				tag="li"
				active-class="active"
				exact
			><a>{{ tab.label }}</a></router-link> -->
		</ul>

		<form class="form-vertical" @submit.prevent="submitForm">

			<!-- <router-view :settings="settings"></router-view> -->
			<GeneralSettings :settings="settings" v-show="currentTab == 'general_settings'" />
			<EmailSettings :settings="settings" v-show="currentTab == 'email_settings'" />

			<fieldset class="form-actions mt-16">
				<div class="navbar">
					<div class="navbar-section">
						<button type="submit" class="btn btn-primary" name="submit-button" :disabled="isLoading">Save all settings</button>
						<span class="loading ml-4" v-show="isLoading"></span>
					</div>
					<div class="navbar-section">
						<button class="btn btn-grey mr-2" @click.prevent="modal='export'">Export</button>
						<button class="btn btn-grey" @click.prevent="modal='import'">Import</button>
					</div>
				</div>
			</fieldset>

		</form>

		<div class="modal" :class="modal == 'export' ? 'active' : ''">
			<a class="modal-overlay" aria-label="Close" @click.prevent="modal=''"></a>
			<div class="modal-container">
				<div class="modal-header">
					<button class="btn btn-clear float-right" aria-label="Close" @click="modal=''"></button>
					<div class="modal-title h5">Export settings</div>
				</div>
				<div class="modal-body">
					<div class="content">
						<textarea class="form-input" rows="10" @focus="$event.target.select()">{{ JSON.stringify(settings, null, 4) }}</textarea>
					</div>
				</div>
				<div class="modal-footer">
					<button class="btn btn-link" @click.prevent="modal=''">Close</button>
				</div>
			</div>
		</div>

		<div class="modal" :class="modal == 'import' ? 'active' : ''">
			<a class="modal-overlay" aria-label="Close" @click.prevent="modal=''"></a>
			<div class="modal-container">
				<div class="modal-header">
					<button class="btn btn-clear float-right" aria-label="Close" @click="modal=''"></button>
					<div class="modal-title h5">Import settings</div>
					<p>Paste the settings into the box below and click Import.</p>
					<NoticeView type="error" :message="importError" v-if="importError" />
				</div>
				<div class="modal-body">
					<div class="content">
						<textarea class="form-input" rows="10" v-model="importedSettings"></textarea>
					</div>
				</div>
				<div class="modal-footer">
					<button class="btn btn-success mr-2" @click.prevent="doImport()">Import</button>
					<button class="btn btn-link" @click.prevent="modal=''">Close</button>
				</div>
			</div>
		</div>

	</div>

</template>

<script>

import { get, commit, call, dispatch } from 'vuex-pathify';

import Network from '@adminRoot/services/Network';

import EmailSettings from './EmailSettings';
import GeneralSettings from './GeneralSettings';

const tabs = [
	{ id: 'general_settings', label: 'General' },
	{ id: 'email_settings', label: 'Email' },
];

const settingsKeys = [
	'users.enable_registration',
	'cosmos.auto_save',
	'cosmos.fathom_site_id',
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

	components: {
		GeneralSettings,
		EmailSettings,
	},

	data() {
		return {
			tabs: tabs,
			currentTab: tabs[0].id,
			settings: {},
			modal: false,
			importedSettings: '',
			importError: false,
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
		},

		doImport() {

			try {
				var data = JSON.parse(this.importedSettings);
			} catch (err) {
				this.importError = err.toString();
				return;
			}

			this.settings = {...this.settings, ...data};
			this.importError = false;
			this.modal = false;

			commit('SET_TOAST', { message: 'The settings have been imported successfully. Click Save to save them.', type: 'success'});
		}

	},

	mounted() {
		this.getSettings();
		// if (this.$route.name === 'settings') {
		// 	this.$router.push({ name: 'general_settings' });
		// }
	}

}
</script>
