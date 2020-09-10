import AccountPage from './AccountPage';
import LoginPage from './LoginPage';
import VerifyEmailPage from './VerifyEmailPage';

export default [
	{
		path: '/account/login',
		name: 'login',
		component: LoginPage,
	},
	{
		path: '/account/verify_email/:id',
		name: 'verify_email',
		component: VerifyEmailPage,
		props: true,
	},
	{
		path: '/account',
		name: 'account',
		component: AccountPage,
	},
]
