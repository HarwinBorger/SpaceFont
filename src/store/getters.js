import {XHEIGHT, CAPHEIGHT} from "../constants";

export const getters = {
	getGoogleFonts(state)
	{
		return state.googleFonts;
	},

	getFactorOfType: (state) => (type) =>
	{
		switch (type) {
			case XHEIGHT:
				return state.xHeight.factor;
			case CAPHEIGHT:
				return state.capHeight.factor;
		}
	},

	getCorrectionOfType: (state) => (type) =>
	{
		switch (type) {
			case XHEIGHT:
				return state.xHeight.correction;
			case CAPHEIGHT:
				return state.capHeight.correction;
		}
	},
}