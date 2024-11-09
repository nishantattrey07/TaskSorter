import express from 'express';
const app = express();
app.use(express.json());
import apiV1 from './routes/apiV1'

app.get('/', (req, res) => { 
    res.send('Todo Is on');
})

app.listen(3000, () => {
    console.log('Server is running on port 3000, Click here http://localhost:3000/');
})

app.use('/api/v1/', apiV1);

