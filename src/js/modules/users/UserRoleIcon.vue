<template>
	<span class="icon-sm" :style="config.style">
		<component v-bind:is="config.icon" v-if="config.icon" />
	</span>
</template>

<script>

import CheckIcon from 'vue-feather-icons/icons/CheckIcon';
import XIcon from 'vue-feather-icons/icons/XIcon';

export default {

	components: {
		CheckIcon,
		XIcon,
	},

	props: {
		roles: Array,
		hasRole: String,
	},

	computed: {

		config() {

			var config = {
				style: { color: '#ccc' },
				icon: null,
			}

			if (this.roles.indexOf(this.hasRole) !== -1) {
				config.icon = 'CheckIcon';
				config.style.color = '#2ecc40';
			} else {
				config.icon = 'XIcon';
				config.style.color = '#aaaaaa';
			}

			return config;
		}
	}
}
</script>
