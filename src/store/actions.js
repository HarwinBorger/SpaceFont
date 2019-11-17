import Axios from "axios";

export const actions = {
	getGoogleFontsData ({commit}){
		let googleApiKey = 'AIzaSyD_eTUhJTjUW_GbsKlJHEWMRVdYQtE-_0I';
		let googleApiUrl = 'https://www.googleapis.com/webfonts/v1/webfonts?key=' + googleApiKey;

		Axios.get(googleApiUrl)
			.then(function (response){
				commit('setGoogleFonts', response.data.items);
			})
	}
}