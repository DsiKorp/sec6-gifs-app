import { beforeEach, describe, expect, test, vi } from "vitest";
import AxiosMockAdapter from "axios-mock-adapter";
import { getGifsByQuery } from "./get-gifs-by-query.actions";
import { giphyApi } from "../api/giphy.api";
import { giphySearchResponseMock } from '../../../test/mocks/giphy.response.data';



describe("getGifsByQuery", () => {
    let mock = new AxiosMockAdapter(giphyApi);

    beforeEach(() => {
        //mock.reset();
        mock = new AxiosMockAdapter(giphyApi);
    });

    // test("should return a list of Gif[] correctly", async () => {
    //     const gifs = await getGifsByQuery("Astro Bot");
    //     const [gif1] = gifs;

    //     //console.log(gifs);
    //     //console.log(gif1);

    //     expect(gifs.length).toBe(50);

    //     expect(gif1).toStrictEqual({
    //         id: expect.any(String),
    //         title: expect.any(String),
    //         url: expect.any(String),
    //         width: expect.any(Number),
    //         height: expect.any(Number),
    //     });
    // });

    test("should return a list of gifs", async () => {

        // 200, [] data
        mock.onGet("/search").reply(200, giphySearchResponseMock);
        const gifs = await getGifsByQuery("Astro Bot");

        //console.log(gifs);

        expect(gifs.length).toBe(50);

        gifs.forEach(gif => {
            expect(gif).toStrictEqual({
                id: expect.any(String),
                title: expect.any(String),
                url: expect.any(String),
                width: expect.any(Number),
                height: expect.any(Number),
            });
        });
    });

    test("should return an empty list of gifs if query is empty", async () => {
        // 200, [] data
        //mock.onGet("/search").reply(200, { data: [] });
        mock.restore(); // No mock for this test
        const gifs = await getGifsByQuery("");

        console.log(gifs);

        expect(gifs.length).toBe(0);
    });

    test("should handle error when API returns 400", async () => {
        const consoleErrorSpy = vi.spyOn(console, 'error')
            .mockImplementation(() => {
                console.log('Error');
                console.log('De');
                console.log('La API');
            });

        // 400, []
        mock.onGet("/search").reply(400, {
            data: {
                message: "Bad Request",
            }
        });

        const gifs = await getGifsByQuery("Astro Bot");
        console.log('aqui')
        console.log(gifs);
        expect(gifs.length).toBe(0);
        expect(consoleErrorSpy).toHaveBeenCalled();
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith("Error fetching gifs:", expect.anything());

    });
});