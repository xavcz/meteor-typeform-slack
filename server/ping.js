Meteor.setInterval(() => {
	const credentials = Credentials.find({}).fetch();

	_.each(credentials, (zap) => {
		Modules.server.inviter.run(zap);
	});
}, 600000);