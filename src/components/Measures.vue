<template>
	<span class="measures">
		<span class="measure measure--font-size"><span class="measure__label">font-size</span></span>

		<span id="calc-x-height" class="measure measure--xheight measure--dragable"  :class="[drag ? 'is-drag':'']" :style="{ transform: 'translateY('+getXHeightCorrection+'px)'}">
			<span class="measure__label">x-height <span v-if="type===XHEIGHT" class="measure__drag" @mousedown="startDrag"></span></span>
		</span>
		<span class="measure measure--baseline"><span class="measure__label">baseline</span></span>
	</span>
</template>
<script>
	import {mapGetters, mapActions} from 'vuex';
	import {XHEIGHT, CAPHEIGHT, mapConstants} from "../constants";

	export default {
		name: 'measures',
		props:{
			type:{
				type: String,
				validator: function (value) {
					// Only accept certain types
					return [XHEIGHT,CAPHEIGHT].includes(value)
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
		computed:{
			...mapGetters(['getXHeightCorrection'])
		},
		methods: {
			...mapActions(['setXHeightCorrection','calculateXHeightFactor']),
			startDrag(event)
			{
				window.addEventListener('mouseup', this.stopDrag);
				window.addEventListener('mousemove', this.dragSlider);

				this.mouse.start.y = event.clientY - this.correction;
				this.drag = true;
			},
			stopDrag(event)
			{
				if (this.drag === true) {
					this.correction = (this.mouse.current - this.mouse.start.y);
					this.calculateXHeightFactor();
					this.drag = false;

					window.removeEventListener('mouseup', this.stopDrag);
					window.removeEventListener('mousemove', this.dragSlider);
				}
			},
			dragSlider(event)
			{
				if (this.drag === true) {
					this.mouse.current = event.clientY;
					let translateY = this.mouse.current - this.mouse.start.y;
					this.setXHeightCorrection(translateY);
					this.calculateXHeightFactor();

					this.styleObject.transform = `translateY(${translateY}px)`
				}
			}
		},
	}
</script>