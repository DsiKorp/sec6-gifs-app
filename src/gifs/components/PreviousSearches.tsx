import type { FC } from "react";

// es void porque es unicamente para mandarlo llamar del padre
interface Props {
    searches: string[];
    onLabelClicked: (term: string) => void;
}

export const PreviousSearches: FC<Props> = ({ searches, onLabelClicked }) => {

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

    return (
        <div className="previous-searches">
            <h2>Búsquedas Previas</h2>
            <ul className="previous-searches-list">
                {
                    searches.map((term) => (
                        <li key={term}
                            className="previous-search-item"
                            onClick={() => { sendInputGa4(term); onLabelClicked(term); }}>
                            {term}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
