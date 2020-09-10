import UsersPage from './UsersPage';
import UsersEditPage from './UsersEditPage';
import UsersInvitePage from './UsersInvitePage';

export default [
	{
		path: '/users/edit/:id',
		name: 'users_edit',
		component: UsersEditPage,
		props: true,
	},
	{
		path: '/users/invite',
		name: 'users_invite',
		component: UsersInvitePage,
		props: true,
	},
	{
		path: '/users',
		name: 'users',
		component: UsersPage,
	}
]
