import NewsRepository from '../repository/newsRepository';

class NewsService {
	get() {
		console.log('teste service 1');
		const news = NewsRepository.find({});
		//console.log(news);
		return news;
	}

	getById(_id) {
		return NewsRepository.findById({ _id });
	}

	create(news) {
		return NewsRepository.create(news);
	}

	update(_id, news) {
		return NewsRepository.findByIdAndUpdate(_id, news);
	}

	delete(_id) {
		return NewsRepository.findByIdAndRemove(_id);
	}
}

export default new NewsService();
