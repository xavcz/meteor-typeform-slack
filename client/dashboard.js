Template.dashboard.onCreated(function() {
	this.errors = new ReactiveDict();
	this.slack = new ReactiveDict();
});

Template.dashboard.helpers({
	errors(fieldName) {
		return Template.instance().errors.get(fieldName);
	}
});

Template.dashboard.events({
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

				errors.team.push(err.reason);
				instance.errors.set(errors);
			} else {
				instance.slack.set(data);
			}
		});
	}
});