import Axios from "axios";
import {CAPHEIGHT, XHEIGHT} from "../constants";
import {calculateFactor} from "./helpers";

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
	 *
	 * @param commit
	 * @param type
	 * @param value
	 */
	setCorrectionOfType({commit}, [type, value])
	{
		switch (type) {
			case XHEIGHT:
				commit('SET_XHEIGHT_CORRECTION', value);
				break;
			case CAPHEIGHT:
				commit('SET_CAPHEIGHT_CORRECTION', value);
				break;
		}
	},

	/**
	 * Reset Correction of type
	 * @param commit
	 * @param type
	 */
	resetCorrectionOfType({commit}, type)
	{
		switch (type){
			case XHEIGHT:
				commit('SET_XHEIGHT_CORRECTION', 0);
				break;
			case CAPHEIGHT:
				commit('SET_CAPHEIGHT_CORRECTION', 0);
				break;
		}
	},

	/**
	 * Calculate XHeight Factor
	 * @param commit
	 * @param state
	 * @param type
	 */
	calculateFactorOfType({commit, state}, type)
	{
		let factor;
		switch (type) {
			case XHEIGHT:
				factor = calculateFactor(state.xHeight.auto, state.xHeight.correction);
				commit('SET_XHEIGHT_FACTOR', factor);
				break;
			case CAPHEIGHT:
				factor = calculateFactor(state.capHeight.auto, state.capHeight.correction);
				commit('SET_CAPHEIGHT_FACTOR', factor);
				break;
		}

	},

	setXHeightFactor({commit, state}, event)
	{
		let fontSize = 72;

		let value = event.target.value;
		let correction = state.xHeight.auto - (fontSize * value);
		commit('SET_XHEIGHT_CORRECTION', correction);
		commit('SET_XHEIGHT_FACTOR', value)
	},


	setCapHeightFactor({commit, state}, event)
	{
		let fontSize = 72;

		let value = event.target.value;
		let correction = state.capHeight.auto - (fontSize * value);
		commit('SET_CAPHEIGHT_CORRECTION', correction);
		commit('SET_CAPHEIGHT_FACTOR', value)
	}
}