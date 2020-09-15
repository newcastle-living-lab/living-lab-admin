<template>


	<header class="header">

		<div class="container grid-lg">
			<div class="columns">
				<div class="column col-12">
					<div class="navbar">
						<section class="navbar-section section-logo">
							<a :href="config.homeUri" v-if="config && config.homeUri" class="logo-link d-inline-block">
								{{ homeLabel }}
							</a>
							<router-link :to="{ name: 'home' }" v-if="!config.homeUri" class="logo-link d-inline-block">
								{{ homeLabel }}
							</router-link>
							<ul class="main-menu">
								<router-link
									v-for="(item, idx) in menuItems"
									:key="idx"
									:to="item.to"
									tag="li"
									active-class="active"
								>
									<a class="btn btn-link">
										<component v-bind:is="item.iconComponent" />
										{{ item.label }}
									</a>
								</router-link>
							</ul>
						</section>
						<section class="navbar-section section-user">
							<ul class="main-menu">
								<router-link
									v-if="authUser"
									:to="{ name: 'account' }"
									tag="li"
									active-class="active"
								><a class="btn btn-link">{{ authUser.name ? authUser.name : authUser.email }}</a></router-link>
								<li v-if="authUser">
									<button class="btn btn-link" @click="doLogout()">Log out</button>
								</li>
								<router-link
									v-if="!authUser"
									:to="{ name: 'login' }"
									tag="li"
									active-class="active"
								><a class="btn btn-link">Log in</a></router-link>
							</ul>
						</section>
					</div>
				</div>
			</div>
		</div>
	</header>

</template>

<script>

import { get, commit, call, dispatch } from 'vuex-pathify';

import UsersIcon from 'vue-feather-icons/icons/UsersIcon';
import SettingsIcon from 'vue-feather-icons/icons/SettingsIcon';

export default {

	name: "AppHeader",

	components: {
		UsersIcon,
		SettingsIcon,
	},

	computed: {

		...get([
			'config',
			'authUser',
			'hasEditRole',
			'hasAdminRole',
		]),

		homeLabel() {
			if (this.config.homeLabel) {
				return this.config.homeLabel;
			}

			return 'Living Lab';
		},

		menuItems() {

			var items = [];

			if ( ! this.authUser) {
				return items;
			}

			if (this.hasAdminRole) {
				items.push({
					label: 'Users',
					to: { name: 'users' },
					iconComponent: UsersIcon,
				});
				items.push({
					label: 'Settings',
					to: { name: 'settings' },
					iconComponent: SettingsIcon,
				});
			}

			return items;
		}

	},

	methods: {

		logout: call('logout'),

		doLogout() {
			this.logout().then(res => {
				this.$router.push({ name: 'login' });
			});
		}
	}

}

</script>
