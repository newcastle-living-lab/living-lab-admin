import Vue from 'vue';
Vue.config.productionTip = false;

import UI from "./components/ui";
Vue.use(UI);

import i18n from './plugins/i18n';
import router from './plugins/router';
import store from './store';
import App from './App';

import AppHeader from '@/components/layout/AppHeader';
import PageTitle from '@/components/layout/PageTitle';
import NoticeView from '@/components/layout/NoticeView';
import LoadingBar from "@/components/layout/LoadingBar";
import ToastMessage from "@/components/layout/ToastMessage";
Vue.component('AppHeader', AppHeader);
Vue.component('PageTitle', PageTitle);
Vue.component('NoticeView', NoticeView);
Vue.component('LoadingBar', LoadingBar);
Vue.component('ToastMessage', ToastMessage);

import Network from './services/Network';


const formatVal = function(value) {

	var falseValues = ['false', 0, undefined, '0', 'no', 'off', 'null', null];
	var trueValues = ['true', 1, '1', 'yes', 'on'];

	if (falseValues.indexOf(value) !== -1) {
		return false;
	}

	if (trueValues.indexOf(value) !== -1) {
		return true;
	}

	if (isNaN(+value)) {
		return value;
	}

	return +value;
}


const getParams = function(elt) {
	const el = document.getElementById(elt);
	var data = {};
	for (var key in el.dataset) {
		data[key] = formatVal(el.dataset[key]);
	}
	return data;
}


Network.getAuthUser().then((user) => {

	new Vue({
		i18n,
		router,
		store: store({
			authUser: user,
			config: getParams('livinglab'),
		}),
		render: h => h(App),
	}).$mount('#livinglab');

});
