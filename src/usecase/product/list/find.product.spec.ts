import { vi } from "vitest";
import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./find.product.useCase";

const product = new Product("123", "product1", 1)
const product2 = new Product("1234", "product2", 2)

const mockRepository = () => {
    return {
        find: vi.fn(),
        findAll: vi.fn().mockReturnValue(Promise.resolve([product, product2])),
        create: vi.fn(),
        update: vi.fn()
    }
}

describe("Unit test find products use case", () => {
    test("Should find products", async () => {
        const productRepository = mockRepository();

        await productRepository.create(product)
        const useCase = new ListProductUseCase(productRepository)
        const result = await useCase.execute({})

        expect(result.products.length).toBe(2)
        expect(result.products[0].id).toBe(product.id)
        expect(result.products[0].name).toBe(product.name)
        expect(result.products[0].price).toBe(product.price)
        expect(result.products[1].id).toBe(product2.id)
        expect(result.products[1].name).toBe(product2.name)
        expect(result.products[1].price).toBe(product2.price)
    })
})