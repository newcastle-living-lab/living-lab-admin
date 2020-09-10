<template>

	<div class="notice" :class="className">
		<component v-bind:is="iconComponent" size="24" v-if="iconComponent" />
		{{ message }}
	</div>

</template>

<script>

import XCircleIcon from 'vue-feather-icons/icons/XCircleIcon';
import AlertTriangleIcon from 'vue-feather-icons/icons/AlertTriangleIcon';
import InfoIcon from 'vue-feather-icons/icons/InfoIcon';
import CheckCircleIcon from 'vue-feather-icons/icons/CheckCircleIcon';

const iconTypes = {
	'error': 'XCircleIcon',
	'warning': 'AlertTriangleIcon',
	'info': 'InfoIcon',
	'success': 'CheckCircleIcon',
};

export default {

	name: "NoticeView",

	components: {
		XCircleIcon,
		AlertTriangleIcon,
		InfoIcon,
		CheckCircleIcon,
	},

	props: {
		type: String,
		message: String
	},

	computed: {

		className() {
			return `notice-${this.type}`;
		},

		iconComponent() {
			if (iconTypes[this.type] !== undefined) {
				return iconTypes[this.type];
			}
			return false;
		}

	}

}

</script>
