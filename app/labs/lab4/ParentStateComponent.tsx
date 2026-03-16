"use client"
import { useState } from "react";
import ChildStateComponent from "./ChildStateComponent";

export default function ParentStateComponent() {
  const [counter, setCounter] = useState(123);
  return (
    <div id="wd-parent-state">
      <h2>Sharing State Between Components</h2>
      <h3>Counter {counter}</h3>
      <ChildStateComponent
        counter={counter}
        setCounter={setCounter} />
      <hr/>
    </div>
  );
}