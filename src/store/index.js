import Vue from "vue";
import Vuex from 'vuex';
import {actions} from './actions';
import {mutations} from './mutations';
import {getters} from './getters';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		googleFonts: null,
		xHeight: {
			auto: null,
			correction: null,
			factor: null
		},
		capHeight: {
			auto: null,
			correction: null,
			factor: null
		}
	},
	getters: getters,
	mutations: mutations,
	actions: actions
})