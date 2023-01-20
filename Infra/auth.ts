import * as jwt from 'jsonwebtoken';
import loginController from '../controller/loginController';
import loginRepository from '../repository/loginRepository';
import loginService from '../services/loginService';
import Configs from './configs';

class Auth {
	validate(req, res, next) {
		/**************************************************************	
	let payload = {
  		iat: new Date().getSeconds(),
    	exp: new Date().setMinutes(60),
    	user: loginController.getById(req.body)
    	passwd: loginController.getById(req.body)
	};

	var tokenlogin = jwt.sign(payload, Configs.secret );

	console.log(tokenlogin);
	/************************************************************

		const user = await loginService.findById({ user });

		if (!user) {
			throw new BadRequestError('usuario inválido');
		}

		const verifyPass = await bcrypt.compare(pass, loginController);
*/
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
		}
	}
}

export default new Auth();
