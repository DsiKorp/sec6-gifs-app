import { renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { useGifs } from "./useGifs";
import { act } from "react";
import * as gifActions from "../actions/get-gifs-by-query.actions";



describe("useGifs", () => {
    test("should return default values and methods", () => {

        const { result } = renderHook(() => useGifs());

        expect(result.current.gifs.length).toBe(0);
        expect(result.current.previousTerms.length).toBe(0);
        expect(result.current.handleSearch).toBeDefined();
        expect(result.current.handleTermClicked).toBeDefined();

    });

    test("should return a list of gifs", async () => {

        const { result } = renderHook(() => useGifs());

        await act(async () => {
            await result.current.handleSearch("Astro Bot");
        });

        expect(result.current.gifs.length).toBe(50);
    });

    test("should return a list of gifs when handleTermClicked is called", async () => {

        const { result } = renderHook(() => useGifs());

        await act(async () => {
            await result.current.handleTermClicked("Astro Bot");
        });

        expect(result.current.gifs.length).toBe(50);
    });

    test("should return a list of gifs from cache", async () => {

        const { result } = renderHook(() => useGifs());

        await act(async () => {
            await result.current.handleTermClicked("Astro Bot");
        });

        expect(result.current.gifs.length).toBe(50);

        vi.spyOn(gifActions, 'getGifsByQuery')
            .mockRejectedValue(new Error("getGifsByQuery: This is my custom error"));

        await act(async () => {
            await result.current.handleTermClicked("Astro Bot");
        });

        expect(result.current.gifs.length).toBe(50);
    });

    test("should return no more than 8 previous terms", async () => {

        const { result } = renderHook(() => useGifs());

        vi.spyOn(gifActions, 'getGifsByQuery')
            .mockResolvedValue([]);

        await act(async () => {
            await result.current.handleSearch("Astro Bot");
        });

        await act(async () => {
            await result.current.handleSearch("Astro Bot 2");
        });

        await act(async () => {
            await result.current.handleSearch("Astro Bot 3");
        });

        await act(async () => {
            await result.current.handleSearch("Astro Bot 4");
        });

        await act(async () => {
            await result.current.handleSearch("Astro Bot 5");
        });

        await act(async () => {
            await result.current.handleSearch("Astro Bot 6");
        });

        await act(async () => {
            await result.current.handleSearch("Astro Bot 7");
        });

        await act(async () => {
            await result.current.handleSearch("Astro Bot 8");
        });

        await act(async () => {
            await result.current.handleSearch("Astro Bot 9");
        });

        expect(result.current.previousTerms.length).toBe(8);
        expect(result.current.previousTerms).not.toContain("astro bot");
        expect(result.current.previousTerms).toStrictEqual(
            [
                'astro bot 9',
                'astro bot 8',
                'astro bot 7',
                'astro bot 6',
                'astro bot 5',
                'astro bot 4',
                'astro bot 3',
                'astro bot 2'
            ]);

        console.log(result.current.previousTerms);


    });

});