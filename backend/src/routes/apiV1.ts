import express from 'express';
const router = express.Router();
import user from './user';
import todo from './todo';

router.get('/', (req, res) => {
    res.send('apiV1');
})


router.use('/user', user);
router.use('/todo', todo);

export default router;