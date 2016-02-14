const apps = [
	{
		name: 'typeform',
		form: [
			{name: 'uid', label: 'Form UID'},
			{name: 'key', label: 'API Key'}
		],
		state: undefined
	},
	{
		name: 'slack',
		form: [
			{name: 'team', label: 'Team URL'},
			{name: 'token', label: 'Admin Token'}
		],
		state: undefined
	}
];

Modules.client.appParams = (name) => {
	return apps.find((element) => {
		return element.name === name;
	});
};