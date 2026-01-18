import { useEffect, useState, type KeyboardEvent } from "react";

interface Props {
    placeholder?: string;
    textButton?: string;
    onQuery: (query: string) => void;

}
export const SearchBar = ({ placeholder = "Buscar...", textButton = "Buscar", onQuery }: Props) => {

    const [query, setQuery] = useState('');

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            sendInputGa4();
            onQuery(query);
        }, 1000);


        return () => {
            clearTimeout(timeoutId);
        };
    }, [query, onQuery]);  // dependencias

    const handleSearch = () => {
        sendInputGa4();
        // emite el query al padre
        onQuery(query);
        setQuery('');
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const sendInputGa4 = () => {
        setQuery(query.trim().toLowerCase());

        if (query.trim().toLowerCase().length > 0) {
            console.log('entro al if')
            if (typeof (window as any).gtag === 'function') {
                (window as any).gtag('event', 'search', { search_term: query });
            } else if (Array.isArray((window as any).dataLayer)) {
                (window as any).dataLayer.push({ event: 'search', search_term: query });
            } else {
                console.warn('GA4 no disponible: gtag/dataLayer no encontrada');
            }
        }
    };

    return (
        <div className="search-container">
            {/* <h1>{query}</h1> */}
            <input
                type="text"
                placeholder={placeholder}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleSearch}>{textButton}</button>
        </div>
    );
}