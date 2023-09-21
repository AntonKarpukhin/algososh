import { claasCircles, COLOR_CHANGING, COLOR_DEFAULT, COLOR_MODIFIED, host } from "../utils/constants";

describe("Строка", () => {
    beforeEach(() => {
        cy.visit(`${host}/recursion`);
    });

    it("Если в инпуте пусто, то кнопка добавления недоступна", () => {
        cy.get("input").clear()
        cy.get("button").should("be.disabled")
    });

    it("Строка разворачивается корректно", () => {
        cy.get("input").type("hello").should("have.value", "hello")
        cy.get("button").contains("Развернуть").click()

        cy.clock();
        cy.get(`${claasCircles}`)
            .eq(0)
            .should("have.css", "border-color", `${COLOR_MODIFIED}`)
            .contains("h")

        cy.get(`${claasCircles}`)
            .eq(1)
            .should("have.css", "border-color", `${COLOR_DEFAULT}`)
            .contains("e")

        cy.get(`${claasCircles}`)
            .eq(2)
            .should("have.css", "border-color", `${COLOR_DEFAULT}`)
            .contains("l")

        cy.get(`${claasCircles}`)
            .eq(3)
            .should("have.css", "border-color", `${COLOR_DEFAULT}`)
            .contains("l")

        cy.get(`${claasCircles}`)
            .eq(4)
            .should("have.css", "border-color", `${COLOR_MODIFIED}`)
            .contains("o")

        cy.tick(1000);
        cy.get(`${claasCircles}`)
            .eq(0)
            .should("have.css", "border-color", `${COLOR_CHANGING}`)
            .contains("o")

        cy.get(`${claasCircles}`)
            .eq(1)
            .should("have.css", "border-color", `${COLOR_MODIFIED}`)
            .contains("e")

        cy.get(`${claasCircles}`)
            .eq(2)
            .should("have.css", "border-color", `${COLOR_DEFAULT}`)
            .contains("l")

        cy.get(`${claasCircles}`)
            .eq(3)
            .should("have.css", "border-color", `${COLOR_MODIFIED}`)
            .contains("l")

        cy.get(`${claasCircles}`)
            .eq(4)
            .should("have.css", "border-color", `${COLOR_CHANGING}`)
            .contains("h")

        cy.tick(1000);
        cy.get(`${claasCircles}`)
            .eq(0)
            .should("have.css", "border-color", `${COLOR_CHANGING}`)
            .contains("o")

        cy.get(`${claasCircles}`)
            .eq(1)
            .should("have.css", "border-color", `${COLOR_CHANGING}`)
            .contains("l")

        cy.get(`${claasCircles}`)
            .eq(2)
            .should("have.css", "border-color", `${COLOR_MODIFIED}`)
            .contains("l")

        cy.get(`${claasCircles}`)
            .eq(3)
            .should("have.css", "border-color", `${COLOR_CHANGING}`)
            .contains("e")

        cy.get(`${claasCircles}`)
            .eq(4)
            .should("have.css", "border-color", `${COLOR_CHANGING}`)
            .contains("h")

        cy.tick(1000);
        cy.get(`${claasCircles}`)
            .eq(0)
            .should("have.css", "border-color", `${COLOR_CHANGING}`)
            .contains("o")

        cy.get(`${claasCircles}`)
            .eq(1)
            .should("have.css", "border-color", `${COLOR_CHANGING}`)
            .contains("l")

        cy.get(`${claasCircles}`)
            .eq(2)
            .should("have.css", "border-color", `${COLOR_CHANGING}`)
            .contains("l")

        cy.get(`${claasCircles}`)
            .eq(3)
            .should("have.css", "border-color", `${COLOR_CHANGING}`)
            .contains("e")

        cy.get(`${claasCircles}`)
            .eq(4)
            .should("have.css", "border-color", `${COLOR_CHANGING}`)
            .contains("h")
    });
});