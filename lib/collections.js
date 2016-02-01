Credentials = new Meteor.Collection('credentials');


Credentials.typeformSchema = new SimpleSchema({
	formUID: { type: String },
	apiKey: { type: String },
	email: { type: String },
	firstname: { type: String },
	lastname: { type: String }
});

Credentials.slackSchema = new SimpleSchema({
	team: { type: String },
	token: { type: String }
});

Credentials.schema = new SimpleSchema({
	typeform: { type: Credentials.typeformSchema },
	slack: { type: Credentials.slackSchema }
});

Credentials.attachSchema(Credentials.schema);