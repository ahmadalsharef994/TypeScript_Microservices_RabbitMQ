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

mongoose.connect("mongodb+srv://lama:lama@cluster0.vrgb8.mongodb.net/?retryWrites=true&w=majority").then( () => {
    console.log('Connected to MongoDB');
  });

amqp.connect('amqps://qqtsyxvi:Ko7iRxRbY7C-L7hrmUX9ITrMmXPsdZlv@puffin.rmq2.cloudamqp.com/qqtsyxvi', async (error0, connection) => {
    if (error0) {
        throw error0
    }
    await connection.createChannel((error1, channel) => {
        if (error1) {
            throw error1
        }
        channel1=channel
        channel1.assertQueue('product_created', {durable: false})
        channel1.consume('product_created', async (msg) => {
            console.log('product created')
            console.log(msg.content.toString())
        }, {noAck: true})
    })
})



  app.get('/api/products', async (req: Request, res: Response) => {
    const products = await productRepository.find()

    res.json(products)
})


app.get('/api/products/:id', async (req: Request, res: Response) => {
    const product = await productRepository.findOne(req.params.id)
    return res.send(product)
})

app.put('/api/products/:id', async (req: Request, res: Response) => {
    const product = await productRepository.findOne(req.params.id)
    productRepository.merge(product, req.body)
    const result = await productRepository.save(product)
    // channel.sendToQueue('product_updated', Buffer.from(JSON.stringify(result)))
    return res.send(result)
});


console.log('Listening to port: 8002')
app.listen(8002)


