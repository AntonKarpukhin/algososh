import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { LinkedList, TListElement } from "./class";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { Circle } from "../ui/circle/circle";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";

import style from './list-page.module.css';
import { ArrowIcon } from "../ui/icons/arrow-icon";

const startArray = [5, 26, 10, 4];
const linked = new LinkedList<string | number>(startArray);

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const ListPage: React.FC = () => {

  const initialArr: Array<TListElement> = startArray.map((item, index, array) => ({
    item: `${item}`,
    state: ElementStates.Default,
    head: index === 0 ? true : false,
    tail: index === array.length - 1 ? true : false,
    isAdded: false,
    isRemoved: false,
    newCircle: null,
  }));

  const [input, setInput] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
  const [listArray, setListArray] = useState<Array<TListElement>>(initialArr);
  const [addHead, setAddHead] = useState<boolean>(false);
  const [addTail, setAddTail] = useState<boolean>(false);
  const [removeHead, setRemoveHead] = useState<boolean>(false);
  const [removeTail, setRemoveTail] = useState<boolean>(false);
  const [addByIndex, setAddByIndex] = useState<boolean>(false);
  const [removeByIndex, setRemoveByIndex] = useState<boolean>(false);

  const onChangeValueInput = (e: React.SyntheticEvent<HTMLInputElement>) => {
    if (e.currentTarget.type === "text") {
      setInput(e.currentTarget.value);
    } else {
      setIndex(+e.currentTarget.value);
    }
  };

  const onAddHead = async () => {
    setAddHead(true);
    linked.prepend(input);

    if (linked.getSize() > 1) {
      listArray[0] = {
        ...listArray[0],
        isAdded: true,
        head: false,
        newCircle: { item: input },
        state: ElementStates.Changing,
      };
    } else {
      listArray[0] = {
        item: input,
        isAdded: true,
        head: true,
        newCircle: null,
        state: ElementStates.Changing,
      };
    }
    setListArray([...listArray]);

    await sleep(DELAY_IN_MS);

    if (linked.getSize() > 1) {
      listArray[0] = {
        ...listArray[0],
        isAdded: false,
        head: false,
        newCircle: null,
        state: ElementStates.Default,
      };
    } else {
      listArray[0] = {
        item: input,
        isAdded: false,
        head: true,
        tail: true,
        newCircle: null,
        state: ElementStates.Default,
      };
    }
    setListArray([...listArray]);

    await sleep(DELAY_IN_MS);

    if (linked.getSize() > 1) {
      listArray.unshift({ item: input, state: ElementStates.Modified });
      setListArray([...listArray]);
      await sleep(DELAY_IN_MS);
    }

    listArray[0] = {
      ...listArray[0],
      state: ElementStates.Default,
      head: true,
    };
    setListArray([...listArray]);
    setInput("");
    setAddHead(false);
  };

  const onAddTail = async () => {
    setAddTail(true);
    linked.append(input);

    if (linked.getSize() > 0) {
      listArray[listArray.length - 1] = {
        ...listArray[listArray.length - 1],
        tail: false,
        isAdded: true,
        newCircle: { item: input },
        state: ElementStates.Changing,
      };
    } else {
      listArray[0] = {
        item: input,
        head: true,
        tail: true,
        isAdded: true,
        newCircle: null,
        state: ElementStates.Changing,
      };
    }
    setListArray([...listArray]);

    await sleep(DELAY_IN_MS);

    if (linked.getSize() > 0) {
      listArray[listArray.length - 1] = {
        ...listArray[listArray.length - 1],
        tail: false,
        isAdded: false,
        newCircle: null,
        state: ElementStates.Default,
      };
    } else {
      listArray[0] = {
        item: input,
        head: true,
        tail: true,
        isAdded: false,
        newCircle: null,
        state: ElementStates.Default,
      };
    }

    setListArray([...listArray]);

    await sleep(DELAY_IN_MS);

    if (linked.getSize() > 0) {
      listArray.push({ item: input, state: ElementStates.Modified });
      setListArray([...listArray]);
      await sleep(DELAY_IN_MS);
    }

    listArray[listArray.length - 1] = {
      ...listArray[listArray.length - 1],
      tail: true,
      state: ElementStates.Default,
    };
    listArray[listArray.length - 2] = {
      ...listArray[listArray.length - 2],
      tail: false,
    };
    setListArray([...listArray]);
    setInput("");
    setAddTail(false);
  };

  const onRemoveHead = async () => {
    setRemoveHead(true);
    linked.deleteHead();
    if (linked.getSize() > 0) {
      listArray[0] = {
        ...listArray[0],
        head: false,
        state: ElementStates.Changing,
        item: "",
        isRemoved: true,
        newCircle: { item: listArray[0].item },
      };
    } else {
      listArray[0] = {
        ...listArray[0],
        head: false,
        tail: false,
        state: ElementStates.Changing,
        item: "",
        isRemoved: true,
        newCircle: { item: listArray[0].item },
      };
    }
    setListArray([...listArray]);

    await sleep(DELAY_IN_MS);

    listArray[0].state = ElementStates.Modified;
    listArray.shift();
    setListArray([...listArray]);

    await sleep(DELAY_IN_MS);
    if (linked.getSize() > 0) {
      listArray[0] = {
        ...listArray[0],
        state: ElementStates.Default,
        head: true,
      };
      setListArray([...listArray]);
    }
    setInput("");
    setRemoveHead(false);
  };

  const onRemoveTail = async () => {
    setRemoveTail(true);
    linked.deleteTail();
    listArray[listArray.length - 1] = {
      ...listArray[listArray.length - 1],
      tail: false,
      state: ElementStates.Changing,
      item: "",
      isRemoved: true,
      newCircle: { item: listArray[listArray.length - 1].item },
    };
    setListArray([...listArray]);
    await sleep(DELAY_IN_MS);

    if (linked.getSize() > 0) {
      listArray.pop();
      listArray[listArray.length - 1].state = ElementStates.Modified;
      setListArray([...listArray]);

      await sleep(DELAY_IN_MS);

      listArray[listArray.length - 1].state = ElementStates.Default;
      listArray[listArray.length - 1].tail = true;
    } else {
      listArray.pop();
    }

    setListArray([...listArray]);
    setInput("");
    setRemoveTail(false);
  };

  const onAddByIndex = async () => {
    setAddByIndex(true);
    linked.insertAt(input, index);
    for (let i = 0; i <= index; i++) {
      listArray[i] = {
        ...listArray[i],
        state: ElementStates.Changing,
        isAdded: true,
        newCircle: { item: input },
      };
      if (i > 0) {
        listArray[i - 1] = {
          ...listArray[i - 1],
          state: ElementStates.Changing,
          isAdded: false,
          newCircle: null,
        };
      }
      setListArray([...listArray]);

      await sleep(DELAY_IN_MS);
    }
    listArray[index] = {
      ...listArray[index!],
      isAdded: false,
      newCircle: null,
    };
    listArray.splice(index, 0, {
      item: input,
      state: ElementStates.Modified,
    });
    setListArray([...listArray]);

    await sleep(DELAY_IN_MS);

    listArray.forEach((item) => (item.state = ElementStates.Default));
    setListArray([...listArray]);
    listArray[1].head = false;
    listArray[0].head = true;
    setListArray([...listArray]);
    setInput("");
    setIndex(0);
    setAddByIndex(false);
  };

  const onRemoveByIndex = async () => {
    setRemoveByIndex(true);
    for (let i = 0; i <= index; i++) {
      listArray[i].state = ElementStates.Changing;
      setListArray([...listArray]);

      await sleep(DELAY_IN_MS);
    }
    listArray[index] = {
      ...listArray[index],
      item: "",
      isRemoved: true,
      newCircle: { item: listArray[index].item },
    };
    setListArray([...listArray]);

    await sleep(DELAY_IN_MS);

    listArray.splice(index, 1);
    setListArray([...listArray]);

    await sleep(DELAY_IN_MS);

    listArray.forEach((item) => (item.state = ElementStates.Default));
    setListArray([...listArray]);

    listArray[listArray.length - 1].tail = true;
    listArray[0].head = true;
    setListArray([...listArray]);
    setInput("");
    setIndex(0);
    setRemoveByIndex(false);
  };

  const disabledBtnAdd = input === "" || listArray.length > 5;
  const disabledBtnRemove = listArray.length < 1;

  return (
    <SolutionLayout title="Связный список">
      <div className={style.wrapper}>
        <Input
            placeholder="Введите значение"
            onChange={onChangeValueInput}
            maxLength={4}
            isLimitText
            value={input}
            disabled={listArray.length > 5}
            data-cy="input-value-list"
        />
        <Button
            extraClass={style.btn}
            text={"Добавить в head"}
            onClick={onAddHead}
            disabled={
                addTail ||
                removeHead ||
                removeTail ||
                addByIndex ||
                removeByIndex ||
                disabledBtnAdd
            }
            isLoader={addHead}
            data-cy="btn-add-head-list"
        />
        <Button
            extraClass={style.btn}
            text={"Добавить в tail"}
            onClick={onAddTail}
            disabled={
                addHead ||
                removeHead ||
                removeTail ||
                addByIndex ||
                removeByIndex ||
                disabledBtnAdd
            }
            isLoader={addTail}
            data-cy="btn-add-tail-list"
        />
        <Button
            extraClass={style.btn}
            text={"Удалить из head"}
            onClick={onRemoveHead}
            disabled={
                addHead ||
                addTail ||
                removeTail ||
                addByIndex ||
                removeByIndex ||
                disabledBtnRemove
            }
            isLoader={removeHead}
            data-cy="btn-remove-head-list"
        />
        <Button
            extraClass={style.btn}
            text={"Удалить из tail"}
            onClick={onRemoveTail}
            disabled={
                addHead ||
                addTail ||
                removeHead ||
                addByIndex ||
                removeByIndex ||
                disabledBtnRemove
            }
            isLoader={removeTail}
            data-cy="btn-remove-tail-list"
        />
      </div>
      <div className={style.wrapper}>
        <Input
            placeholder="Введите индекс"
            type={"number"}
            max={listArray.length - 1}
            min={0}
            onChange={onChangeValueInput}
            value={index}
            data-cy="input-index-list"
        />
        <Button
            extraClass={style.btnIndex}
            text={"Добавить по индексу"}
            onClick={onAddByIndex}
            disabled={
                addHead ||
                addTail ||
                removeHead ||
                removeTail ||
                removeByIndex ||
                (index !== 0 && input === "") ||
                !index ||
                listArray.length >= 8 ||
                +index > listArray.length - 1
            }
            isLoader={addByIndex}
            data-cy="btn-add-byIndex-list"
        />
        <Button
            extraClass={style.btnIndex}
            text={"Удалить по индексу"}
            onClick={onRemoveByIndex}
            disabled={
                addHead ||
                addTail ||
                removeHead ||
                removeTail ||
                addByIndex ||
                listArray.length <= 1 ||
                !index ||
                +index > listArray.length - 1
            }
            isLoader={removeByIndex}
            data-cy="btn-remove-byIndex-list"
        />
      </div>
      <div className={style.wrapperCircle}>
        {listArray.map((item, index) => (
            <div className={style.circle} key={index}>
              <Circle
                  key={index}
                  index={index}
                  letter={"" + item.item}
                  head={item.head ? "head" : ""}
                  tail={item.tail ? "tail" : ""}
                  state={item.state}
                  data-cy="test1"
              />
              {index < listArray.length - 1 && (
                  <ArrowIcon
                      fill={
                        item.state === ElementStates.Changing ? "#d252e1" : "#0032ff"
                      }
                  />
              )}

              {item.isAdded && item.newCircle?.item !== undefined && (
                  <Circle
                      isSmall={true}
                      state={ElementStates.Changing}
                      letter={"" + item.newCircle.item}
                      extraClass={style.circleAdd}
                  />
              )}

              {item.isRemoved && item.newCircle?.item !== null && (
                  <Circle
                      isSmall={true}
                      state={ElementStates.Changing}
                      letter={"" + item.newCircle?.item}
                      extraClass={style.circleRemove}
                  />
              )}
            </div>
        ))}
      </div>
    </SolutionLayout>
  );
};
