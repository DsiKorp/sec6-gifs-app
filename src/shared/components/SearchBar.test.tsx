import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {

    test("should render searchbar correctly", () => {

        const { container } = render(<SearchBar onQuery={() => { }} />);

        expect(container).toMatchSnapshot();
        expect(screen.getByRole("textbox")).toBeDefined();
        expect(screen.getByRole("button")).toBeDefined();
    });

    test("should call onQuery with the correct value after 1000ms", async () => {
        const searchTerm = "Astro Bot test query";
        const onQueryMock = vi.fn();
        render(<SearchBar onQuery={onQueryMock} />);

        const input = screen.getByRole("textbox") as HTMLInputElement;
        fireEvent.change(input, { target: { value: searchTerm } });

        screen.debug();

        //await new Promise((resolve) => setTimeout(resolve, 1101)); // wait for more than 1000ms
        await waitFor(() => {
            expect(onQueryMock).toHaveBeenCalled();
            expect(onQueryMock).toHaveBeenCalledWith(searchTerm);
        });
    });

    // clase 109
    test('should call only once with the last value (debounce)', async () => {
        vi.useFakeTimers();
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 't' } });
        fireEvent.change(input, { target: { value: 'te' } });
        fireEvent.change(input, { target: { value: 'tes' } });
        fireEvent.change(input, { target: { value: 'test' } });

        await vi.advanceTimersByTimeAsync(1000);

        expect(onQuery).toHaveBeenCalledTimes(1);
        expect(onQuery).toHaveBeenCalledWith('test');

        vi.useRealTimers();
    });

    test("should call onQuery when the search button is clicked with the input value", () => {
        const onQueryMock = vi.fn();
        render(<SearchBar onQuery={onQueryMock} />);

        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "test" } });

        const button = screen.getByRole("button");
        fireEvent.click(button);

        expect(onQueryMock).toHaveBeenCalledTimes(1);
        expect(onQueryMock).toHaveBeenCalledWith("test");
    });

    test("should use the placeholder prop correctly", () => {
        const placeholderText = "Search for gifs...";
        render(<SearchBar onQuery={() => { }} placeholder={placeholderText} />);

        expect(screen.getByPlaceholderText(placeholderText)).toBeDefined();
    });

});
