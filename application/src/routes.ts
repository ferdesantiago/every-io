import express from 'express';
import { verifyToken } from './libs/session';
import { list as userList, login as userLogin } from './routes/users';
import { list, create, update } from './routes/tasks';

const router = express.Router();

router.get('/users/list', userList);
router.post('/users/login', userLogin);
router.get('/list', verifyToken, list);
router.put('/create', verifyToken, create);
router.post('/update', verifyToken, update);

export {
    router
}