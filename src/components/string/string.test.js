import { render, fireEvent,  waitFor, screen } from '@testing-library/react';
import { StringComponent } from './string';
import App from "../app/app";
import { BrowserRouter } from "react-router-dom";

describe('StringComponent', () => {



    it('Четное', async() => {
        render(<BrowserRouter> <StringComponent /> </BrowserRouter>);

        const button = screen.getByTestId('button');
        const input = screen.getByTestId('input');

        fireEvent.change( input, { target: { value: 'helloo' } } );
        fireEvent.click( button );

        await waitFor(() => {
            expect(screen.getAllByTestId( 'circle' ) [0]).toHaveTextContent('h');
            expect(screen.getAllByTestId( 'circle' ) [1]).toHaveTextContent('e');
            expect(screen.getAllByTestId( 'circle' ) [2]).toHaveTextContent('l');
            expect(screen.getAllByTestId( 'circle' ) [3]).toHaveTextContent('l');
            expect(screen.getAllByTestId( 'circle' ) [4]).toHaveTextContent('o');
            expect(screen.getAllByTestId( 'circle' ) [5]).toHaveTextContent('o');
        }, {timeout: 2000})
    });



    it('Нечетное', async () => {
        render(<BrowserRouter> <StringComponent /> </BrowserRouter>);

        const button = screen.getByTestId("button");
        const input = screen.getByTestId("input");

        fireEvent.change(input, { target: { value: 'world' } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getAllByTestId( 'circle' ) [0]).toHaveTextContent('w');
            expect(screen.getAllByTestId( 'circle' ) [1]).toHaveTextContent('o');
            expect(screen.getAllByTestId( 'circle' ) [2]).toHaveTextContent('r');
            expect(screen.getAllByTestId( 'circle' ) [3]).toHaveTextContent('l');
            expect(screen.getAllByTestId( 'circle' ) [4]).toHaveTextContent('d');
        }, {timeout: 2000})
    });

    it('Один символ', async () => {
        render(<BrowserRouter> <StringComponent /> </BrowserRouter>);

        const button = screen.getByTestId("button");
        const input = screen.getByTestId("input");

        fireEvent.change( input, { target: { value: 'h' } } );
        fireEvent.click( button );

        await waitFor(() => {
            expect(screen.getAllByTestId( 'circle' ) [0]).toHaveTextContent('h');
        }, {timeout: 2000})

    });

    it('should correctly handle an empty string', async () => {
        render(<BrowserRouter> <StringComponent /> </BrowserRouter>);

        const button = screen.getByTestId("button");
        const input = screen.getByTestId("input");

        fireEvent.change(input, { target: { value: '' } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.queryByLabelText( 'circle' )).toBeNull();
        }, {timeout: 2000})
    });
});