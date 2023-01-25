import NewsService from '../services/newsService';
import * as HttpStatus from 'http-status';
import Helper from '../Infra/helper';
import * as Redis from 'redis';
import Exportfiles from '../Infra/exportFile';

class NewsController {
	async get(req, res) {
		//console.log('>>>>>>>>>> ' + JSON.stringify(res));
		let client = Redis.createClient();
		client.connect();

		try {
			const news = await client.get('news');

			console.log({ news });

			if (news) {
				Helper.sendResponse(res, HttpStatus.OK, JSON.parse(news));
			} else {
				NewsService.get().then((news) => {
					client.set('news', JSON.stringify(news));
					Helper.sendResponse(res, HttpStatus.OK, news);
					//client.expire('news', 20);
				});
			}
		} catch (error) {
			console.error.bind(console, `Error ${error}`);
		}
	}

	async exportToCsv(req, res) {
		try {
			let response = await NewsService.get();
			let fileName = await Exportfiles.tocsv(response);
			Helper.sendResponse(res, HttpStatus.OK, req.get('host') + '/exports/' + fileName);
		} catch (error) {
			console.error(error);
		}
	}

	getById(req, res) {
		const _id = req.params.id;

		NewsService.getById(_id)
			.then((news) => Helper.sendResponse(res, HttpStatus.OK, news))
			.catch((error) => console.error.bind(console, `Error ${error}`));
	}

	create(req, res) {
		let vm = req.body;
		console.log(vm);
		NewsService.create(vm)
			.then((news) => Helper.sendResponse(res, HttpStatus.OK, 'Noticia cadastrada com sucesso!'))
			.catch((error) => console.error.bind(console, `Error ${error}`));
	}

	update(req, res) {
		const _id = req.params.id;
		let news = req.body;

		NewsService.update(_id, news)
			.then((news) => Helper.sendResponse(res, HttpStatus.OK, 'Noticia foi atualizada com sucesso!'))
			.catch((error) => console.error.bind(console, `Error ${error}`));
	}

	delete(req, res) {
		const _id = req.params.id;

		NewsService.delete(_id)
			.then(() => Helper.sendResponse(res, HttpStatus.OK, `Noticia deletada com sucesso!`))
			.catch((error) => console.error.bind(console, `Error ${error}`));
	}
}

export default new NewsController();
