export const getters = {
	getGoogleFonts(state){
		return state.googleFonts;
	},

	getXHeightFactor(state){
		return state.xHeight.factor;
	},

	getXHeightCorrection(state){
		return state.xHeight.correction;
	}
}