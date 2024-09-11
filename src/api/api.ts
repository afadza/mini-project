import axios from "axios";

export const api = () => {
  const fetchItems = async ({
    queryKey,
  }: {
    queryKey: [string, number, string];
  }) => {
    const [] = queryKey;
    const response = await axios.get(`http://localhost:3001/items`);
    return response.data;
  };

  const addItem = async (name: string) => {
    const response = await axios.post("http://localhost:3001/items", { name });
    return response.data;
  };

  const updateItem = async (id: number, name: string) => {
    const response = await axios.patch(`http://localhost:3001/items/${id}`, {
      name,
    });
    return response.data;
  };

  const deleteItem = async (id: number) => {
    await axios.delete(`http://localhost:3001/items/${id}`);
  };

  return { fetchItems, addItem, updateItem, deleteItem };
};

export default api;
