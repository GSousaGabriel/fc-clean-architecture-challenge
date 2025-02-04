import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import CreateProductUseCase from "./create.product.useCase";

describe("Integration test create product case", () => {
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

    test("Should create a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("123", "product", 10)
        const input = {
            id: "123",
            name: "product",
            price: 10
        }
        const output = {
            id: expect.any(String),
            name: "product",
            price: 10
        }

        await productRepository.create(product)
        const useCase = new CreateProductUseCase(productRepository)
        const result = await useCase.execute(input)

        expect(result).toEqual(output)
    })
})