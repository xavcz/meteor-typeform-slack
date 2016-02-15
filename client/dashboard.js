Template.dashboard.onCreated(function() {
	Session.set('typeform', undefined);
	Session.set('slack', undefined);
});

Template.dashboard.helpers({
	readyToStore () {
		return Session.get('typeform') && Session.get('slack');
	},
	app (name) {
		return Modules.client.appParams(name);
	}
});

Template.dashboard.events({
	'submit .storeCredentials' (event, instance) {
		event.preventDefault();

		// XXX Get credentials from local store -> mongo collection null

		const typeform = {},
					slack = {},
					email = event.target.email.value;

		const credentials = { typeform, slack, email };

		Credentials.methods.storeCredentials.call(credentials, (err, credentialsId) => {
			if (err) {
				// handle errors
			} else {
				console.log(`${credentialsId} stored in Mongo, ready to ping!`);
			}
		});
	}
});