import React, { useState, useEffect } from 'react';
import './TodoList.css';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [debounceSearch, setDebounceSearch] = useState('');

  const fetchTodos = async () => {
    try {
      const response = await fetch('https://dummyjson.com/todos');
      const data = await response.json();
      setTodos(data?.todos);
    } catch (e) {
      console.error('Error fetching todos:', e);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearch(searchInput);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleDelete = id => {
    const result = todos.filter(item => item.id !== id);
    setTodos(result);
  };

  const addTodo = e => {
    e.preventDefault();

    if (inputValue.trim() === '') return;
    const obj = {
      id: Date.now(),
      todo: inputValue,
    };
    setTodos(prev => [obj, ...prev]);
    setInputValue('');
  };

  const setEditMode = (id, item) => {
    setEditId(id);
    setEditValue(item);
  };

  const saveTodo = () => {
    const result = todos?.map(item =>
      item.id === editId ? { ...item, todo: editValue } : item
    );
    setTodos(result);
    setEditId(null);
    setEditValue('');
  };

  const filteredTodos = todos.filter(item =>
    item.todo.toLowerCase().includes(debounceSearch.toLowerCase())
  );

  return (
    <div className="main-container">
      <h1>Todo List</h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Add Todo"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
      </form>

      <button onClick={addTodo}>Add Todo</button>

      <input
        type="text"
        placeholder="Search Todo"
        onChange={e => setSearchInput(e.target.value)}
        value={searchInput}
      />

      <div className="todo-container">
        {filteredTodos.length === 0 ? (
          <p>No match found!</p>
        ) : (
          filteredTodos?.map(item => (
            <div className="todo-results" key={item?.id}>
              <>
                {editId === item?.id ? (
                  <>
                    <input
                      type="text"
                      value={editValue}
                      onChange={e => setEditValue(e.target.value)}
                    />
                    <button onClick={saveTodo}>Save</button>
                  </>
                ) : (
                  <>
                    <span>{item?.todo}</span>

                    <button
                      className="edit-button"
                      onClick={() => setEditMode(item.id, item.todo)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-button"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
