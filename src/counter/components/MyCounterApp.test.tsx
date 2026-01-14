import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { MyCounterApp } from "./MyCounterApp";

describe('MyCounterApp', () => {
    test('should render the MyCounterApp component', () => {
        render(<MyCounterApp />);
        //screen.debug();
        expect(screen.getByRole('heading', { level: 1 }).innerHTML).toContain('Counter: 0');
        expect(screen.getByRole('button', { name: '+1' })).toBeDefined();
        expect(screen.getByRole('button', { name: '-1' })).toBeDefined();
        expect(screen.getByRole('button', { name: 'Reset' })).toBeDefined();
    });

    test('should increment the counter when button is clicked', () => {
        render(<MyCounterApp />);
        screen.debug();
        const labelH1 = screen.getByRole('heading', { level: 1 });
        const addButton = screen.getByRole('button', { name: '+1' });

        fireEvent.click(addButton);
        expect(labelH1.innerHTML).toContain('Counter: 1');
    });

    test('should decrement the counter when button is clicked', () => {
        render(<MyCounterApp />);
        screen.debug();
        const labelH1 = screen.getByRole('heading', { level: 1 });
        const subtractButton = screen.getByRole('button', { name: '-1' });

        fireEvent.click(subtractButton);
        expect(labelH1.innerHTML).toContain('Counter: -1');
    });
});
