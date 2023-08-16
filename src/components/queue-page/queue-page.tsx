import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

import styles from './queue-page.module.css';
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Queue } from "./class";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface ICircle {
  value: string;
  head: boolean;
  tail: boolean;
  state: ElementStates;
}

export const QueuePage: React.FC = () => {

  const [input, setInput] = useState<string>('');
  const [queues, setQueues] = useState<ICircle[]>([]);
  const [isQueue, setIsQueue] = useState<boolean>(true);

  const maxQueueLength = 7;

  const queue = useMemo(() => new Queue<string>(maxQueueLength), []);

  const initialItem = {
    value: '',
    head: false,
    tail: false,
    state: ElementStates.Default,
  };

  const getInitial = () => {
    let i = 0;
    const array = [];

    while (i < maxQueueLength) {
      array.push(initialItem);
      i += 1;
    }
    return array;
  };

  useEffect(() => {
    const initialArray = getInitial();
    setQueues([...initialArray]);
  }, []);

  useEffect(() => {
    setIsQueue(queue.isEmpty);
  }, [queues]);

  const onChangeValueInput = (evt: ChangeEvent<HTMLInputElement>) => {
    setInput(evt.target.value);
  };

  const onEnqueue = async () => {
    const tailIndex = !queue.isEmpty() ? queue.getTail().index : 0;

    if (input && (tailIndex + 1 !== maxQueueLength)) {
      queue.enqueue(input);

      const head = queue.getHead();
      const tail = queue.getTail();

      queues[head.index] = {
        ...initialItem,
        head: true,
        value: head.value || '',
      };

      if (tail.index) queues[tail.index - 1].tail = false;

      queues[tail.index] = {
        ...queues[tail.index],
        tail: true,
        value: tail.value || '',
        state: ElementStates.Changing,
      };
      setInput('');
      setQueues([...queues]);
      await sleep(SHORT_DELAY_IN_MS);
      queues[tail.index] = {
        ...queues[tail.index],
        state: ElementStates.Default,
      };
      setQueues([...queues]);
    }
  };

  const onClear = () => {
    queue.clear();
    const initialArray = getInitial();
    setQueues([...initialArray]);
  };

  const onDequeue = async () => {
    const tail = queue.getTail();
    const head = queue.getHead();

    if (head.index !== tail.index) {
      queue.dequeue();
      const actualHead = queue.getHead();

      queues[actualHead.index - 1] = {
        ...queues[actualHead.index - 1],
        state: ElementStates.Changing,
      };
      setQueues([...queues]);
      await sleep(SHORT_DELAY_IN_MS);

      queues[actualHead.index - 1] = {
        ...queues[actualHead.index - 1],
        state: ElementStates.Default,
      };

      if (actualHead.index) {
        queues[actualHead.index - 1] = initialItem;
      }

      queues[actualHead.index].value = actualHead.value || '';
      queues[actualHead.index].head = true;

      setQueues([...queues]);
    } else {
      onClear();
    }
  };

  const isQueueEnded = !queue.isEmpty() && queue.getTail().index === maxQueueLength - 1;

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.wrapper}>
        <form className={styles.wrapperForm}>
          <Input isLimitText maxLength={4} onChange={onChangeValueInput} value={input} placeholder="Введите текст" />
          <Button disabled={!input || isQueueEnded} onClick={onEnqueue} type="button" text="Добавить" />
          <Button disabled={isQueue} onClick={onDequeue} type="button" text="Удалить" />
          <Button disabled={isQueue} onClick={onClear} type="button" text="Очистить" />
        </form>
        <ul className={styles.wrapperCircle}>
          {queues.map((item, index) => (
              <li key={index}>
                <Circle
                    state={item ? item.state : ElementStates.Default}
                    letter={item ? item.value : ''}
                    index={index}
                    tail={item.tail ? 'tail' : ''}
                    head={item.head ? 'head' : ''}
                />
              </li>
          ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
