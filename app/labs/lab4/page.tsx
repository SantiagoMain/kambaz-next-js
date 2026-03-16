"use client"
import Link from "next/link";
import { Provider } from "react-redux";
import store from "./store";
import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import UrlEncoding from "./url-encoding/UrlEncoding";

export default function Lab4() {
  function sayHello() {
    alert("Hello");
  }

  return (
    <Provider store={store}>
      <div id="wd-lab4">
        <h2>Lab 4</h2>
        <Link href="/labs/lab4/redux">Redux Examples</Link>
        <hr />
        <Link href="/labs/lab4/react-context">React Context Examples</Link>
        <hr />
        <Link href="/labs/lab4/zustand">Zustand Examples</Link>
        <ClickEvent />
        <PassingDataOnEvent />
        <PassingFunctions theFunction={sayHello} />
        <Counter />
        <BooleanStateVariables />
        <StringStateVariables />
        <DateStateVariable />
        <ObjectStateVariable />
        <ArrayStateVariable />
        <ParentStateComponent />
        <UrlEncoding />
      </div>
    </Provider>
  );
}