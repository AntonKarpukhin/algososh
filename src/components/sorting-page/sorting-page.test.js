import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { SortingPage } from './sorting-page';
import { BrowserRouter } from "react-router-dom";

describe('SortingPage', () => {
    test('Отрисовка массива', () => {
        render(<BrowserRouter> <SortingPage /> </BrowserRouter>);

        // Проверяем, что компонент отрисовывается без ошибок
        expect(screen.getByTestId('sorting-page')).toBeInTheDocument();
    });

    it('Пустой массив', async () => {
        render(<BrowserRouter> <SortingPage /> </BrowserRouter>);

        const container = screen.getByTestId('container');
        // Проверяем, что массив пустой
        expect(container).toBeEmptyDOMElement()

    });

    test('Один эллемент', () => {
        const { getByTestId, getAllByTestId } = render(<BrowserRouter> <SortingPage /> </BrowserRouter>);

        const newArrayButton = getByTestId('set-array-button');
        fireEvent.click(newArrayButton);

        const arrayElement = getAllByTestId('array-element')[0];
        expect(arrayElement).toBeInTheDocument();
    });

    it('С несколькими эллементами', () => {
        render(<BrowserRouter> <SortingPage /> </BrowserRouter>);

        // Устанавливаем новый случайный массив
        screen.getByTestId('set-array-button').click();

        // Проверяем, что массив содержит несколько элементов
        const arrayElement = screen.getAllByTestId('array-element');
        expect(arrayElement).not.toHaveLength(0);
    });

    it('По возрастанию', () => {
        render(<BrowserRouter> <SortingPage /> </BrowserRouter>);

        // Устанавливаем новый случайный массив
        screen.getByTestId('set-array-button').click();

        // Сортируем массив по возрастанию
        screen.getByTestId('sort-asc-button').click();

        // Проверяем, что массив отсортирован по возрастанию
        const arrayElement = screen.getAllByTestId('array-element');
        const values = arrayElement.map(element => parseInt(element.textContent));
        const sortedValues = [...values].sort((a, b) => a - b);
        expect(sortedValues).toEqual(sortedValues);
    });

    it('По убыванию', () => {
        render(<BrowserRouter> <SortingPage /> </BrowserRouter>);

        // Устанавливаем новый случайный массив
        screen.getByTestId('set-array-button').click();

        // Сортируем массив по убыванию
        screen.getByTestId('sort-desc-button').click();

        // Проверяем, что массив отсортирован по убыванию
        const arrayElement = screen.getAllByTestId('array-element');
        const values = arrayElement.map(element => parseInt(element.textContent));
        const sortedValues = [...values].sort((a, b) => b - a);
        expect(sortedValues).toEqual(sortedValues);
    });
});