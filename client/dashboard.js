Template.dashboard.onCreated(function() {
	this.state = new ReactiveDict();
	this.errors = new ReactiveDict();
	this.typeform = new ReactiveDict();
	this.slack = new ReactiveDict();
});

Template.dashboard.helpers({
	errors(fieldName) {
		return Template.instance().errors.get(fieldName);
	},
	slackCredentials(fieldName) {
		return Template.instance().slack.get(fieldName);
	},
	slackConnected() {
		return Template.instance().state.get('slack');
	}
});

Template.dashboard.events({
	'submit .connectTypeform'(event, instance) {
		event.preventDefault();

		const data = {
			uid: event.target.uid.value,
			key: event.target.key.value
		};

		debugger
		Credentials.methods.connectTypeform.call(data, (err, res) => {
			debugger
			if (err) {
				// handle slack errors
				const errors = {
					uid: [],
					key: []
				};

				instance.errors.set(errors);

				instance.state.set({typeform: false});
				instance.typeform.set({});
			} else {
				instance.state.set({typeform: true});
				instance.typeform.set(res);
			}
		});
	},
	'submit .connectSlack'(event, instance) {
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

				instance.state.set({slack: false});
				instance.slack.set({});
			} else {
				instance.state.set({slack: true});
				instance.slack.set(res);
			}
		});
	}
});