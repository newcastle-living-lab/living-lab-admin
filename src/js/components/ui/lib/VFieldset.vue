<template>
	<fieldset>
		<div class="legend">{{ legend }}</div>
		<slot />
	</fieldset>
</template>

<script>
export default {
	name: "VFieldset",
	props: {
		legend: String,
	}
};
</script>
