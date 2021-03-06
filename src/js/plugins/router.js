import Vue from 'vue';
import VueRouter from 'vue-router';

import homeRoutes from '@adminRoot/modules/home/routes';
import usersRoutes from '@adminRoot/modules/users/routes';
import accountRoutes from '@adminRoot/modules/account/routes';
import settingsRoutes from '@adminRoot/modules/settings/routes';

Vue.use(VueRouter);
/*
const routes = [
	{
		name: 'home',
		path: '/',
		component: IndexPage,
	},
	{
		name: 'users',
		path: '/users',
		component: IndexPage,
	},
	{
		path: '/:id/:name?',
		component: ProjectPage,
		props: true,
		children: [
			{ path: '/', name: 'project', component: WelcomeTab, props: { aspectId: 'welcome' } },
			{ path: 'json', name: 'json', component: JsonTab, props: true },
			{ path: ':aspectId/model', name: 'model', component: DashboardTab, props: true },
			{ path: ':aspectId/summary', name: 'summary', component: SummaryTab, props: true },
			{ path: ':aspectId', name: 'container', component: ContainerTab, props: true },
		]
	},
]*/

const router = new VueRouter({
	base: '/admin/',
	mode: 'history',
	routes: [
		...homeRoutes,
		...usersRoutes,
		...accountRoutes,
		...settingsRoutes,
		// ...profileRoutes,
	]
});

export default router;
