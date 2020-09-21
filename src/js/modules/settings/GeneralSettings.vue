<template>

	<div>

		<VFieldset legend="General settings">

			<VGroup name="enable_reg" label="Enable new user self-registration">
				<VCheck name="enable_reg" label="Yes" v-model="settings['users.enable_registration']" />
			</VGroup>

			<VGroup name="auto_save" label="Auto-save projects">
				<VCheck name="auto_save" label="Yes" v-model="settings['cosmos.auto_save']" />
			</VGroup>

			<VGroup name="fathom_site_id" label="Fathom tracking Site ID" size="sm">
				<VInput type="text" id="fathom_site_id" v-model="settings['cosmos.fathom_site_id']" />
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
