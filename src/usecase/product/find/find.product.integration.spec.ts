import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.useCase";

describe("Integration test find product case", () => {
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

    test("Should find a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("123", "product", 10)
        const input = { id: "123" }
        const output = {
            id: "123",
            name: "product",
            price: 10
        }

        await productRepository.create(product)
        const useCase = new FindProductUseCase(productRepository)
        const result = await useCase.execute(input)

        expect(result).toEqual(output)
    })
})