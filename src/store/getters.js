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

	/* X-height*/
	getXHeightFactor(state)
	{
		return state.xHeight.factor;
	},

	getXHeightCorrection(state)
	{
		return state.xHeight.correction;
	},

	/* Cap-height */
	getCapHeightFactor(state)
	{
		return state.capHeight.factor
	},

	getCapHeightCorrection(state)
	{
		return state.capHeight.correction;
	}
}