export const listKey = {
  Todos: "Todos",
}
export function setData(listKey,data) {
  return window.localStorage.setItem(listKey, JSON.stringify(data));
}

export function getData(listKey) {
  const todo = window.localStorage.getItem(listKey);
  return JSON.parse(todo);
}