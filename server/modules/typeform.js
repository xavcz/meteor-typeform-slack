const fetchTypeform = ({ uid, key }, limit) => {
	let fetchTest = TypeformAPI.call(uid, {
		key,
		limit
	});

	return {
		credentials: { uid, key },
		result: fetchTest
	};
};

Modules.server.typeform.fetch = fetchTypeform;