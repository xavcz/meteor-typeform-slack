Template.connector.onCreated(function () {
	this.error = new ReactiveVar();
});

Template.connector.helpers({
	error () {
		return Template.instance().error.get();
	},
	stateClass () {
		let {app} = Template.currentData();
		return Modules.client.stateClass(Session.get(app.name));
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

		Credentials.methods.connect[app.name].call(data, (err, res) => {
			if (err) {
				instance.error.set(err.reason);
				Session.set(app.name, false);
				console.log('connection failed: '+ err.error);
			} else {
				instance.error.set('Connection established!');
				Session.set(app.name, true);
				console.log('connection established');
			}
			$([`rel=${app.name}-connector`]).attr('disabled', false);
		});
	},
});