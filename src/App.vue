<template>
	<div id="app">
		<label for="googleFonts">Google Fonts</label><br>
		<select name="" id="googleFonts" @change="updateFont($event)">
			<option v-for="(font) in getGoogleFonts" :value="font.family" v-bind:key="font.id">{{ font.family }}
			</option>
		</select>

		<div class="results">
			<div class="examples">
				<div class="hero">{{ font}}</div>
				<h1>Heading 1</h1>
				<h2>Heading 2</h2>
				<h3>Heading 3</h3>
				<p>Etiam porta sem malesuada magna mollis euismod. Maecenas faucibus mollis interdum. Sed posuere
					consectetur est at lobortis.</p>
			</div>
			<div class="details">
				<h3>Details</h3>
				Font Family: {{ font }}
			</div>
		</div>
	</div>
</template>

<script>
	import {mapGetters, mapActions} from 'vuex';
	import WebFont from 'webfontloader';

	export default {
		name: 'app',
		components: {},
		data: function () {
			return {
				font: null
			}
		},
		computed: {
			...mapGetters(['getGoogleFonts'])
		},
		methods: {
			...mapActions(['fetchGoogleFontsData']),

			updateFont(event)
			{
				this.font = event.target.value;

				WebFont.load({
					google: {
						families: [this.font]
					}
				});

				document.querySelector(':root').style.setProperty('--font', this.font);
			}
		},
		created()
		{
			this.fetchGoogleFontsData();
		}
	}
</script>

<style lang="scss">
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}

	.results {
		display: flex;
		border-top: 1px solid #ccc;
		margin-top: 50px;
	}

	.examples {
		font-family: var(--font);
		flex: 1 1 auto;
		padding: 50px;
	}

	.details {
		text-align: left;
		padding: 20px;
		width: 300px;
		border-left: 1px solid #eee;
	}

	.hero {
		font-size: 72px;
	}
</style>
