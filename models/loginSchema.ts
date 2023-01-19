import * as mongoose from 'mongoose';

const loginSchema = new mongoose.Schema({
	user: { type: String },
	passwd: { type: String },
});

export default loginSchema;
