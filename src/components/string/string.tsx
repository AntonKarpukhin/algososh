import React, { ChangeEvent, useState } from "react";
import styles from './string.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

export interface IString {
    letter: string;
    state?: ElementStates;
}

export const StringComponent: React.FC = () => {

    const [loader, setLoader] = useState(false);
    const [valueInput, setValueInput] = useState('');
    const [valueCircle, setValueCircle] = useState<IString[]>([])

    const onChangeValueInput = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setValueInput(e.target.value);
    }

    const onStartSwap = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoader(true);
        reverse();
    }

    const reverse = () => {
        const arr = valueInput.split('').map(item => {
            return {
                letter: item,
                state: ElementStates.Default
            }
        })
        setValueCircle(arr)

        let swapArray = [...arr];

        for (let i = 0; i < swapArray.length / 2; i++) {
            setTimeout(() => {
                let start = i;
                let end = swapArray.length - 1 - start;
                swapArray[start].state = ElementStates.Changing;
                swapArray[end].state = ElementStates.Changing;
                setValueCircle([...swapArray]);

                setTimeout(() => {
                    let swapped = swapArray[start].letter;
                    swapArray[start] = {
                        letter: swapArray[end].letter,
                        state: ElementStates.Modified,
                    };
                    swapArray[end] = {
                        letter: swapped,
                        state: ElementStates.Modified,
                    }
                    setValueCircle([ ...swapArray ]);
                    setValueInput('');
                }, 1000);
            }, 1000 * i);
            setTimeout(() => {
                setLoader(false);
            }, 1000 * swapArray.length / 2)
        }
    }

  return (
    <SolutionLayout title="Строка">
        <div className={styles.wrapperForm}>
            <form className={styles.wrapper} onSubmit={onStartSwap}>
                <Input data-testid="input" value={valueInput} maxLength={11} isLimitText={true} onChange={onChangeValueInput}/>
                <Button data-testid="button" type="submit" text="Развернуть" isLoader={loader} disabled = { valueInput.length < 1 }/>
            </form>
            <div className={styles.wrapperCircle}>
                {valueCircle.map((item, i) => <div key={i} data-testid="circle"><Circle letter={item.letter} state={item.state}/></div>)}
            </div>
        </div>
    </SolutionLayout>
  );
};
