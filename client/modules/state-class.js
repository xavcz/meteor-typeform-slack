Modules.client.stateClass = (state) => {
	switch(state) {
		case undefined:
			return { class: 'glyphicon glyphicon-question-sign text-warning' };
		case false:
			return { class: 'glyphicon glyphicon-remove-sign text-danger'};
		case true:
			return { class: 'glyphicon glyphicon-ok-sign text-success'};
	}
};