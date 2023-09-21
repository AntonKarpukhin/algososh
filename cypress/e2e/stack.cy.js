import { claasCircles, host } from "../utils/constants";

describe("Стэк работает корректно", () => {
    beforeEach('Приложение работает',() => {
        cy.visit(`${host}/stack`)
    })

    it("Eсли в инпуте пусто, то кнопка добавления недоступна", () => {
        cy.get("input").clear()
        cy.get("button").contains("Добавить").parent().should("be.disabled")
    })

    it("Добавления элементов в стек", () => {
        cy.get("input").type("6").should("have.value", "6")
        cy.get("button").contains("Добавить").click()

        cy.clock()
        cy.get(`${claasCircles}`)
            .should("have.css", "border-color", "rgb(210, 82, 225)")
            .contains("6")

        cy.tick(500)
        cy.get(`${claasCircles}`)
            .should("have.css", "border-color", "rgb(0, 50, 255)")
            .contains("6")
        cy.get("input").type("66").should("have.value", "66");
        cy.get("button").contains("Добавить").click()

        cy.get(`${claasCircles}`)
            .eq(0)
            .should("have.css", "border-color", "rgb(0, 50, 255)")
            .contains("6")
        cy.get(`${claasCircles}`)
            .eq(1)
            .should("have.css", "border-color", "rgb(210, 82, 225)")
            .contains("66")

        cy.tick(500)
        cy.get(`${claasCircles}`)
            .eq(0)
            .should("have.css", "border-color", "rgb(0, 50, 255)")
            .contains("6")
        cy.get(`${claasCircles}`)
            .eq(1)
            .should("have.css", "border-color", "rgb(0, 50, 255)")
            .contains("66")
    })

    it("Удаления элемента из стека", () => {
        cy.clock()
        cy.get("input").type("6").should("have.value", "6")
        cy.get("button").contains("Добавить").click()

        cy.tick(500)
        cy.get("input").type("66").should("have.value", "66")
        cy.get("button").contains("Добавить").click()

        cy.tick(500)
        cy.get(`${claasCircles}`)
            .should("have.length", 2)

        cy.tick(500)
        cy.get("button").contains("Удалить").click();

        cy.get(`${claasCircles}`)
            .eq(0)
            .should("have.css", "border-color", "rgb(0, 50, 255)")
            .contains("6")
        cy.get(`${claasCircles}`)
            .eq(1)
            .should("have.css", "border-color", "rgb(210, 82, 225)")
            .contains("66")

        cy.tick(500)
        cy.get(`${claasCircles}`)
            .should("have.length", 1)

        cy.tick(500)
        cy.get("button").contains("Удалить").click()
        cy.get(`${claasCircles}`)
            .eq(0)
            .should("have.css", "border-color", "rgb(210, 82, 225)")
            .contains("6")

        cy.tick(500);
        cy.get(`${claasCircles}`)
            .should("have.length", 0)
    })

    it("Кнопка 'Очистить'", () => {
        cy.get("input").clear()

        cy.clock();
        cy.get("input").type("6").should("have.value", "6")
        cy.get("button").contains("Добавить").click();

        cy.tick(500);
        cy.get("input").type("66").should("have.value", "66")
        cy.get("button").contains("Добавить").click()

        cy.tick(500);
        cy.get("input").type("666").should("have.value", "666")
        cy.get("button").contains("Добавить").click()

        cy.tick(500);
        cy.get("button").contains("Очистить").click()
        cy.get(`${claasCircles}`).should("have.length", 0)
    })
})