import * as moongose from 'mongoose';
import NewsSchema from '../models/newsSchema';

export default moongose.model('news', NewsSchema);
