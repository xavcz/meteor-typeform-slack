Template.dashboard.onCreated(function() {
	this.state = new ReactiveDict();
	this.errors = new ReactiveDict();

});

Template.dashboard.helpers({
	and (a, b) {
		return a && b;
	},
	app (name) {
		return Modules.client.appParams(name);
	}
});

Template.dashboard.events({
	/*
	'submit .storeCredentials' (event, instance) {
		event.preventDefault();

		const typeform = { uid: instance.typeform.get('uid'), key: instance.typeform.get('key') },
					slack = { team: instance.slack.get('team'), token: instance.slack.get('token') },
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
	*/
});