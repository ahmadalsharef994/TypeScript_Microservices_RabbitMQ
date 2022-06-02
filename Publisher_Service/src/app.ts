import * as express from 'express'
import {Request, Response} from 'express'
import * as cors from 'cors'
const mongoose = require('mongoose');
import productRepository from './models/product'
import * as amqp from 'amqplib/callback_api';


const app = express()

app.use(cors({
    origin: ['http://localhost']
}))

app.use(express.json())

var channel1;

mongoose.connect("mongodb+srv://lama:lama@cluster0.vrgb8.mongodb.net/?retryWrites=true&w=majority").then(() => {
    console.log('Connected to MongoDB');
  });
   amqp.connect('amqps://qqtsyxvi:Ko7iRxRbY7C-L7hrmUX9ITrMmXPsdZlv@puffin.rmq2.cloudamqp.com/qqtsyxvi', (error0, connection) => {
    if (error0) {
        throw error0
    }
    connection.createChannel((error1, channel) => {
        if (error1) {
            throw error1
        }
        channel1=channel
        channel1.assertQueue('product_created', {durable: false})
    })
    

})


app.post('/api/products', async (req: Request, res: Response) => {
    const product = await productRepository.create(req.body);

    channel1.sendToQueue('product_created', Buffer.from(JSON.stringify(product)))
    return res.send(product)
})




app.delete('/api/products/:id', async (req: Request, res: Response) => {
    const result = await productRepository.delete(req.params.id)
    // channel.sendToQueue('product_deleted', Buffer.from(req.params.id))
    return res.send(result)
})

app.post('/api/products/:id/like', async (req: Request, res: Response) => {
    const product = await productRepository.findOne(req.params.id)
    product.likes++
    const result = await productRepository.save(product)
    return res.send(result)
})

console.log('Listening to port: 8001')
app.listen(8001)


