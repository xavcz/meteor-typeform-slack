Meteor.setInterval(() => {
	const credentials = Credentials.find({}).fetch();

	_.each(credentials, (zap) => {
		Modules.TypeformToSlack.run(zap);
	});
}, 300000);