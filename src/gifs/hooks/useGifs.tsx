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
        sendInputGa4(term);

        if (gifsCache.current[term]) {
            setGifs(gifsCache.current[term]);
            return;
        }

        const gifs = await getGifsByQuery(term);
        setGifs(gifs);
        gifsCache.current[term] = gifs;
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

        //console.log({ gifs });
        setGifs(gifs);

        gifsCache.current[query] = gifs;
        //console.log(gifsCache);
        sendInputGa4(query);


    };

    const sendInputGa4 = (term: string) => {

        if (term.length > 0) {
            console.log('entro al if')
            if (typeof (window as any).gtag === 'function') {
                (window as any).gtag('event', 'search', { search_term: term });
            } else if (Array.isArray((window as any).dataLayer)) {
                (window as any).dataLayer.push({ event: 'search', search_term: term });
            } else {
                console.warn('GA4 no disponible: gtag/dataLayer no encontrada');
            }
        }
    };


    return {
        // props
        gifs,
        previousTerms,
        // methods
        handleSearch,
        handleTermClicked,

    }
}
