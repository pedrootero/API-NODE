import loginRepository from '../repository/loginRepository';
import LoginSchema from '../repository/loginRepository';

class AuthService {
	get() {
		console.log('teste service login');
		const login = LoginSchema.find({});
		//console.log(news);
		return login;
	}

	getById(_id) {
		return LoginSchema.findById(_id);
	}

	findOne(_id) {
		return LoginSchema.findOne(_id);
	}
	post(login) {
		return LoginSchema.create(login);
	}

	update(_id, login) {
		return LoginSchema.findByIdAndUpdate(_id, login);
	}

	delete(_id) {
		return LoginSchema.findByIdAndRemove(_id);
	}
}

export default new AuthService();
