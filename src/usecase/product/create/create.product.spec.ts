import { vi } from "vitest"
import CreateProductUseCase from "./create.product.useCase"

const input = {
    type: "a",
    name: "Product",
    price: 1
}

const mockRepository = () => {
    return {
        find: vi.fn(),
        findAll: vi.fn(),
        create: vi.fn(),
        update: vi.fn()
    }
}

describe("Unit test create product use case", () => {
    test("Should create a product", async () => {
        const productRepository = mockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository)
        const output = await productCreateUseCase.execute(input)

        expect(output).toEqual({
            ...output,
            id: expect.any(String)
        })
    })

    test("Should throw an error when name is missing", async () => {
        const productRepository = mockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository)

        await expect(productCreateUseCase.execute({ ...input, name: "" })).rejects.toThrow("Name is required")
    })
})