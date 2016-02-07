Credentials = new Meteor.Collection('credentials');

Credentials.typeformSchema = new SimpleSchema({
	uid: { type: String },
	key: { type: String }
});

Credentials.slackSchema = new SimpleSchema({
	team: { type: String },
	token: { type: String }
});

Credentials.schema = new SimpleSchema({
	typeform: { type: Credentials.typeformSchema },
	slack: { type: Credentials.slackSchema },
	email: { type: String }
});

Credentials.attachSchema(Credentials.schema);