<template>

	<div class="container grid-lg">
		<PageTitle title="Your account" />
		<pre>{{ authUser }}</pre>
	</div>

</template>

<script>

import { get, commit, call, dispatch } from 'vuex-pathify';

export default {

	computed: {
		...get([
			'authUser',
		]),
	}

}
</script>
