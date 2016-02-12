Modules = {};
Modules.TypeformToSlack = {};

const _getLastResponsesOnTypeform = ({uid, key}) => {
	const typeform = TypeformAPI.call(uid, {
		key,
		limit: 20,
		completed: true,
		'order_by[]': 'date_land,desc'
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

const _inviteNewUserOnSlack = ({token, team}, email) => {
	console.log('inviting '+ email +' with token: '+ token);
	SlackAPI.users.admin.invite(token, team.split('/')[2], email);
};

const TypeformToSlack = ({typeform, slack}) => {
	const lastEmails = _getLastResponsesOnTypeform(typeform);

	_.each(lastEmails, (email) => {
		_inviteNewUserOnSlack(slack, email);
	})
};

Modules.TypeformToSlack.run = TypeformToSlack;
Modules.test = _inviteNewUserOnSlack;