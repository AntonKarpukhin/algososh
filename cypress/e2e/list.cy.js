import { claasCircles, claasCirclesContent, host } from "../utils/constants";

describe("Список", () => {
    beforeEach(() => {
        cy.visit(`${host}/list`)
    })

    it("Кнопка добавления недоступна, если в инпуте пусто", () => {
        cy.get("input").clear()
        cy.get("button").contains("Добавить в head").parent().should("be.disabled")
        cy.get("button").contains("Добавить в tail").parent().should("be.disabled")
        cy.get("button").contains("Добавить по индексу").parent().should("be.disabled")
        cy.get('button').contains("Удалить по индексу").parent().should("be.disabled")
    })

    it("Корректность отрисовки дефолтного списка", () => {
        cy.get(`${claasCircles}`)
            .should("not.be.empty")
            .should("have.length", 4)
        cy.get(`${claasCirclesContent}`)
            .eq(0).contains("head")
        cy.get(`${claasCirclesContent}`)
            .eq(3).contains("tail")
        cy.get(`${claasCircles}`)
            .eq(0).should("have.css", "border-color", "rgb(0, 50, 255)").contains("0");
        cy.get(`${claasCircles}`)
            .eq(1).should("have.css", "border-color", "rgb(0, 50, 255)").contains("34");
        cy.get(`${claasCircles}`)
            .eq(2).should("have.css", "border-color", "rgb(0, 50, 255)").contains("8");
        cy.get(`${claasCircles}`)
            .eq(3).should("have.css", "border-color", "rgb(0, 50, 255)").contains("1");
    })

    it("Корректность добавления элемента в head", () => {
        cy.get("input").clear()
        cy.get("button").should("be.disabled")

        cy.get(`${claasCircles}`)
            .should("have.length", 4)
        cy.get('input[placeholder="Введите значение"]').type("6").should("have.value", "6")

        cy.clock()
        cy.get("button").contains("Добавить в head").click()
        cy.get(`${claasCircles}`)
            .should("have.length", 5)
        cy.get(`${claasCircles}`)
            .first()
            .should("have.css", "border-color", "rgb(210, 82, 225)")
            .contains("6")

        cy.tick(500)
        cy.get(`${claasCircles}`)
            .first()
            .contains("6")
        cy.get(`${claasCirclesContent}`)
            .eq(0).contains("head")

        cy.tick(1000)
        cy.get(`${claasCircles}`)
            .first()
            .should("have.css", "border-color", "rgb(0, 50, 255)")
            .contains("6")
        cy.get(`${claasCirclesContent}`)
            .eq(0).contains("head")
    })

    it("Корректность добавления элемента в tail", () => {
        cy.get("input").clear()
        cy.get("button").should("be.disabled")

        cy.get(`${claasCircles}`)
            .should("have.length", 4)

        cy.clock()
        cy.get('input[placeholder="Введите значение"]').type("66").should("have.value", "66")
        cy.get("button").contains("Добавить в tail").click()
        cy.get(`${claasCircles}`)
            .should("have.length", 5)
        cy.get(`${claasCircles}`)
            .eq(3)
            .should("have.css", "border-color", "rgb(210, 82, 225)")
            .contains("66")

        cy.tick(500)
        cy.get(`${claasCircles}`)
            .eq(4)
            .should("have.css", "border-color", "rgb(127, 224, 81)")
            .contains("66")
        cy.get(`${claasCirclesContent}`)
            .last()
            .contains("tail")
    })

    it("Корректность добавления элемента по индексу", () => {
        cy.get("input").clear()

        cy.get(`${claasCircles}`)
            .should("have.length", 4)

        cy.clock()
        cy.get('input[placeholder="Введите значение"]').type("666").should("have.value", "666")
        cy.get('input[placeholder="Введите индекс"]').type("1").should("have.value", "1")
        cy.get("button").contains("Добавить по индексу").click()

        cy.tick(1000)
        cy.get(`${claasCircles}`)
            .should("have.length", 5)

        cy.get(`${claasCircles}`)
            .first()
            .should("have.css", "border-color", "rgb(210, 82, 225)")
            .contains("666")

        cy.tick(500)
        cy.get(`${claasCirclesContent}`)
            .eq(0).contains("head")
        cy.get(`${claasCircles}`)
            .first()
            .should("have.css", "border-color", "rgb(210, 82, 225)")

        cy.get(`${claasCircles}`)
            .eq(1)
            .should("have.css", "border-color", "rgb(210, 82, 225)")
            .contains("666")

        cy.tick(500)
        cy.get(`${claasCircles}`)
            .eq(1)
            .should("have.css", "border-color", "rgb(127, 224, 81)")
            .contains("666")

        cy.tick(500)
        cy.get(`${claasCircles}`)
            .eq(1)
            .should("have.css", "border-color", "rgb(0, 50, 255)")
            .contains("666")
    })

    it("Корректность удаления элемента из head", () => {
        cy.clock()
        cy.get("button").contains("Удалить из head").click()
        cy.get(`${claasCircles}`)
            .eq(0)
            .should("have.css", "border-color", "rgb(0, 50, 255)")
        cy.get(`${claasCircles}`)
            .eq(1)
            .should("have.css", "border-color", "rgb(210, 82, 225)")

        cy.tick(500)
        cy.get(`${claasCircles}`)
            .eq(0)
            .should("have.css", "border-color", "rgb(0, 50, 255)")
    })

    it("Корректность удаления элемента из tail", () => {
        cy.clock()
        cy.get("button").contains("Удалить из tail").click()
        cy.get(`${claasCircles}`)
            .last()
            .should("have.css", "border-color", "rgb(210, 82, 225)")

        cy.tick(500)
        cy.get(`${claasCircles}`)
            .should("have.css", "border-color", "rgb(0, 50, 255)")
    })

    it("Корректность удаления элемента по индексу", () => {
        cy.clock()
        cy.get('input[placeholder="Введите индекс"]').type("0").should("have.value", "0")
        cy.get("button").contains("Удалить по индексу").click()

        cy.get(`${claasCircles}`)
            .eq(0)
            .should("have.css", "border-color", "rgb(0, 50, 255)")

        cy.tick(500)
        cy.get(`${claasCircles}`)
            .eq(0)
            .should("have.css", "border-color", "rgb(210, 82, 225)")
        cy.get(`${claasCircles}`)
            .eq(1)
            .should("have.css", "border-color", "rgb(210, 82, 225)")

        cy.tick(1000)
        cy.get(`${claasCircles}`)
            .should("have.css", "border-color", "rgb(0, 50, 255)")
        cy.get(`${claasCircles}`)
            .should("have.length", 3)
    })
})