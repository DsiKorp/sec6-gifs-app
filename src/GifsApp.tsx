import { PreviousSearches } from './gifs/components/PreviousSearches';
import { CustomHeader } from './shared/components/CustomHeader'
import { GifList } from './gifs/components/GifList'
import { SearchBar } from './shared/components/SearchBar'
import { useGifs } from './gifs/hooks/useGifs';

export const GifsApp = () => {
    const { previousTerms, handleSearch, handleTermClicked, gifs } = useGifs();

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

