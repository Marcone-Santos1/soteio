import mongoose from "mongoose";
import { config } from 'dotenv';
config();
import app from './index.js';


const port = process.env.PORT;
const mongo = process.env.MONGO;

app.listen(port, () => {
    console.log(`server running in http://localhost:${port}`)
    mongoose.connect(mongo).then(() => console.log('Banco connectado com sucesso')).catch(e => console.log(e));
})