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

    test("should call onQuery immediately when Enter is pressed", () => {

    });
});