import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import CreateProductUseCase from "../create/create.product.useCase";
import ProductUpdateUseCase from "./update.product.useCase";

describe("Integration test update product case", () => {
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

    test("Should update a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("123", "product", 10)
        const input = {
            id: product.id,
            name: "product changed",
            price: 1
        }

        await productRepository.create(product)
        const useCase = new CreateProductUseCase(productRepository)
        const result = await useCase.execute(input)
        const productUpdateUseCase = new ProductUpdateUseCase(productRepository)
        const resultUpdate = await productUpdateUseCase.execute(input)
            

        expect(resultUpdate).toEqual(input)


    })
})