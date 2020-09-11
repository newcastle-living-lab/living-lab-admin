import SettingsPage from './SettingsPage';
import GeneralSettings from './GeneralSettings';
import EmailSettings from './EmailSettings';

export default [
	{
		path: '/settings',
		name: 'settings',
		component: SettingsPage,
		props: true,
		children: [
			// { path: '', name: 'settings', component: GeneralSettings },
			{ path: 'general', name: 'general_settings', component: GeneralSettings },
			{ path: 'email', name: 'email_settings', component: EmailSettings },
		]
	}
]
