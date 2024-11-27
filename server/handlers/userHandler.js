const handleAllUsers = (app, User) => {
	// returns JSON to be used in resp.json() parameter
	return new Promise((resolve, reject) => {
		User.find()
			.then(data => {
				resolve(JSON.stringify(data));
			})
			.catch(err => {
				reject(new Error('Unable to connect to retrieve Users'));
			})
	})
}

const handleSingleUser = (app, User, id) => {
	return new Promise((resolve, reject) => {
		User.findOne({ "_id": id })
			.then(data => {
				resolve(JSON.stringify(data));
			})
			.catch(err => {
				reject(new Error('Unable to connect to retrieve User'));
			})
	})
}

module.exports = {
	handleAllUsers, 
	handleSingleUser
}