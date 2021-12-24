import React, {useCallback, useState, useEffect} from "react";

// function App() {
//   return (
//     <div>
//       <h1>Todo App</h1>
//     </div>
//   );
// }

const App = () => {
  //hooks
  const [newTodo, setNewTodo] = useState(''); // destructuring
  const [todos, setTodos] = useState([]); // destructuring
  const onNewTodoChange = useCallback((e) => { // useCallback to avoid infinite loop
    setNewTodo(e.target.value);
  }, []);

  const formSubmitted = useCallback((e) => {
    e.preventDefault();
    if (!newTodo.trim()) {
      return;
    }
    setTodos([
      {
        id: Date.now(),
        content: newTodo,
        done: false,
      },
      ...todos // spread operator
    ]);
    setNewTodo('');
  }, [newTodo, todos]); // dependency array

  useEffect(() => {
    console.log('todos', todos);
  }, [todos]); // dependency array : only run when todos changes

  const markAllDone = useCallback(() => {
    setTodos(
      todos.map(todo => ({
        ...todo, done: true
      })));
  }, [todos]);

  return (
    <div>
      <form onSubmit={formSubmitted}>
        <label htmlFor="newTodo"> Enter a todo: </label>
        <button onClick={markAllDone}>Mark all done</button>
        <br />
        <input 
        id="newTodo"
        type="text"
        placeholder="Enter your todo"
        // name="newTodo"
        value={newTodo} 
        onChange={onNewTodoChange}
        />
        <br />
        <button>Submit</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input 
            type="checkbox" 
            checked={todo.done}
            onChange={() => {
              setTodos(
                todos.map(t => {
                  if (t.id === todo.id) {
                    t.done = !t.done;
                  }
                  return t;
                })
              );
            }}
            checked={todo.done}
            />
            <span className={todo.done ? 'done' : ''}>{todo.content}</span>
            <button onClick={() => {
              setTodos(
                todos.filter(t => t.id !== todo.id)
              );
            }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;