import type { FC } from "react";

// es void porque es unicamente para mandarlo llamar del padre
interface Props {
    searches: string[];
    onLabelClicked: (term: string) => void;
}

export const PreviousSearches: FC<Props> = ({ searches, onLabelClicked }) => {

    return (
        <div className="previous-searches">
            <h2>Búsquedas Previas</h2>
            <ul className="previous-searches-list">
                {
                    searches.map((term) => (
                        <li key={term}
                            className="previous-search-item"
                            onClick={() => { onLabelClicked(term); }}>
                            {term}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
