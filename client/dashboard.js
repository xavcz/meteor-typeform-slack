Template.dashboard.onCreated(function() {
	this.state = new ReactiveDict();
	this.errors = new ReactiveDict();
	this.typeform = new ReactiveDict();
	this.slack = new ReactiveDict();

	this.state.set({
		typeform: false,
		slack: false
	});
});

Template.dashboard.helpers({
	errors (fieldName) {
		return Template.instance().errors.get(fieldName);
	},
	appConnected (app) {
		return Template.instance().state.get(app);
	},
	and (a, b) {
		return a && b;
	}
});

Template.dashboard.events({
	'submit .connectTypeform' (event, instance) {
		event.preventDefault();

		const data = {
			uid: event.target.uid.value,
			key: event.target.key.value
		};

		Credentials.methods.connectTypeform.call(data, (err, res) => {
			if (err) {
				// handle slack errors
				const errors = {
					uid: [],
					key: []
				};

				instance.errors.set(errors);

				instance.state.set({ typeform: false });
				instance.typeform.set({});
			} else {
				instance.state.set({ typeform: true });
				instance.typeform.set(res.credentials);
				debugger
			}
		});
	},
	'submit .connectSlack' (event, instance) {
		event.preventDefault();

		const data = {
			team: event.target.team.value,
			token: event.target.token.value
		};

		Credentials.methods.connectSlack.call(data, (err, res) => {
			if (err) {
				// handle slack errors
				const errors = {
					team: [],
					token: []
				};

				if (err.error === 'Credentials.methods.connectSlack.slack-not-reached') {
					errors.token.push(err.reason);
				}

				if (err.error === 'Credentials.methods.connectSlack.team-dont-match-token') {
					errors.team.push(err.reason);
				}

				if (err.error === 'Credentials.methods.connectSlack.user-isnt-admin') {
					errors.token.push(err.reason);
				}

				instance.errors.set(errors);

				instance.state.set({ slack: false });
				instance.slack.set({});
			} else {
				instance.state.set({ slack: true });
				instance.slack.set(res.credentials);
				debugger
			}
		});
	},
	'submit .storeCredentials' (event, instance) {
		event.preventDefault();

		const typeform = { uid: instance.typeform.get('uid'), key: instance.typeform.get('key') },
					slack = { team: instance.slack.get('team'), token: instance.slack.get('token') },
					email = event.target.email.value;

		const credentials = { typeform, slack, email };

		debugger

		Credentials.methods.storeCredentials.call(credentials, (err, credentialsId) => {
			debugger
			if (err) {
				// handle errors
			} else {
				console.log(`${credentialsId} stored in Mongo, ready to ping!`);
			}
		});
	}
});