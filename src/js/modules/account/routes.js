import AccountPage from './AccountPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import VerifyEmailPage from './VerifyEmailPage';

export default [
	{
		path: '/account/login',
		name: 'login',
		component: LoginPage,
	},
	{
		path: '/account/register',
		name: 'register',
		component: RegisterPage,
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
