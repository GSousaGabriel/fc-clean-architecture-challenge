import express, { Request, Response } from "express";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ListProductUseCase from "../../../usecase/product/list/find.product.useCase";
import CreateProductUseCase from "../../../usecase/product/create/create.product.useCase";

export const productRoute = express.Router()

productRoute.get("/", async (req: Request, res: Response) => {
    const productRepository = new ProductRepository()
    const useCase = new ListProductUseCase(productRepository)
    try {
        const output = await useCase.execute({})
        res.send(output)
    } catch (e) {
        res.status(500).send(e)
    }
})

productRoute.post("/", async (req: Request, res: Response) => {
    const productRepository = new ProductRepository()
    const useCase = new CreateProductUseCase(productRepository)
    try {
        const productDto = {
            name: req.body.name,
            price: req.body.price
        }

        const output = await useCase.execute(productDto)
        res.send(output)
    } catch (e) {
        res.status(500).send(e)
    }
})