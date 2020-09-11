<template>

	<div>

		<VFieldset legend="General settings">

			<VGroup name="enable_reg" label="Enable new user self-registration">
				<VCheck name="enable_reg" label="Yes" v-model="settings['users.enable_registration']" />
			</VGroup>

		</VFieldset>

	</div>

</template>

<script>

export default {

	props: {
		'settings': Object,
	}

}
</script>
