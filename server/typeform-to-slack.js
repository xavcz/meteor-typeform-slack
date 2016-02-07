Modules = {};

const _getLastResponsesOnTypeform = ({uid, key}) => {
	const typeform = TypeformAPI.call(uid, {
		key,
		limit: 20
	});

	let emails = [];

	// get the email field
	const completeEmailField = typeform.questions.filter((question) => {
		return question.id.match(/(email)/);
	});

	// XXX check that the typeform has an email field
	const emailField = completeEmailField[0].id;

	// group responses
	_.each(typeform.responses, (response) => {
		emails.push(response.answers[emailField]);
	});

	return emails;
};

const _inviteNewUsersOnSlack = (email, {team, token}) => {

};

const Typeform2Slack = ({typeform, slack}) => {
	const lastEmails = _getLastResponsesOnTypeform(typeform);

	_.each(lastEmails, (email) => {
		_inviteNewUsersOnSlack(email, slack);
	})
};