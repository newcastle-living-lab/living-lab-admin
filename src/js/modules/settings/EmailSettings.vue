<template>

	<div>

		<VFieldset legend="SMTP Server">

			<VGroup name="host" label="Server / hostname" size="sm">
				<VInput type="text" id="host" v-model="settings['smtp.host']" />
			</VGroup>

			<VGroup name="port" label="Port" size="xs">
				<VInput type="number" id="port" v-model="settings['smtp.port']" />
			</VGroup>

			<VGroup name="secure" label="Secure" size="xs">
				<VCheck name="secure" label="Yes" v-model="settings['smtp.secure']" />
			</VGroup>

			<VGroup name="auth_user" label="Username" size="sm">
				<VInput type="text" id="auth_user" v-model="settings['smtp.auth_user']" />
			</VGroup>

			<VGroup name="auth_pass" label="Password" size="sm">
				<VInput type="password" id="auth_pass" v-model="settings['smtp.auth_pass']" />
			</VGroup>

		</VFieldset>

		<VFieldset legend="Email sender">

			<VGroup name="from_email" label="Email address" size="sm">
				<VInput type="text" id="from_email" v-model="settings['smtp.from_email']" />
			</VGroup>

			<VGroup name="from_name" label="Email address" size="sm">
				<VInput type="text" id="from_name" v-model="settings['smtp.from_name']" />
			</VGroup>

		</VFieldset>

	</div>

</template>

<script>

export default {

	props: {
		'settings': Object,
	},

}

</script>
