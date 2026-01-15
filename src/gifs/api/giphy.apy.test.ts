import { describe, expect, test } from "vitest";
import { giphyApi } from "./giphy.api";


describe('giphyApi', () => {
    test('should exist the giphyApi instance', () => {
        //console.log(giphyApi.defaults);

        const params = giphyApi.defaults.params;

        expect(giphyApi.defaults.baseURL).toBe('https://api.giphy.com/v1/gifs');
        expect(params).toHaveProperty('api_key');
        expect(params.api_key).toBe(import.meta.env.VITE_GIPHY_API_KEY);
        expect(params).toHaveProperty('lang', 'es');

        expect(params).toStrictEqual({
            lang: 'es',
            api_key: import.meta.env.VITE_GIPHY_API_KEY,
        });

    });
});
