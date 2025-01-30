import CreateProductUseCase from "./create.product.useCase"

const input = {
    type: "a",
    name: "Product",
    price: 1
}

describe("Unit test create product use case", () => {
    test("Should create a product", async () => {
        const productCreateUseCase = new CreateProductUseCase()
        const output = await productCreateUseCase.execute(input)

        expect(output).toEqual({
            ...output,
            id: expect.any(String)
        })
    })

    test("Should throw an error when name is missing", async () => {
        const productCreateUseCase = new CreateProductUseCase()

        await expect(productCreateUseCase.execute({ ...input, name: "" })).rejects.toThrow("Name is required")
    })

    test("Should throw an error when type is unsupported", async () => {
        const productCreateUseCase = new CreateProductUseCase()

        await expect(productCreateUseCase.execute({ ...input, type: "c" })).rejects.toThrow("Product type not supported")
    })
})