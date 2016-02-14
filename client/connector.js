Template.connector.onCreated(function () {
	this.errors = new ReactiveDict();
});

Template.connector.helpers({
	errors (fieldName) {
		return Template.instance().errors.get(fieldName);
	},
	className (state) {
		return Modules.client.stateClass(state);
	},
});

Template.connector.events({
	'submit form' (event, instance) {
		event.preventDefault();

		let {app} = instance.data;

		$([`rel=${app.name}-connector`]).attr('disabled', true);

		const data = {};
		_.each(app.form, (input) => {
			data[input.name] = event.target[input.name].value;
		});

		debugger

		Credentials.methods.connect[app.name].call(data, (err, res) => {
			debugger

			if (err) {
				const errors = {};
				_.each(app.form, (input) => {
					errors[input.name] = [];
				});

				instance.errors.set(errors);

				console.log('connection failed');
			} else {
				console.log('connection established');
			}
			$([`rel=${app.name}-connector`]).attr('disabled', false);
		});
	},
});