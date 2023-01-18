import * as express from 'express';
import Database from './Infra/db';
import * as bodyParser from 'body-parser';
import NewsController from './controller/newsController';
import * as cors from 'cors';
class StartUp {
	public app: express.Application;
	private _db: Database;
	private bodyParser;

	constructor() {
		this.app = express();
		this._db = new Database();
		this._db.createConnection();
		this.middler();
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
		console.log('antes route');

		this.app.route('/').get((req, res) => {
			res.send({ versao: '1.0.1' });
		});
		console.log('antes route');
		this.app.route('/api/v1/news').get(NewsController.get);
		this.app.route('/api/v1/news/:id').get(NewsController.getById);
		this.app.route('/api/v1/news').post(NewsController.create);
		this.app.route('/api/v1/news/:id').put(NewsController.update);
		this.app.route('/api/v1/news/:id').delete(NewsController.delete);
		console.log('depois route');
	}
}

export default new StartUp();
