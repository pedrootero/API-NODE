import * as moongose from 'mongoose';
import LoginSchema from '../models/loginSchema';

export default moongose.model('news', LoginSchema);
