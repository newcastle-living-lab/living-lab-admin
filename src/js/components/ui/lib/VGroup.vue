<template>
	<div class="form-group">
		<label class="form-label" :class="labelClass" :for="name">{{ label }}</label>
		<div class="form-hint" v-if="hint">{{ hint }}</div>
		<div :class="inputWrapperClass">
			<slot />
		</div>
	</div>
</template>

<script>

const sizes = {
	'none': 'col-auto',
	'auto': 'col-auto',
	'xs': 'col-md-6 col-lg-4 col-2',
	'sm': 'col-md-6 col-lg-6 col-4',
	'md': 'col-md-9 col-lg-6 col-6',
	'lg': 'col-md-12 col-lg-8 col-8',
	'xl': 'col-md-12 col-lg-8 col-10',
};

export default {

	name: "VGroup",

	props: {
		'val': [String,Object,Array],
		'name': String,
		'label': String,
		'labelClass': String,
		'size': String,
		'hint': String,
	},

	computed: {
		inputWrapperClass() {
			var classes = ["form-input-wrapper", "col-input"];
			if (sizes[this.size] !== 'undefined') {
				classes.push(sizes[this.size]);
			}
			return classes;
		}
	}

};
</script>
