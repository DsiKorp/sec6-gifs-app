import { useRef, useState } from 'react'
import { getGifsByQuery } from '../actions/get-gifs-by-query.actions';
import type { Gif } from '../interfaces/gif.interface';

// const gifsCache: Record<string, Gif[]> = {};

export const useGifs = () => {
    const [gifs, setGifs] = useState<Gif[]>([]);
    const [previousTerms, setPreviousTerms] = useState<string[]>([]);

    const gifsCache = useRef<Record<string, Gif[]>>({});

    const handleTermClicked = async (term: string) => {
        console.log(`${term}`);

        if (gifsCache.current[term]) {
            setGifs(gifsCache.current[term]);
            return;
        }

        const gifs = await getGifsByQuery(term);
        setGifs(gifs);
    };

    const handleSearch = async (query: string = '') => {
        console.log({ query });
        query = query.trim().toLocaleLowerCase();

        if (query.length === 0) {
            return;
        }

        if (previousTerms.includes(query)) {
            return;
        }

        setPreviousTerms([query, ...previousTerms].slice(0, 8));
        const gifs = await getGifsByQuery(query);

        console.log({ gifs });
        setGifs(gifs);

        gifsCache.current[query] = gifs;
        console.log(gifsCache);

    };


    return {
        // props
        gifs,
        // methods
        handleSearch,
        handleTermClicked,
        previousTerms,
    }
}
