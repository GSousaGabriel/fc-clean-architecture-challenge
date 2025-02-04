import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./list.product.useCase";
import CreateProductUseCase from "../create/create.product.useCase";
import ListProductUseCase from "./list.product.useCase";

describe("Integration test list product case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    test("Should list products", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("123", "product", 10)
        const product2 = new Product("1234", "product 2", 101)
        const output = {
            id: "123",
            name: "product",
            price: 10
        }

        const output2 = {
            id: "1234",
            name: "product 2",
            price: 101
        }

        await productRepository.create(product)
        await productRepository.create(product2)
        const useCase = new ListProductUseCase(productRepository)
        const result = await useCase.execute({})

        expect(result.products).toEqual([output, output2])
        expect(result.products[0].id).toBeTruthy()
        expect(result.products[0].name).toEqual(output.name)
        expect(result.products[0].price).toEqual(output.price)
        expect(result.products[1].id).toBeTruthy()
        expect(result.products[1].name).toEqual(output2.name)
        expect(result.products[1].price).toEqual(output2.price)
    })
})