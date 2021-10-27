import React from "react";
import qs from "qs";
import { useEffect, useState } from "react";
import TodoSearch from "./components/todoSearch";
import TodoTable from "./components/todoTable";
import { cancelObj, useDebounce, useMount } from "../../../utils";

// 请求地址
const Url = "http://localhost:3001";

export default function List() {
  const [users, setUsers]: any = useState([]);
  const [todolist, setTodoList]: any = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  useMount(() => {
    fetch(`${Url}/users`)
      .then(async (res) => {
        if (res.ok) {
          let data = await res.json();
          setUsers(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
  // 经过去抖处理的参数
  const debounceParam = useDebounce(param, 2000);
  // 去抖处理的
  useEffect(() => {
    fetch(`${Url}/projects?${qs.stringify(cancelObj(debounceParam))}`)
      .then(async (res) => {
        if (res.ok) {
          let data = await res.json();
          setTodoList(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [debounceParam]);

  return (
    <div>
      <TodoSearch users={users} param={param} setParam={setParam} />
      <TodoTable list={todolist} users={users} />
    </div>
  );
}
