<template>

	<div class="container grid-lg">

		<PageTitle title="Your account" />

		<ul class="tab mb-8">
			<li
				v-for="(tab, idx) in tabs"
				:key="idx"
				:class="tab.id == currentTab ? 'active' : ''"
				class="tab-item"
				tag="li"
			><a href="#" @click.prevent="currentTab = tab.id">{{ tab.label }}</a></li>
		</ul>

		<AccountDetailsTab v-show="currentTab == 'account'" />
		<AccountPasswordTab v-show="currentTab == 'password'" />

	</div>

</template>

<script>

import AccountDetailsTab from './AccountDetailsTab';
import AccountPasswordTab from './AccountPasswordTab';

const tabs = [
	{ id: 'account', label: 'Account' },
	{ id: 'password', label: 'Password' },
];

export default {

	components: {
		AccountDetailsTab,
		AccountPasswordTab,
	},

	data() {
		return {
			tabs: tabs,
			currentTab: tabs[0].id,
		}
	},



}
</script>
