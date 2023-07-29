import * as express from 'express';
import {Request, Response} from "express";
import * as cors from 'cors';

import {createConnection} from "typeorm";
import {Product} from "./entity/product";


createConnection().then(db => {
    const productRepository = db.getRepository(Product)

    const app = express()

    app.use(cors({
        origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200']
    }))

    app.use(express.json())

    app.get('/api/products', async (req: Request, res: Response) => {
        const products = await productRepository.find()
        res.json(products)


    })

    app.post('/api/products', async (req: Request, res: Response) => {
        const product =  productRepository.create(req.body)
        const result = await productRepository.save(product);

        return res.send(result)
    })

    app.get('/api/products/:id', async (req: Request, res: Response) => {
       try {
           const product : Product | undefined = await productRepository.findOne({
               where: {
                   id: req.params.id
               },
           })
           if (product) {
               return res.send(product)
           } else {
               return res.status(404).send('Product not found')
           }

       } catch (e) {
           return res.status(500).send('Internal Server Error')
       }

    })

    app.put('/api/products/:id', async (req: Request, res: Response) => {
        try {
            const product: Product | undefined = await productRepository.findOne({
                where: {
                    id: req.params.id
                },
            })

            if(product){
                productRepository.merge(product, req.body)
                const result = await productRepository.save(product)
                return res.status(200).send(result);
            } else {
                return res.status(400).send('Product not found to update')
            }

        } catch (e) {
            return res.status(500).send('Internal Server Error')
        }
    })

    app.delete('/api/products/:id', async (req: Request, res: Response) => {
        const result = await  productRepository.delete(req.params.id)
        return res.status(200).send(result)
    })

    app.post('/api/products/:id/like', async (req: Request, res: Response) => {
        try {
            const product: Product | undefined = await productRepository.findOne({
                where: {
                    id : req.params.id
                },
            })

            if (product) {
                product.likes++
                const result = await  productRepository.save(product)
                return res.status(200).send('Like!')
            } else {
                return res.status(400).send('Product not found')
            }

        } catch (e) {
            return  res.status(500).send('Internal Server Error')
        }
    })

    console.log('Listening to port: 8000')
    app.listen(8000)

})

