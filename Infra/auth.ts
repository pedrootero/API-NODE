import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import loginController from '../controller/loginController';
import loginRepository from '../repository/loginRepository';
import loginService from '../services/loginService';
import Configs from './configs';

class Auth {
	validate(req, res, next) {
		const { user, passwd } = req.body;

		//validations
		if (!user) {
			return res.status(422).json({ msg: 'o nome é obrigatório' });
		}
		if (!passwd) {
			return res.status(422).json({ msg: 'a senha é obrigatoria' });
		}

		//check user exists
		const login = loginService.getById({ user: user });

		if (!login) {
			return res.status(404).json({ msg: 'Usuario não encontrado' });
		}
		//check passwd match
		const checkpasswd = bcrypt.compare(passwd, loginService.getById(passwd));

		if (!checkpasswd) {
			return res.status(401).json({ msg: 'senha inválida!' });
		}

		try {
			const secret = process.env.SECRET || 'ffkngdçflghdçfohidsgnaoi';

			const tokenuser = jwt.sign(
				{
					id: loginService.getById,
				},
				secret
			);

			console.log({ tokenuser });
			res.status(200).json({ msg: 'autenticação realizada com sucesso', tokenuser });
		} catch (error) {
			console.log(error);
			res.status(500).json({ msg: 'houve um erro no servidor' });
		}

		function checktoken(req, res, next) {
			const authHeader = req.headers['authorization'];
			const token = authHeader && authHeader.split(' ')[1];

			if (!token) {
				return res.status(401).json({ msg: 'Acesso negado' });
			}
			try {
				const secret = process.env.SECRET || 'ffkngdçflghdçfohidsgnaoi';
				jwt.verify(token, secret);

				next();
			} catch (error) {
				res.status(400).json({ msg: 'token invalido' });
			}
		}

		/*
		var token = req.headers['x-access-token'];

		if (token) {
			jwt.verify(token, Configs.secret, function (err, decoded) {
				//jwt.verify(token, tokenlogin, function (err, decoded) {
				if (err) {
					return res.status(403).send({
						success: false,
						message: '403 - Token Inválido',
					});
				} else {
					next();
				}
			});
		} else {
			return res.status(401).send({
				success: false,
				message: '401 - unauthorized',
			});
		}*/
	}
}

export default new Auth();
