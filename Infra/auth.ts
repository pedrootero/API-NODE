import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import loginRepository from '../repository/loginRepository';
import loginService from '../services/loginService';
import Configs from './configs';
import exp = require('constants');

class Auth {
	async validate(req, res, next) {
		const { user, passwd } = req.body;
		console.log('entrou aqui ', user);
		//validations
		if (!user) {
			return res.status(422).json({ msg: 'o nome é obrigatório' });
		}
		if (!passwd) {
			return res.status(422).json({ msg: 'a senha é obrigatoria' });
		}

		//check user exists
		const login = await loginService.findOne({ user: user });
		console.log('entrou login');
		console.log(login);

		if (!login) {
			return res.status(404).json({ msg: 'Usuario não encontrado' });
		}
		//check passwd match
		const checkpasswd: String = await bcrypt.compare(`${passwd}`, login.passwd);
		console.log('entrou checkpasswd');
		if (!checkpasswd) {
			return res.status(401).json({ msg: 'senha inválida!' });
		}

		try {
			const secret = process.env.SECRET || 'ffkngdçflghdçfohidsgnaoi';

			const tokenuser = await jwt.sign(
				{
					id: login,
				},
				secret
			);

			console.log({ tokenuser });

			res.status(200).json({ msg: 'autenticação realizada com sucesso', tokenuser });
			//next();
		} catch (error) {
			console.log(error);
			res.status(500).json({ msg: 'houve um erro no servidor' });
		}
	}

	async checktoken(req, res, next) {
		const authHeader = req.headers['authorization'];
		const token = (await authHeader) && authHeader.split(' ')[1];
		console.log({ token });

		if (!token) {
			return res.status(401).json({ msg: 'Acesso negado' });
		}
		try {
			const secret = process.env.SECRET || 'ffkngdçflghdçfohidsgnaoi';
			jwt.verify(token, secret);
			console.log({ token });

			next();
		} catch (error) {
			res.status(403).json({ msg: 'token invalido' });
		}
	}
}

export default new Auth();
