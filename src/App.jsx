import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./compornents/InputTodo";
import { InCompleteTodos } from "./compornents/InCompleteTodos";
import { CompleteTodos } from "./compornents/CompleteTodos";

export const App = () => {
  // 追加TODOの入力欄
  const [todoText, setTodoText] = useState("");

  // 未完了TODOの配列
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  // 完了TODOの配列
  const [completeTodos, setCompleteTodos] = useState([]);

  // 追加TODOの入力欄の値を変更する
  const onChangeTodoText = (event) => {
    return setTodoText(event.target.value);
  };

  // 追加ボタン押下時のイベント
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  // 削除ボタン押下時のイベント
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    /**
     * splice関数
     * 第一引数：何番目の要素
     * 第二引数:第一引数からいくつ削除するか
     */
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  // 完了ボタン押下時のイベント
  const onClickComplete = (index) => {
    const newInCompleteTodos = [...incompleteTodos];
    newInCompleteTodos.splice(index, 1);

    const newCompleteaTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newInCompleteTodos);
    setCompleteTodos(newCompleteaTodos);
  };

  // 戻すボタン押下時のイベント
  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    const newInCompleteTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newInCompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      {/* 未完了Todoが5個以上の場合messageを表示 */}
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>
          登録できるTodoは5個までです。消化してください。
        </p>
      )}
      <InCompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
