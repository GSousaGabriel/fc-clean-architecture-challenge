import Product from "./product";

describe("Product unit tests", () => {
  test("should throw error when id is empty", () => {
    expect(() => {
      new Product("", "Product 1", 100);
    }).toThrow("Id is required");
  });

  test("should throw error when name is empty", () => {
    expect(() => {
      new Product("123", "", 100);
    }).toThrow("product: Name is required");
  });

  test("should throw error when price is less than zero", () => {
    expect(() => {
      new Product("123", "Name", -1);
    }).toThrow("Price must be greater than zero");
  });

  test("should throw error when there is nothing filled", () => {
    expect(() => {
      new Product("", "", -1);
    }).toThrow("product: Id is required;product: Name is required;product: Price must be greater than zero");
  });

  test("should change name", () => {
    const product = new Product("123", "Product 1", 100);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  test("should change price", () => {
    const product = new Product("123", "Product 1", 100);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });
});
