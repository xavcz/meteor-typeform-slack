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
	credentials (fieldName) {
		return this.state ? Template.instance()[this.app].get(fieldName) : [];
	},
	appConnected (app) {
		let state = Template.instance().state.get(app);
		if (state) {
			return {
				app,
				state
			};
		}
	},
	readyToStore () {
		return Template.instance().state.get("typeform") && Template.instance().state.get("slack");
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

				instance.state.set({typeform: false});
				instance.typeform.set({});
			} else {
				instance.state.set({typeform: true});
				instance.typeform.set(res);
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

				instance.state.set({slack: false});
				instance.slack.set({});
			} else {
				instance.state.set({slack: true});
				instance.slack.set(res);
			}
		});
	}
});