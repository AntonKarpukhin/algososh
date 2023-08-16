import React, { ChangeEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";

import styles from './sorting-page.module.css';
import { Direction } from "../../types/direction";

export type TArr = {
  value: number;
  state: ElementStates;
}

export const SortingPage: React.FC = () => {

  const [array, setArray] = useState<TArr[]>([]);
  const [radio, setRadio] = useState("selectionType");
  const [loading, setLoading] = useState("");

  const asc: string = "ascending";
  const desc: string = "descending";

  const setTime = (ms: number) =>
      new Promise((res) => setTimeout(res, ms));

  const newRandomArr = (): TArr[] => {
    let array = [{ value: 0, state: ElementStates.Default }];
    let size = 0;
    const minLen = 3;
    const maxLen = 17;

    while (size < minLen || size > maxLen) {
      size = Math.round(Math.random() * 20);
    }
    for (let i = 0; i <= size; i++) {
      array.push({
        value: Math.round(Math.random() * 100),
        state: ElementStates.Default,
      });
    }
    return array;
  };

  useEffect(() => {
    setArray(newRandomArr());
  }, []);

  const addNewArray = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading("newArray");
    setArray(newRandomArr());
    setLoading("");
  };

  const radioCheck = (e: ChangeEvent<HTMLInputElement>): void => {
    setRadio(e.target.value);
  };

  const swapElement = (array: TArr[], element1: number, element2: number): void => {
    const temp = array[element1];
    array[element1] = array[element2];
    array[element2] = temp;
  };

  const select = async (
      array: TArr[],
      mode: boolean
  ): Promise<TArr[]> => {

    for (let i = 0; i < array.length; i++) {
      let smallestIndex = i;
      array[smallestIndex].state = ElementStates.Changing;
      for (let j = i + 1; j < array.length; j++) {
        array[j].state = ElementStates.Changing;
        setArray([...array]);
        await setTime(1000);
        if (
            mode
                ? array[j].value < array[smallestIndex].value
                : array[j].value > array[smallestIndex].value
        ) {
          smallestIndex = j;
          array[j].state = ElementStates.Changing;
          array[smallestIndex].state =
              i === smallestIndex ? ElementStates.Changing : ElementStates.Default;
          smallestIndex = j;
        }
        if (j !== smallestIndex) {
          array[j].state = ElementStates.Default;
        }
        setArray([...array]);
      }
      swapElement(array, i, smallestIndex);
      array[smallestIndex].state = ElementStates.Changing;
      array[i].state = ElementStates.Modified;
      setArray([...array]);
    }
    return array;
  };

  const bubbleSort = async (
      array: TArr[],
      mode: boolean
  ): Promise<TArr[]> => {

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        array[j].state = ElementStates.Changing;
        array[j+ 1].state = ElementStates.Changing;
        const value1 = array[j].value;
        const value2 = array[j + 1].value;
        setArray([...array]);
        await setTime(1000);
        if (mode ? value1 > value2 : value1 < value2) {
          array[j].value = value2;
          array[j + 1].value = value1;
        }
        array[j].state = ElementStates.Default;
        if (array[j + 1]) {
          array[j + 1].state = ElementStates.Default;
        }
        setArray([...array]);
      }
      array[array.length - i - 1].state = ElementStates.Modified;
      setArray([...array]);
    }

    return array;
  };

  const setSort = async (mode: string): Promise<void> => {
    setLoading(mode);
    const currentMode = mode === desc;
    if (radio === "selectionType") {
      setArray(await select([...array], currentMode));
    } else {
      setArray(await bubbleSort([...array], currentMode));
    }
    setLoading("");
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className = { styles.wrapper }>
        <form className = { styles.wrapperForm }>
          <div className = { styles.radio }>
            <RadioInput
                label = "Выбор"
                value = { "selectionType" }
                name = { "sorting" }
                defaultChecked
                onChange = { radioCheck }
            />
            <RadioInput
                label = "Пузырёк"
                value = { "bubbleType" }
                name = { "sorting" }
                onChange = { radioCheck }
            />
          </div>
          <div className = { styles.sorting }>
            <Button
                text = "По возрастанию"
                sorting = { Direction.Descending }
                onClick = { () => setSort(desc) }
                isLoader = { loading === desc }
                disabled = { loading === asc }
                extraClass = { styles.button }
            />
            <Button
                text = "По убыванию"
                sorting = { Direction.Ascending }
                onClick = { () => setSort(asc) }
                isLoader = { loading === asc }
                disabled = { loading === desc }
                extraClass = { styles.button }
            />
          </div>
          <Button
              text = "Новый массив"
              onClick = { addNewArray }
              isLoader = { loading === "newArray" }
              disabled = { loading === asc || loading === desc }
              extraClass = { styles.button }
          />
        </form>
        <div className = { styles.wrapperCircle }>
          { array.map((element, i) => {
            return (
                <Column
                    index = { element.value }
                    state = { element.state }
                    key = { i }
                    extraClass = { styles.element }
                />
            );
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
