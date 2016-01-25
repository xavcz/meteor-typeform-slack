Credentials.methods.insertTypeformLocally = new ValidatedMethod({
		name: 'Credentials.methods.insertTypeform',
		validate: Credentials.typeformSchema.validator(),
		run({ formUID, apiKey, email, firstname, lastname }) {
			// insert in a local collection
		}
	}
);

Credentials.methods.insertSlackLocally = new ValidatedMethod({
		name: 'Credentials.methods.insertSlack',
		validate: Credentials.slackSchema.validator(),
		run({ team, token }) {
			// insert in a local collection
		}
	}
);

Credentials.methods.storeCredentials = new ValidatedMethod({
	name: 'Credentials.methods.storeCredentials',
	validate: Credentials.schema.validator(),
	run({ typeform, slack }) {
		// insert on the server to be reused later
	}
});