import React, { useState, useEffect } from 'react';

export default function TodoTest() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [value, setValue] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState('');
  const [editValue, setEditValue] = useState('');

  // Fetch todos from API
  useEffect(() => {
    fetch('https://dummyjson.com/todos')
      .then(res => res.json())
      .then(data => {
        setItems(data.todos); // API returns { todos: [...] }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching todos:', err);
        setLoading(false);
      });
  }, []);

  // Delete todo by id
  const handleDelete = id => {
    setItems(items.filter(data => data.id !== id));
  };

  const handleEdit = (id, item) => {
    setEditId(id);
    setIsEdit(!isEdit);
    setEditValue(item);
  };

  const saveEditField = id => {
    let data = items.map(item =>
      item.id === id ? { ...item, todo: editValue } : item
    );
    console.log(data);
    setItems(data);
    setIsEdit(!isEdit);
  };

  // Filter items based on search
  const filteredItems = items.filter(item =>
    item?.todo?.toLowerCase().includes(search.toLowerCase())
  );

  const addTodo = () => {
    if (value.trim() === '') return;

    const data = {
      id: Date.now(),
      todo: value.trim(),
      completed: false,
    };

    setItems(prev => [...prev, data]);
    setValue('');
  };

  if (loading) return <p>Loading todos...</p>;

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h1>Todo List</h1>

      {/* Search Input */}
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Add todos"
          style={{
            width: '81%',
            padding: 8,
            borderRadius: 4,
            border: '1px solid #ccc',
            marginBottom: '10px',
            marginRight: '10px',
          }}
        />
        <button onClick={addTodo}>Add Todo</button>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search todos..."
          style={{
            width: '97%',
            padding: 8,
            borderRadius: 4,
            border: '1px solid #ccc',
          }}
        />
      </div>

      {filteredItems.length === 0 ? (
        <p>No matching items!</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredItems.map(data => (
            <li
              key={data.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 15px',
                marginBottom: 10,
                border: '1px solid #ccc',
                borderRadius: 5,
                backgroundColor: data.completed ? '#d4edda' : '#f8d7da',
              }}
            >
              {editId === data.id && isEdit ? (
                <>
                  <input
                    type="text"
                    value={editValue}
                    onChange={e => setEditValue(e.target.value)}
                    placeholder="Edit todos"
                    style={{
                      width: '81%',
                      padding: 8,
                      borderRadius: 4,
                      border: '1px solid #ccc',
                      // marginBottom: "10px",
                      // marginRight: "10px",
                    }}
                  />

                  <button
                    onClick={() => saveEditField(data.id)}
                    style={{
                      padding: '5px 10px',
                      border: 'none',
                      borderRadius: 3,
                      cursor: 'pointer',
                      backgroundColor: 'green',
                      color: 'white',
                    }}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span>{data.todo}</span>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <button
                      onClick={() => handleEdit(data.id, data.todo)}
                      style={{
                        padding: '5px 10px',
                        border: 'none',
                        borderRadius: 3,
                        cursor: 'pointer',
                        backgroundColor: 'cyan',
                        color: 'white',
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(data.id)}
                      style={{
                        padding: '5px 10px',
                        border: 'none',
                        borderRadius: 3,
                        cursor: 'pointer',
                        backgroundColor: '#ff4d4f',
                        color: 'white',
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
