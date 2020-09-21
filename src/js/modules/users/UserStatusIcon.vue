<template>
	<span class="icon-sm tooltip" :data-tooltip="config.tooltip" :style="config.style">
		<component v-bind:is="config.icon" v-if="config.icon" />
	</span>
</template>

<script>

import ClockIcon from 'vue-feather-icons/icons/ClockIcon';
import CheckIcon from 'vue-feather-icons/icons/CheckIcon';
import XIcon from 'vue-feather-icons/icons/XIcon';

import statuses from '@adminRoot/data/user_statuses';

export default {

	components: {
		ClockIcon,
		CheckIcon,
		XIcon,
	},

	props: {
		status: Number,
	},

	computed: {

		config() {

			var config = {
				style: { color: '#ccc' },
				icon: null,
				tooltip: '',
			};

			switch (this.status) {
				case statuses.CREATED:
					config.tooltip = 'Pending';
					config.style.color = '#ff851b';
					config.icon = 'ClockIcon';
				break;
				case statuses.VERIFIED:
					config.tooltip = 'Active';
					config.style.color = '#2ecc40';
					config.icon = 'CheckIcon';
				break;
				case statuses.DISABLED:
					config.tooltip = 'Disabled';
					config.style.color = '#ff4136';
					config.icon = 'XIcon';
				break;
			}

			return config;
		}
	}
}

</script>
