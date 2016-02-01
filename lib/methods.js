Credentials.methods = {};

Credentials.methods.connectTypeform = new ValidatedMethod({
	name: 'Credentials.methods.connectTypeform',
	validate: Credentials.typeformSchema.validator(),
	run({ formUID, apiKey, email, firstname, lastname }) {
		// connect live w/ typeform -> test rest2ddp
	}
});

Credentials.methods.connectSlack = new ValidatedMethod({
	name: 'Credentials.methods.connectSlack',
	validate: Credentials.slackSchema.validator(),
	run({ team, token }) {
		// connect live w/ slack -> test rest2ddp
	}
});

Credentials.methods.storeCredentials = new ValidatedMethod({
	name: 'Credentials.methods.storeCredentials',
	validate: Credentials.schema.validator(),
	run({ typeform, slack }) {
		// store on the server to be used by rest2ddp pubs
	}
});