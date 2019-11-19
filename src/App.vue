<template>
	<div id="app">
		<div class="draft"><strong>Fonts</strong> — Draft version.</div>
		<label for="googleFonts">Google Fonts</label><br>
		<select name="" id="googleFonts" @change="updateFont($event)">
			<option v-for="(font) in getGoogleFonts" :value="font.family" v-bind:key="font.id">{{ font.family }}
			</option>
		</select>

		<div class="results">
			<div class="examples">
				<div class="hero">{{ font || 'choose font'}}</div>
				<h3>Cap height calculator</h3>
				<div class="x-height-container">
					ABCDEFGHIJKLMOPQURSTUVWXYZ
					<Measures></Measures>

				</div>
				<h3>X height calculator</h3>
				<div class="x-height-container">
					abcdefghijklmnopqurstuvwxyz
					<div class="x-height-container__measure">
						<Measures></Measures>
					</div>
				</div>
				<h1>Heading 1</h1>
				<h2>Heading 2</h2>
				<h3>Heading 3</h3>
				<p>Etiam porta sem malesuada magna mollis euismod. Maecenas faucibus mollis interdum. Sed posuere
					consectetur est at lobortis.</p>

			</div>
			<div class="details">
				<h3>Details</h3>
				<strong>Font Family</strong><br>
				{{ font || 'none' }}<br><br>
				<strong>Cap-height</strong><br>
				...<br><br>
				<strong>X-height</strong> (<a type="button" @click="resetXHeight">reset</a>)<br>
				{{ getXHeightFactor || '...'}}<br>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapGetters, mapActions} from 'vuex';
	import Measures from './components/Measures.vue';
	import WebFont from 'webfontloader';

	export default {
		name: 'app',
		components: {
			'Measures': Measures
		},
		data: function () {
			return {
				font: null,
				xHeight: null,
			}
		},

		computed: {
			...mapGetters(['getGoogleFonts', 'getXHeightFactor'])
		},
		methods: {
			...mapActions(
				['fetchGoogleFontsData', 'resetXHeightCorrection', 'calculateXHeightFactor', 'setXHeightAuto']),

			updateFont(event)
			{
				this.font = event.target.value;
				this.xHeightFactor = this.xHeight = null;

				WebFont.load({
					google: {
						families: [this.font]
					},
					active: () => {
						document.querySelector(':root').style.setProperty('--font', this.font);
						// Set auto xHeight
						this.xHeight = document.getElementById('calc-x-height').offsetHeight;
						this.setXHeightAuto(this.xHeight);
						this.calculateXHeightFactor();

						// Reset any manuel correction made on the xHeight
						this.resetXHeightCorrection();
					}
				});
			},

			resetXHeight(){
				this.resetXHeightCorrection();
				this.calculateXHeightFactor();
			}
		},
		created()
		{
			// Get all Google Fonts
			this.fetchGoogleFontsData();

			//
			window.addEventListener('keydown', (e) => {
				if (e.key == 'Escape') {
					this.showModal = !this.showModal;
				}
			});
		},
	}
</script>

<style lang="scss">

	.draft {
		background: #FF5151;
		color: #fff;
		position: fixed;
		top: 0;
		left: 0;
		padding: 10px;
	}

	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #222;
		margin-top: 10px;
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
		position: relative;
		background: #fafafa;
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

	hr {
		border-top: 1px solid #ddd;
		border-bottom: none;
		margin: 50px 0;
	}

	.x-height-container {
		background: #eee;
		font-size: 72px;
		line-height: 1;
		padding: 50px 150px 50px 50px;
		/*background: #000;*/
		/*color: #fff;*/
		word-break: break-word;
		overflow: hidden;
		margin: 10px 0;
		display: flex;
		align-items: baseline;
		justify-content: space-between;

	}
</style>
