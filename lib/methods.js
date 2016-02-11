Credentials.methods = {};

Credentials.methods.connectTypeform = new ValidatedMethod({
	name: 'Credentials.methods.connectTypeform',
	validate: Credentials.typeformSchema.validator(),
	run({ uid, key }) {
		if (!this.isSimulation) {
			let fetchTest = TypeformAPI.call(uid, {
				key,
				limit: 1
			});

			return {
				credentials: { uid, key },
				result: fetchTest
			};
		}
	}
});

Credentials.methods.connectSlack = new ValidatedMethod({
	name: 'Credentials.methods.connectSlack',
	validate: Credentials.slackSchema.validator(),
	run({ team, token }) {
		if (!this.isSimulation) {
			let authTest = SlackAPI.auth.test(token);

			if (!authTest.ok) {
				console.log('nok: ', authTest.error); // look at error
				throw new Meteor.Error(
					'Credentials.methods.connectSlack.slack-not-reached',
					"Sorry, we couldn't reach Slack. Please try again with another token?"
				);
			} else {
				// different team as the response, send error
				if (authTest.url.split('/')[2] !== team.split('/')[2]) {
					console.log('nok: teams dont match');
					throw new Meteor.Error(
						'Credentials.methods.connectSlack.team-dont-match-token',
						"The team url doesn't match the token response, please verify your team url."
					);
				} else {
					// get user info
					let userTest = SlackAPI.users.info(token, authTest.user_id);
					// the user is not admin, he cannot invite fellows
					if (!userTest.user.is_admin) {
						console.log('nok: the user isnt an admin');
						throw new Meteor.Error(
							'Credentials.methods.connectSlack.user-isnt-admin',
							"The token issued isn't issued from an admin user. Please generate another token."
						);
					} else {
						return {
							credentials: { team, token },
							result: authTest
						};
					}
				}
			}
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