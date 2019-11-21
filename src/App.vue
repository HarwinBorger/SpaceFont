<template>
	<div id="app">
		<div class="draft"><strong>Fonts</strong> — Draft version.</div>
		<label for="googleFonts">Google Fonts</label><br>
		<select name="" id="googleFonts" @change="updateFont($event)">
			<option value="" disabled selected>Choose your font</option>
			<option v-for="(font) in getGoogleFonts" :value="font.family" v-bind:key="font.id">{{ font.family }}
			</option>
		</select>

		<div class="results">
			<Interface>
				<template v-slot:header>
					<div class="hero">{{ font || 'choose font'}}</div>
				</template>
				<template v-slot:details>
					<h3>Details</h3>
					<strong>Font Family</strong><br>
					{{ font || 'none' }}<br><br>
				</template>
			</Interface>

			<Interface>
				<template v-slot:header>
					<h3>Cap height calculator</h3>
				</template>

				<template v-slot:default>
					<div class="x-height-container">
						ABCDEFGHIJKLMOPQURSTUVWXYZ
						<Measures :type="CAPHEIGHT"></Measures>

					</div>
				</template>

				<template v-slot:details>
					<div>
						<label for="capheight">Cap-height</label> (<a type="button" @click="resetCapHeight">reset</a>)<br>
						<input v-if="getFactorOfType(CAPHEIGHT)" id="capheight" type="number" step="0.001" :value="getFactorOfType(CAPHEIGHT)"
						       @input="setCapHeightFactor" @change="setCapHeightFactor">
						<template v-else>...</template>
					</div>
				</template>
			</Interface>

			<Interface>
				<template v-slot:header>
					<h3>X height calculator</h3>
				</template>

				<template v-slot:default>
					<div class="x-height-container">
						abcdefghijklmnopqurstuvwxyz
						<div class="x-height-container__measure">
							<Measures :type="XHEIGHT"></Measures>
						</div>
					</div>
				</template>

				<template v-slot:details>
					<div>
						<label for="xheight">X-height</label> (<a type="button" @click="resetXHeight">reset</a>)<br>
						<input v-if="getFactorOfType(XHEIGHT)" id="xheight" type="number" step="0.001" :value="getFactorOfType(XHEIGHT)"
						       @input="setXHeightFactor" @change="setXHeightFactor">
						<template v-else>...</template>
					</div>
				</template>
			</Interface>

			<Interface>
				<h1>Heading 1</h1>
				<h2>Heading 2</h2>
				<h3>Heading 3</h3>
				<p>Etiam porta sem malesuada magna mollis euismod. Maecenas faucibus mollis interdum. Sed posuere
					consectetur est at lobortis.</p>
			</Interface>
			<Interface>
				<div class="align-baseline">
				<p class="font-preset-default">
					Donec ullamcorper nulla non metus auctor fringilla. Etiam porta sem malesuada magna mollis euismod.
				</p>
				</div>
			</Interface>
		</div>
	</div>
</template>

<script>
	import {mapGetters, mapActions} from 'vuex';
	import Measures from './components/Measures.vue';
	import Interface from './components/Interface.vue';
	import WebFont from 'webfontloader';
	import {mapConstants, XHEIGHT, CAPHEIGHT} from "./constants";

	export default {
		name: 'app',
		components: {
			'Measures': Measures,
			'Interface': Interface
		},
		data: function () {
			return {
				...mapConstants,
				font: null,
				xHeight: null
			}
		},

		computed: {
			...mapGetters(['getGoogleFonts', 'getFactorOfType'])
		},
		methods: {
			...mapActions(
				[
					'fetchGoogleFontsData',
					'resetCorrectionOfType',
					'calculateFactorOfType',
					'setXHeightAuto',
					'setXHeightFactor',
					'setCapHeightAuto',
					'setCapHeightFactor'
				]),

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
						this.calculateFactorOfType(XHEIGHT);

						// Reset any manuel correction made on the xHeight
						this.resetCorrectionOfType(XHEIGHT);
					}
				});
			},

			resetXHeight()
			{
				this.resetCorrectionOfType(XHEIGHT);
				this.calculateFactorOfType(XHEIGHT);
			},

			resetCapHeight()
			{
				this.resetCorrectionOfType(CAPHEIGHT);
				this.calculateFactorOfType(CAPHEIGHT);
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
		/*display: flex;*/
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
