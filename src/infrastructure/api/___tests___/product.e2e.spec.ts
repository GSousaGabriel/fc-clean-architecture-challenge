import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true })
    })

    afterAll(async () => {
        await sequelize.close()
    })

    test("Should create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                type: "a",
                name: "Product",
                price: 1
            })

        expect(response.status).toBe(200)
        expect(response.body.name).toBe("Product")
        expect(response.body.price).toBe(1)
    })

    test("Should not create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "Product"
            })

        expect(response.status).toBe(500)
    })

    test("Should list all products", async () => {
        await request(app)
            .post("/product")
            .send({
                type: "a",
                name: "Product 2",
                price: 10
            })

        const responseGet = await request(app).get("/product").send()

        expect(responseGet.status).toBe(200)
        expect(responseGet.body.products[0].name).toBe("Product")
        expect(responseGet.body.products[0].price).toBe(1)
        expect(responseGet.body.products[1].name).toBe("Product 2")
        expect(responseGet.body.products[1].price).toBe(10)
    })
})