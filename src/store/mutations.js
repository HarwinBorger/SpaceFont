export const mutations = {
	setGoogleFonts (state, data){
		state.googleFonts = data;
	},

	SET_XHEIGHT_AUTO(state, value){
		state.xHeight.auto = value
	},

	SET_XHEIGHT_CORRECTION(state, value){
		state.xHeight.correction = value
	},

	SET_XHEIGHT_FACTOR(state, value){
		state.xHeight.factor = value
	}
}