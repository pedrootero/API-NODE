import LoginService from '../services/loginService';
import * as HttpStatus from 'http-status';
import Helper from '../Infra/helper';

class LoginController {
	get(req, res) {
		//console.log('>>>>>>>>>> ' + JSON.stringify(res));
		LoginService.get()
			.then((login) => {
				console.log(login);
				Helper.sendResponse(res, HttpStatus.OK, login);
			})
			.catch((error) => console.error.bind(console, `Error ${error}`));
	}

	getById(req, res) {
		const _id = req.params.id;

		LoginService.getById(_id)
			.then((login) => Helper.sendResponse(res, HttpStatus.OK, login))
			.catch((error) => console.error.bind(console, `Error ${error}`));
	}

	create(req, res) {
		let vm = req.body;
		console.log(vm);
		LoginService.create(vm)
			.then((login) => Helper.sendResponse(res, HttpStatus.OK, 'Usuario cadastrado com sucesso!'))
			.catch((error) => console.error.bind(console, `Error ${error}`));
	}
}
