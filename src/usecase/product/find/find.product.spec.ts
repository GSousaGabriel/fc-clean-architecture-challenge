import { vi } from "vitest";
import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.useCase";

const product = new Product("123", "Product", 1)

const mockRepository = () => {
    return {
        find: vi.fn().mockReturnValue(Promise.resolve(product)),
        findAll: vi.fn(),
        create: vi.fn(),
        update: vi.fn()
    }
}

describe("Unit test find product case", () => {
    test("Should find a product", async () => {
        const productRepository = mockRepository();
        const input = { id: "123" }
        const output = {
            id: "123",
            name: "Product",
            price: 1
        }

        await productRepository.create(product)
        const useCase = new FindProductUseCase(productRepository)
        const result = await useCase.execute(input)

        expect(result).toEqual(output)
    })

    test("Should not find a product", async () => {
        const productRepository = mockRepository();
        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found");
        })
        const input = { id: "123" }
        const useCase = new FindProductUseCase(productRepository)

        expect(() => {
            return useCase.execute(input)
        }).rejects.toThrow("Product not found")
    })
})