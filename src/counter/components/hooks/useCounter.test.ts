import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import { useCounter } from "./useCounter";

describe('useCounter', () => {
    // let result;

    // beforeEach(() => {
    //     // Reiniciar el hook antes de cada prueba si es necesario pero se puerde el tipado
    //     const { result: hookValue } = renderHook(() => useCounter());
    //     result = hookValue;
    // });

    test('should initialize with default value of 10', () => {
        const { result } = renderHook(() => useCounter());
        expect(result.current.counter).toBe(10);
    });

    test('should initialize with value of 0', () => {
        const initialValue = 0;
        const { result } = renderHook(() => useCounter(initialValue));
        expect(result.current.counter).toBe(initialValue);
    });

    test('should increment counter by 1 when handleAdd is called', () => {
        const { result } = renderHook(() => useCounter());

        // act se usa para envolver las llamadas que provocan cambios de estado
        // toca asi por la definiciòn del metodo handleAdd
        act(() => {
            result.current.handleAdd();
            //result.current.handleAdd();
        });
        // incrementar otra vez para verificar que funciona correctamente
        act(() => {
            result.current.handleAdd();
        });

        //console.log('aqui')
        //console.log({ counter: result.current.counter });

        expect(result.current.counter).toBe(12);
    });

    test('should decrement counter by 1 when handleSubtract is called', () => {
        const { result } = renderHook(() => useCounter());

        act(() => {
            result.current.handleSubtract();
        });

        expect(result.current.counter).toBe(9);
    });

    test('should reset counter to initial value when handleReset is called', () => {
        const { result } = renderHook(() => useCounter());

        //  handleSubtract funciona porque se define usando la función de retorno (callback)
        act(() => {
            result.current.handleSubtract();
            result.current.handleSubtract();
            result.current.handleSubtract();
            result.current.handleSubtract();
            result.current.handleSubtract();
        });

        console.log({ counter: result.current.counter });
        console.log(result.current.counter);
        expect(result.current.counter).toBe(5);

        act(() => {
            result.current.handleReset();
        });

        expect(result.current.counter).toBe(10);
    });
});