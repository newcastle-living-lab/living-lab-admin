<template>

	<div id="app">

		<AppHeader />
		<LoadingBar :loading="isLoading" />
		<ToastMessage />

		<div class="page-content">
			<router-view></router-view>
		</div>

		<AppMeta />
		<AppLogos />

	</div>

</template>

<script>

import { get, call } from 'vuex-pathify';

export default {

	computed: {

		...get([
			'isLoading',
		]),

	},

	methods: {
		fetchLogos: call('fetchLogos'),
	},

	mounted() {
		this.fetchLogos();
	}

}
</script>
