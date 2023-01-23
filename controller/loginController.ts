import LoginService from '../services/loginService';
import * as HttpStatus from 'http-status';
import Helper from '../Infra/helper';
import * as bcrypt from 'bcrypt';

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

	async post(req, res) {
		//let vm = req.body;

		const { user, passwd } = req.body;

		//validations
		if (!user) {
			return res.status(422).json({ msg: 'o nome é obrigatório' });
		}
		if (!passwd) {
			return res.status(422).json({ msg: 'a senha é obrigatoria' });
		}

		//check user exists
		const userExists = LoginService.getById({ user: user });

		/*
		if(userExists){
			return res.status(422).json({msg: "Por favor, use outro usuario"})
		}
		*/
		// create passwd
		const salt: String = await bcrypt.genSalt(12);
		console.log({ salt });

		const passwordHash = await bcrypt.hash(`${passwd}`, salt);

		console.log({ passwordHash });
		try {
			LoginService.post({ user, passwd: passwordHash }).then((login) =>
				Helper.sendResponse(res, HttpStatus.OK, 'Usuario cadastrado com sucesso!')
			);
		} catch (error) {
			console.error(console, `Error ${error}`);
			res.status(500).json({ msg: 'houve um erro no servidor!' });
		}
	}
}
export default new LoginController();
