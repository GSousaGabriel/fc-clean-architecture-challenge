import ProductFactory from "../../../domain/product/factory/product.factory";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";

export default class CreateProductUseCase {
    constructor() { }

    async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
        const product = ProductFactory.create(input.type, input.name, input.price)

        return {
            id: product.id,
            name: product.name,
            price: product.price
        }
    }
}