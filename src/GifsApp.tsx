import { PreviousSearches } from './gifs/components/PreviousSearches';
import { CustomHeader } from './shared/components/CustomHeader'
import { GifList } from './gifs/components/GifList'
import { SearchBar } from './shared/components/SearchBar'
import { useState } from 'react';
import { getGifsByQuery } from './gifs/actions/get-gifs-by-query.actions';
import type { Gif } from './gifs/interfaces/gif.interface';

export const GifsApp = () => {

    const [gifs, setGifs] = useState<Gif[]>([]);
    const [previousTerms, setPreviousTerms] = useState<string[]>([]);

    const handleTermClicked = (term: string) => {
        console.log(`${term}`);
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

    };

    return (
        <>
            {/* header */}
            <CustomHeader title="Buscador de Gifs"
                description="Descubre y comparte el gif perfecto"
            />
            {/* search */}
            <SearchBar placeholder='Buscar gifs...'
                textButton="Buscar"
                onQuery={handleSearch}
            />
            {/* busquedas previas */}
            <PreviousSearches searches={previousTerms}
                onLabelClicked={handleTermClicked}
            />
            {/* Gifs */}
            {/* <GifList gifs={[]} /> */}
            <GifList gifs={gifs} />
        </>
    )
}

