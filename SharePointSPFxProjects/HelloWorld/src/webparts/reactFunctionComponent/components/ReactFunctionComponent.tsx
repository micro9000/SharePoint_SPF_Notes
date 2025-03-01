import * as React from "react";
import styles from "./ReactFunctionComponent.module.scss";
import type { IReactFunctionComponentProps } from "./IReactFunctionComponentProps";
import { useEffect, useState } from "react";

const ReactFunctionComponent = (props: IReactFunctionComponentProps) => {
  const { hasTeamsContext } = props;

  const [count, setCount] = useState(0);

  const incrementCount = () => {
    console.log("Increment button clicked");
    setCount(count + 1);
  };

  //componentDidMount
  useEffect(() => {
    console.log("componentDidMount called.");
  }, []);

  //componentDidUpdate
  useEffect(() => {
    console.log("componentDidUpdate called.");
  }, [count]);

  //componentWillUnmount
  useEffect(() => {
    return () => {
      console.log("componentWillUnmount called.");
    };
  }, [count]);

  return (
    <section
      className={`${styles.reactFunctionComponent} ${
        hasTeamsContext ? styles.teams : ""
      }`}
    >
      <div className={styles.welcome}>
        <h2>SPFx React Hook Example</h2>
        <p>Count: {count}</p>
        <button onClick={incrementCount}>Increment</button>
      </div>
    </section>
  );
};

export default ReactFunctionComponent;
