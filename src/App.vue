<template>
	<div id="app">
		<label for="googleFonts">Google Fonts</label>
		<select name="" id="googleFonts">
				<option v-for="(font) in getGoogleFonts" value="" v-bind:key="font.id">{{ font.family }}</option>
		</select>
	</div>
</template>

<script>
	import {mapGetters, mapActions} from 'vuex';

	export default {
		name: 'app',
		components: {
		},
		computed: {
			...mapGetters(['getGoogleFonts'])
		},
		methods: {
			...mapActions(['getGoogleFontsData'])
		},
		created()
		{
			this.getGoogleFontsData();
		}
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>
