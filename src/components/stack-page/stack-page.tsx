import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { Stack } from "./class";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";

import styles from './stack-page.module.css';
import { Circle } from "../ui/circle/circle";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface ICircle {
  value: string | null,
  state: ElementStates;
}

export const StackPage: React.FC = () => {

  const [input, setInput] = useState<string>('');
  const [stacks, setStacks] = useState<ICircle[]>([]);

  const onChangeValueInput = (evt: ChangeEvent<HTMLInputElement>) => {
    setInput(evt.target.value);
  };

  const stack = new Stack<string>();

  const onAdd = async () => {
    if (input) {
      stack.push(input);
      stacks.push({
        value: stack.peak(),
        state: ElementStates.Changing,
      });
      setInput('');
      setStacks([...stacks]);
      await sleep(SHORT_DELAY_IN_MS);

      stacks[stacks.length - 1].state = ElementStates.Default;
      setStacks([...stacks]);
    }
  };

  const onRemove = async () => {
    stacks[stacks.length - 1].state = ElementStates.Changing;
    setStacks([...stacks]);
    await sleep(SHORT_DELAY_IN_MS);
    stack.pop();
    stacks.pop();
    setStacks([...stacks]);
  };

  const onClear = () => {
    stack.clear();
    setStacks([]);
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.wrapper}>
        <form className={styles.wrapperForm}>
          <Input isLimitText maxLength={4} onChange={onChangeValueInput} value={input} placeholder="Введите текст" />
          <Button disabled={input === ''} onClick={onAdd} type="button" text="Добавить" />
          <Button disabled={!stacks.length} onClick={onRemove} type="button" text="Удалить" />
          <Button disabled={!stacks.length} onClick={onClear} type="button" text="Очистить" />
        </form>
        <ul className={styles.wrapperCircle}>
          {stacks.map((item, index) => (
              <li key={index}>
                <Circle
                    state={item.state}
                    letter={item.value || ''}
                    index={index}
                    head={stacks.length - 1 === index ? 'top' : ''}
                />
              </li>
          ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
