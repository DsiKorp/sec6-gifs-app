import { useState } from "react";

// Custom Hook de CounterApp
export const useCounter = (initialValue: number = 10) => {
    const [counter, setCounter] = useState(initialValue)

    const handleAdd = () => setCounter(counter + 1);
    const handleSubtract = () => setCounter(prevState => prevState - 1);
    const handleReset = () => setCounter(initialValue);

    return {
        // Values
        counter,
        // Setters vacio por que setCounter no se expone y se usa dentro de los metodos
        // Methods / Actions
        handleAdd,
        handleSubtract,
        handleReset,
    }
}

// export const useState = (arg: string) => {
//     return [arg, () => { }];
// };



