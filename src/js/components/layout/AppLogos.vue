<template>

	<footer class="footer footer-logos">

		<div class="container grid-lg">
			<div class="columns">
				<div class="column col-12">

					<div class="text-center">
						<component
							v-for="(logo, idx) in logos"
							:key="idx"
							:is="logo.url ? 'a' : 'span'"
							:href="logo.url ? logo.url : false"
							:rel="logo.url ? 'noopener' : false"
							:target="logo.url ? '_blank' : false"
							:title="logo.title"
							class="logo-item"
						>
							<img class="img-responsive" :src="`/images/logos/${logo.filename}`" alt="`${logo.title} logo`" />
						</component>
					</div>

				</div>
			</div>
		</div>

	</footer>

</template>

<script>

import { get } from 'vuex-pathify';

export default {

	name: "AppLogos",

	computed: {

		logos: get('logos.secondary'),

	},

}

</script>
