import { claasCircles, claasCirclesContent, host } from "../utils/constants";

describe("Очередь", () => {
    beforeEach(() => {
        cy.visit(`${host}/queue`)
    })

    it("Кнопка добавления недоступна, если в инпуте пусто", () => {
        cy.get("input").clear()
        cy.get("button").contains("Добавить").parent().should("be.disabled")
    })

    it("Правильность добавления элемента в очередь", () => {
        cy.get("input").type("6").should("have.value", "6")
        cy.get("button").contains("Добавить").click()

        cy.clock()
        cy.get(`${claasCircles}`)
            .eq(0)
            .should("have.css", "border-color", "rgb(0, 50, 255)")
            .contains("6")
        cy.get(`${claasCirclesContent}`)
            .eq(0).contains("head")
        cy.get(`${claasCirclesContent}`)
            .eq(0).contains("tail")

        cy.tick(500);
        cy.get(`${claasCircles}`)
            .should("have.css", "border-color", "rgb(0, 50, 255)")
            .contains("6")

        cy.get("input").type("66").should("have.value", "66");
        cy.get("button").contains("Добавить").click()

        cy.get(`${claasCircles}`)
            .eq(0)
            .should("have.css", "border-color", "rgb(0, 50, 255)")
            .contains("6")
        cy.get(`${claasCirclesContent}`)
            .eq(0).contains("head")

        cy.get(`${claasCircles}`)
            .eq(1)
            .should("have.css", "border-color", "rgb(210, 82, 225)")
            .contains("66")
        cy.get(`${claasCirclesContent}`)
            .eq(1).contains("tail")

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

    it("Правильность удаления элемента из очереди", () => {
        cy.clock();
        cy.get("input").type("6").should("have.value", "6")
        cy.get("button").contains("Добавить").click()

        cy.tick(500)
        cy.get("input").type("66").should("have.value", "66")
        cy.get("button").contains("Добавить").click()

        cy.tick(500)
        cy.get("button").contains("Удалить").click()
        cy.get(`${claasCircles}`)
            .eq(0)
            .should("have.css", "border-color", "rgb(210, 82, 225)")
            .contains("6")
        cy.get(`${claasCircles}`)
            .eq(1)
            .should("have.css", "border-color", "rgb(0, 50, 255)")
            .contains("66")

        cy.tick(500)
        cy.get(`${claasCircles}`)
            .eq(0)
            .should("have.css", "border-color", "rgb(0, 50, 255)")
        cy.get(`${claasCircles}`)
            .eq(1)
            .should("have.css", "border-color", "rgb(0, 50, 255)")
            .contains("66")
        cy.get("button").contains("Удалить").click()
        cy.get(`${claasCircles}`)
            .eq(1)
            .should("have.css", "border-color", "rgb(0, 50, 255)")

        cy.tick(500)
        cy.get(`${claasCircles}`)
            .eq(1)
            .should("have.css", "border-color", "rgb(0, 50, 255)")
    })

    it("Поведение кнопки 'Очистить'", () => {
        cy.get("input").clear()

        cy.clock()
        cy.get("input").type("6").should("have.value", "6")
        cy.get("button").contains("Добавить").click()

        cy.tick(500)
        cy.get("input").type("66").should("have.value", "66")
        cy.get("button").contains("Добавить").click()

        cy.tick(500)
        cy.get("button").contains("Очистить").click()

        cy.tick(500);
        cy.get(`${claasCircles}`)
            .should('have.text', '');
    })
})