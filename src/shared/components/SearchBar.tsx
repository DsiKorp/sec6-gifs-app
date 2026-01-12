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
            onQuery(query);
        }, 700);


        return () => {
            clearTimeout(timeoutId);
        };
    }, [query, onQuery]);  // dependencias

    const handleSearch = () => {
        // emite el query al padre
        onQuery(query);
        setQuery('');
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
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