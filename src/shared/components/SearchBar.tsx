import { useEffect, useState, type KeyboardEvent } from "react";

// es void porque es unicamente para mandarlo llamar del padre
interface Props {
    placeholder?: string;
    textButton?: string;
    onQuery: (query: string) => void;

}
export const SearchBar = ({ placeholder = "Buscar...", textButton = "Buscar", onQuery }: Props) => {

    const [query, setQuery] = useState('');

    // un efecto se dispara cada vez que el componente se renderiza
    // el return se dispara cuando el componente se va a desmontar o antes de volver a ejecutar la función callback
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onQuery(query);
        }, 1000);


        return () => {
            clearTimeout(timeoutId);
        };
    }, [query, onQuery]);
    // [query, onQuery] dependencias que el efecto tiene que observar, es decir cuales son las dependencias 
    // que si cambian tienen que volver a ejecutar el efecto

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
            {/* query es un input controlado por react*/}
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