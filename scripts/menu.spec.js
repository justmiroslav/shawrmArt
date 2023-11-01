const assert = require("chai").assert;
const { calculateOrderPrice } = require("./menu");

describe("calculateOrderPrice", () => {
    it("should return the correct price for a specific order variation", () => {
        const variation = {
            lavash: "Classic", 
            meat: "Chicken", 
            sauce: ["Garlic"], 
            veggies: ["Carrots", "Cucumbers"], 
            extra: ["Sausages"]
        };
        const selectedPortion = "Generous portion";
        const expectedPrice = 256;
        const actualPrice = calculateOrderPrice(variation, selectedPortion);
        assert.equal(actualPrice, expectedPrice);
    });
    it("should return 0 if ingredient name is invalid", () => {
        const variation = {
            lavash: "Classic",
            meat: "Chicken",
            sauce: ["Bruh sauce"], 
            veggies: ["Carrots"]
        };
        const selectedPortion = "Standard portion";
        const expectedPrice = 0;
        const actualPrice = calculateOrderPrice(variation, selectedPortion);
        assert.equal(actualPrice, expectedPrice);
    });
});