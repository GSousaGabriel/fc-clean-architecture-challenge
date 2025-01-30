import { vi } from "vitest";
import Product from "../../../domain/product/entity/product";
import ProductUpdateUseCase from "./update.product.useCase";

const product = new Product("123", "Product", 1);
const input = {
    id: product.id,
    name: product + " updated",
    price: product.price + 1,
}

const mockRepository = () => {
    return {
        find: vi.fn().mockReturnValue(Promise.resolve(product)),
        findAll: vi.fn(),
        create: vi.fn(),
        update: vi.fn()
    }
}

describe("Unit test to update a product use case", () => {
    test("Should update a product", async () => {
        const productRepository = mockRepository()
        const productUpdateUseCase = new ProductUpdateUseCase(productRepository)

        const output = await productUpdateUseCase.execute(input)

        expect(output).toEqual(input)
    })
})