export const mutations = {
	setGoogleFonts (state, data){
		state.googleFonts = data;
	},

	/* x height mutations */
	SET_XHEIGHT_AUTO(state, value){
		state.xHeight.auto = value
	},

	SET_XHEIGHT_CORRECTION(state, value){
		state.xHeight.correction = value
	},

	SET_XHEIGHT_FACTOR(state, value){
		state.xHeight.factor = value
	},

	/* cap height mutations */
	SET_CAPHEIGHT_AUTO(state, value){
		state.capHeight.auto = value
	},

	SET_CAPHEIGHT_CORRECTION(state, value){
		state.capHeight.correction = value
	},

	SET_CAPHEIGHT_FACTOR(state, value){
		state.capHeight.factor = value
	},
}