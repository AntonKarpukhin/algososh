import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";

import styles  from './fibonacci-page.module.css';

export const FibonacciPage: React.FC = () => {

  const [valueInput, setValueInput] = useState("");
  const [valueCircle, setValueCircle] = useState<string[]>([]);
  const [loader, setLoader] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const getNumbers = (n: number): string[] => {
    const arr: number[] = [n];
    for (let i = 0; i <= n; i++) {
      if (i === 0) {
        arr[0] = 1;
      } else if (i === 1) {
        arr[1] = 1;
      } else {
        arr[i] = arr[i - 1] + arr[i - 2];
      }
    }
    return arr.map((n) => n.toString());
  };

  const onChangeValueInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.target.value);
    if (( parseInt(e.target.value) <= 19) && (parseInt(e.target.value) >= 1)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const visualFib = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let number = Number(valueInput);

    setLoader(true);

    const arr: string[] = [];
    let counter: number = 0;
    const fibArr = getNumbers(number);

    setValueInput("");
    setDisabled(true);

    const interval = setInterval(() => {
      arr.push(fibArr[counter]);
      setValueCircle([...arr]);

      counter++;

      if (fibArr.length - 1 === arr.length - 1) {
        clearInterval(interval);
        setLoader(false);
      }
    }, 500)
  };


  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className = { styles.wrapperFib }>
        <form className = { styles.form } onSubmit = { visualFib }>
          <Input
              max = { 19 }
              maxLength = { 19 }
              type = "number"
              isLimitText = { true }
              value = { valueInput.replace(/\D/g, "") || "" }
              onInput = { onChangeValueInput }
          />
          <Button
              text = "Рассчитать"
              type = "submit"
              isLoader = { loader }
              disabled = { disabled }
          />
        </form>
        <div className = { styles.circle }>
          {valueCircle.map((letter, i) => {
            return (
                <Circle
                    letter = { letter }
                    key = { i }
                    index = { i }
                />);
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
