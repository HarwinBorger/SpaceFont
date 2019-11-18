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
				<hr>
				<div class="x-height-container">ABCDEFGHIJKLMOPQURSTUVWXYZ
					<span class="x-height"><span class="label">x-height</span></span>
					<span class="x-height x-height--font-size"><span class="label">font-size</span></span>
				</div>
				<hr>
				<div class="x-height-container">abcdefghijklmnopqurstuvwxyz
					<span id="calc-x-height" class="x-height"><span class="label">x-height</span></span>
					<span class="x-height x-height--font-size"><span class="label">font-size</span></span>
				</div>
				<hr>
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
				<strong>X-height</strong><br>
				{{ xHeightFactor || '...'}}<br>
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
				font: null,
				xHeight: null,
				xHeightFactor: null
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
				this.xHeightFactor = this.xHeight = null;

				WebFont.load({
					google: {
						families: [this.font]
					},
					active: () => {
						let decimals = 3;
						let decimalFactor = 10 ** decimals;

						document.querySelector(':root').style.setProperty('--font', this.font);
						this.xHeight = document.getElementById('calc-x-height').offsetHeight;
						this.xHeightFactor = Math.round((this.xHeight / 72) * decimalFactor) / decimalFactor;
					}
				});

			}
		},
		created()
		{
			this.fetchGoogleFontsData();
		}
	}
</script>

<style lang="scss">

	.draft{
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
		position: relative;
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
		font-size: 72px;
		line-height: 1;
		/*background: #000;*/
		/*color: #fff;*/
		word-break: break-word;

		.x-height {
			/*background: #FF5151;*/
			background: #fff;
			height: 1ex;
			width: 2ex;
			display: inline-block;
			position: relative;
			color: #FF5151;

			&::before,
			&::after {
				content: '';
				width: 100vw;
				border-top: 1px dashed #FF5151;
				position: absolute;
				right: 100%;
			}

			&::before {
				top: 0;
			}

			&::after {
				bottom: 0;
			}

			&--font-size {
				height: 1em;
				/*background: #000;*/
				margin-left: 1ex;
				/*color: #000;*/

				&::before,
				&::after {
					/*border-color: #000;*/
				}
			}
		}

		.label {
			word-break: normal;
			font-family: Avenir, sans-serif;
			position: absolute;
			font-size: 16px;
			transform: translateY(-50%);
			display: block;
			margin-left: 10px;
			width: 150px;
			text-align: left;
		}
	}
</style>
