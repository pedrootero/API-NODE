import * as mongoose from 'mongoose';

class Database {
	private DB_URL = 'mongodb://link-db:27017/db_portal';

	createConnection() {
		mongoose.set('strictQuery', true);
		mongoose.connect(this.DB_URL);
		console.log('teste conex db');
	}
}

export default Database;
