<template>
	<span class="measures">
		<span class="measure measure--font-size"><span class="measure__label">font-size</span></span>
		<span id="calc-cap-height" class="measure measure--capheight" :class="classObject(CAPHEIGHT)"
		      :style="{ transform: 'translateY('+getCorrectionOfType(CAPHEIGHT)+'px)'}">
			<span class="measure__label"><span class="measure__text">cap-height</span> <span v-if="type===CAPHEIGHT" class="measure__drag"
			                                              @mousedown="startDrag"></span></span>
		</span>
		<span id="calc-x-height" class="measure measure--xheight" :class="classObject(XHEIGHT)"
		      :style="{ transform: 'translateY('+getCorrectionOfType(XHEIGHT)+'px)'}">
			<span class="measure__label"><span class="measure__text">x-height</span> <span v-if="type===XHEIGHT" class="measure__drag"
			                                            @mousedown="startDrag"></span></span>
		</span>
		<span class="measure measure--baseline"><span class="measure__label">baseline</span></span>
	</span>
</template>
<script>
	import {mapGetters, mapActions} from 'vuex';
	import {XHEIGHT, CAPHEIGHT, mapConstants} from "../constants";

	export default {
		name: 'measures',
		props: {
			type: {
				type: String,
				validator: function (value) {
					// Only accept certain types
					return [XHEIGHT, CAPHEIGHT].includes(value)
				}
			}
		},
		data: function () {
			return {
				...mapConstants,
				drag: false,
				mouse: {
					start: {
						y: null
					},
					current: {
						y: null
					}
				},
				styleObject: {
					transform: 'translateY(0)'
				},
				correction: 0
			}
		},
		computed: {
			...mapGetters(['getCorrectionOfType']),

		},
		methods: {
			...mapActions(['setCorrectionOfType', 'calculateFactorOfType']),
			classObject: function (type) {
				return {
					'is-active': this.type === type,
					'is-drag': this.drag === type
				}
			},
			startDrag(event)
			{
				window.addEventListener('mouseup', this.stopDrag);
				window.addEventListener('mousemove', this.dragSlider);

				this.mouse.start.y = event.clientY - this.correction;
				this.drag = this.type;
			},
			stopDrag(event)
			{
				if (this.drag) {
					this.correction = (this.mouse.current - this.mouse.start.y);
					this.calculateFactorOfType(this.type);
					this.drag = false;

					window.removeEventListener('mouseup', this.stopDrag);
					window.removeEventListener('mousemove', this.dragSlider);
				}
			},
			dragSlider(event)
			{
				if (this.drag) {
					this.mouse.current = event.clientY;
					let translateY = this.mouse.current - this.mouse.start.y;

					this.setCorrectionOfType([this.type, translateY]);
					this.calculateFactorOfType(this.type);
				}
			}
		},
	}
</script>