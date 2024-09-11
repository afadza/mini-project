import React from "react";
import "./App.css";
import hooks from "./hooks/hooks";
const App: React.FC = () => {
  const {
    filter,
    setFilter,
    newItem,
    setNewItem,
    editingItem,
    setEditingItem,
    page,
    perPage,
    paginatedItems,
    handleAdd,
    handleUpdate,
    handleDelete,
    handleNextPage,
    handlePrevPage,
  } = hooks();

  return (
    <div className="container">
      <h1 className="heading">Items</h1>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter items"
        className="input"
      />
      <br />
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="New item"
        className="input"
      />
      <button onClick={handleAdd} className="button">
        Add Item
      </button>
      <br />
      {editingItem && (
        <div className="editSection">
          <input
            type="text"
            value={editingItem.name}
            onChange={(e) =>
              setEditingItem({ ...editingItem, name: e.target.value })
            }
            placeholder="Edit item"
            className="input"
          />
          <button onClick={handleUpdate} className="button">
            Update Item
          </button>
        </div>
      )}
      <ul className="list">
        {paginatedItems.map((item: { id: number; name: string }) => (
          <li key={item.id} className="listItem">
            {item.name}
            <button onClick={() => setEditingItem(item)} className="button">
              Edit
            </button>
            <button onClick={() => handleDelete(item.id)} className="button">
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={handlePrevPage}
          className="button"
        >
          Previous
        </button>
        <button
          disabled={paginatedItems.length < perPage}
          onClick={handleNextPage}
          className="button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
