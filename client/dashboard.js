Template.dashboard.onCreated(function() {
	this.errors = new ReactiveDict();
});

Template.dashboard.helpers({
	errors(fieldName) {
		return Template.instance().errors.get(fieldName);
	}
});

Template.dashboard.events({
	'submit .connectSlack'(event) {
		event.preventDefault();
		const instance = Template.instance();

		const data = {
			team: event.target.team.value,
			token: event.target.token.value
		};

		Credentials.methods.connectSlack.call(data, (err, res) => {
			debugger
			if (err) {
				debugger
				if (err.error === 'Credentials.methods.connectSlack.not-logged-in') {
					debugger
					const errors = {
						team: [],
						token: []
					};

					errors.team.push(err.reason);

					instance.errors.set(errors);
				}
			}
		});
	}
});