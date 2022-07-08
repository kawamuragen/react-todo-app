import React, { useState } from "react";
import "./styles.css";

export const App = () => {
  // テキストボックスのstate
  const [todoText, setTodoText] = useState("");

  // 未完了TODOのstate
  const [incompleteTodos, setIncompleteTodos] = useState([
    "あああああ",
    "いいいいい"
  ]);

  // 完了TODOのstate
  const [completeTodos, setCompleteTodos] = useState(["うううう"]);

  // テキストボックスのonChange取得
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  // 追加ボタン
  const onClickAdd = () => {
    // 入力がからの場合はリスト追加しない
    // 一行で終わるIF分は、ブラケットがいらない
    if (todoText === "") return;
    // スプレッド構文
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    // フォームの内容を空にする
    setTodoText("");
  };

  // 削除ボタン
  const onClickDelete = (index) => {
    // alert(index);
    const newTodos = [...incompleteTodos];
    // 配列の要素を削除する
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  // 完了ボタン
  const onClickComplete = (index) => {
    // alert(index);
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  // 戻すボタン
  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  return (
    <>
      <div className="input-area">
        <input
          placeholder="TODOを入力"
          value={todoText}
          onChange={onChangeTodoText}
        />
        <button onClick={onClickAdd}>追加</button>
      </div>
      <div className="incomplete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {/* 引数indexをつけると、何番目の要素か判定できる */}
          {incompleteTodos.map((todo, index) => {
            return (
              // 仮想DOMの差分だけを操作するためにkeyをつけておく
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickComplete(index)}>完了</button>
                <button onClick={() => onClickDelete(index)}>削除</button>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="complete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {completeTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickBack(index)}>戻す</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
