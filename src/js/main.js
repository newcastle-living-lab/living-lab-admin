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

Network.getAuthUser().then((user) => {

	new Vue({
		i18n,
		router,
		store: store({ authUser: user }),
		render: h => h(App),
	}).$mount("#livinglab");

});



/*
new Vue({
	el: '#livinglab',
	template: '<App/>',
	i18n,
	router,
	components: { App },
});

*/
