import { Circle } from "./circle";
import { render} from "@testing-library/react";
import { ElementStates } from "../../../types/element-states";

describe("Тестирование компонента Circle", () => {
    it("Элемента без буквы", () => {
        const circleNotLetter = render(<Circle />);
        expect(circleNotLetter).toMatchSnapshot();
    });

    it("Элемента с буквами", () => {
        const circleWithLetters = render(<Circle letter = "letter" />);
        expect(circleWithLetters).toMatchSnapshot();
    });

    it("Элемента с head", () => {
        const circleHead = render(<Circle head = "head" />);
        expect(circleHead).toMatchSnapshot();
    });

    it("Элемента с react-элементом в head", () => {
        const circleElementHead = render(<Circle head = { <Circle /> } />);
        expect(circleElementHead).toMatchSnapshot();
    });

    it("Элемента с tail", () => {
        const circleTail = render(<Circle tail = "tail" />);
        expect(circleTail).toMatchSnapshot();
    });

    it("Элемента с react-элементом в tail", () => {
        const circleElementTail = render(<Circle tail = { <Circle /> } />);
        expect(circleElementTail).toMatchSnapshot();
    });

    it("Элемента с index", () => {
        const circleIndex = render(<Circle index = { 0 } />);
        expect(circleIndex).toMatchSnapshot();
    });

    it("Элемента с пропом isSmall", () => {
        const circleIsSmall = render(<Circle isSmall = { true } />);
        expect(circleIsSmall).toMatchSnapshot();
    });

    it("Элемента в состоянии default", () => {
        const circleDefault = render(<Circle state = { ElementStates.Default } />);
        expect(circleDefault).toMatchSnapshot();
    });

    it("Элемента в состоянии changing", () => {
        const circleChanging = render(<Circle state = { ElementStates.Changing } />);
        expect(circleChanging).toMatchSnapshot();
    });

    it("Элемента в состоянии modified", () => {
        const circleModified = render(<Circle state = { ElementStates.Modified } />);
        expect(circleModified).toMatchSnapshot();
    });
});