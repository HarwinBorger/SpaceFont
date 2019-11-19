import Axios from "axios";

export const actions = {
	/**
	 * Fetch all fonts from Google Fonts
	 * @param commit
	 */
	fetchGoogleFontsData({commit})
	{
		let googleApiKey = 'AIzaSyD_eTUhJTjUW_GbsKlJHEWMRVdYQtE-_0I';
		let googleApiUrl = 'https://www.googleapis.com/webfonts/v1/webfonts?key=' + googleApiKey;

		Axios.get(googleApiUrl)
			.then(function (response) {
				commit('setGoogleFonts', response.data.items);
			})
	},

	/**
	 * Set auto XHeight
	 * @param commit
	 * @param value
	 */
	setXHeightAuto({commit}, value)
	{
		commit('SET_XHEIGHT_AUTO', value)
	},

	/**
	 * Set XHeight correction
	 * @param commit
	 * @param value
	 */
	setXHeightCorrection({commit}, value)
	{
		commit('SET_XHEIGHT_CORRECTION', value)
	},

	/**
	 * Reset XHeight correction
	 * @param commit
	 */
	resetXHeightCorrection({commit}){
		commit('SET_XHEIGHT_CORRECTION', 0);
	},

	/**
	 * Calculate XHeight Factor
	 * @param commit
	 * @param state
	 * @param fontSize
	 */
	calculateXHeightFactor({commit, state}){
		let decimals = 3;
		let decimalFactor = 10 ** decimals;
		let fontSize = 72;

		state.xHeightTotal = state.xHeight.auto - state.xHeight.correction;

		let xHeightFactor = Math.round((state.xHeightTotal / fontSize) * decimalFactor) / decimalFactor;
		commit('SET_XHEIGHT_FACTOR',xHeightFactor)
	}
}