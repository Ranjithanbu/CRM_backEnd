import Express from 'express';
import { createNews, deleteNews, getAllNews } from '../Controller/newsControl.js';

const newsRoute=Express.Router()

newsRoute.post('/createNews',createNews)
newsRoute.delete('/deleteNews/:id',deleteNews)
newsRoute.get('/getNews',getAllNews)


export default newsRoute