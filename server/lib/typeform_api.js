TypeformAPI = {
	// base api call
	call: function(uid, params, callback) {
		callback  = typeof callback  !== "undefined" ? callback  : false;
		if(!callback){
			var future = new Future();
			HTTP.get("https://api.typeform.com/v0/form/" + uid, {
				params: params
			}, function(err, message) {
				if(err) {
					future.throw(err);
				} else {
					future.return(message.data)
				}
			});
			return future.wait();
		} else {
			HTTP.get("https://api.typeform.com/v0/form/" + uid, {
				params: params
			}, function(err, message) {
				if(err) {
					return callback(err);
				} else {
					return callback(null, message.data);
				}
			});
		}
	}
};