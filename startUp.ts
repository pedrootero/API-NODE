import * as express from 'express';
import Database from './Infra/db';
import * as bodyParser from 'body-parser';
import NewsController from './controller/newsController';
import * as cors from 'cors';
import Auth from './Infra/auth';
import uploads from './Infra/uploads';
import LoginController from './controller/loginController';
class StartUp {
	public app: express.Application;
	private _db: Database;
	private bodyParser;

	constructor() {
		this.app = express();
		this._db = new Database();
		this._db.createConnection();
		this.middler(); //chamando o middler antes das rotas para que ele possa funcionar de fato como middler
		this.routes();
		console.log('teste 2');
	}

	enableCors() {
		const options: cors.CorsOptions = {
			methods: 'GET,OPTIONS,PUT,POST,DELETE',
			origin: '*',
		};
	}

	middler() {
		this.enableCors();
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: false }));
	}

	routes() {
		this.app.route('/').get((req, res) => {
			res.send({ versao: '1.0.1' });
		});

		//rota para upload de arquivo
		this.app.route('/uploads').post(uploads.single('file'), (req, res) => {
			try {
				res.send('arquivo enviado com sucesso');
			} catch (error) {
				console.log(error);
			}
		});

		this.app.route('/auth/login').get(LoginController.get);
		this.app.route('/auth/register').post(LoginController.post);
		this.app.route('/auth/buscalogin').get(LoginController.getById);

		this.app.use(Auth.validate);

		this.app.route('/api/v1/news').get(NewsController.get);
		this.app.route('/api/v1/news/:id').get(NewsController.getById);
		this.app.route('/api/v1/news').post(NewsController.create);
		this.app.route('/api/v1/news/:id').put(NewsController.update);
		this.app.route('/api/v1/news/:id').delete(NewsController.delete);
	}
}

export default new StartUp();
