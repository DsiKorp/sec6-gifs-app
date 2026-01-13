import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { CustomHeader } from './CustomHeader';

describe('CustomHeader', () => {
    const title = 'Test Title';
    const description = 'Descripción de ejemplo';

    test('should render the title correctly', () => {
        render(<CustomHeader title={title} />);
        //screen.debug();
        expect(screen.getByText(title)).toBeDefined();
    });

    test('should render the description when provided', () => {
        // screen se usa cuando los elementos son renderizados por react
        render(<CustomHeader title={title} description={description} />);
        expect(screen.getByText(description)).toBeDefined();
        expect(screen.getByRole('paragraph')).toBeDefined();
        expect(screen.getByRole('paragraph').innerHTML).toBe(description);
        //expect(screen.getByRole('paragraph', { name: description })).toBeDefined();
    });

    test('should not render description when not provided', () => {
        // container se usa para acceder al DOM directamente y los elementos no cambian desde el inicio
        const { container } = render(<CustomHeader title={title} />);
        const divElement = container.querySelector('.content-center');
        //screen.debug();
        // ? puede que no exista el h1 dentro del div
        const h1 = divElement?.querySelector('h1');
        console.log(h1?.innerHTML);
        expect(h1?.innerHTML).toBe(title);
        const p = divElement?.querySelector('p');
        expect(p).toBeNull();
    });
});