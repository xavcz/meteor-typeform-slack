Credentials.methods = {};
Credentials.methods.connect = {};

Credentials.methods.connect.typeform = new ValidatedMethod({
	name: 'Credentials.methods.connect.typeform',
	validate: Credentials.typeformSchema.validator(),
	run({ uid, key }) {
		if (this.isSimulation) {
			console.log(`simulating typeform connection for the form ${uid} with the api key ${key}`);
		} else {
			return Modules.server.typeform.fetch({ uid, key }, 1);
		}
	}
});

Credentials.methods.connect.slack = new ValidatedMethod({
	name: 'Credentials.methods.connect.slack',
	validate: Credentials.slackSchema.validator(),
	run({ team, token }) {
		if (this.isSimulation) {
			console.log(`simulating slack connection for the team ${team} with the token ${token}`);
		} else {
			return Modules.server.slack.test({ team, token });
		}
	}
});

Credentials.methods.storeCredentials = new ValidatedMethod({
	name: 'Credentials.methods.storeCredentials',
	validate: Credentials.schema.validator(),
	run({ typeform, slack, email }) {
		if (!this.isSimulation) {
			Credentials.insert({ typeform, slack, email });
		}
	}
});