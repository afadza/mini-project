import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import api from "../api/api";

const hooks = () => {
  const { fetchItems, addItem, updateItem, deleteItem } = api();
  const [filter, setFilter] = useState("");
  const [newItem, setNewItem] = useState("");
  const [editingItem, setEditingItem] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [page, setPage] = useState(1);
  const [perPage] = useState(5);

  const queryClient = useQueryClient();

  const { data: items = [] } = useQuery({
    queryKey: ["items", page, filter],
    queryFn: fetchItems,
  });

  const addMutation = useMutation({
    mutationFn: (name: string) => addItem(name),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["items"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) =>
      updateItem(id, name),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["items"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteItem(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["items"] }),
  });

  const handleAdd = () => {
    if (newItem) {
      addMutation.mutate(newItem);
      setNewItem("");
    }
  };

  const handleUpdate = () => {
    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, name: editingItem.name });
      setEditingItem(null);
    }
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const paginatedItems = items
    .slice((page - 1) * perPage, page * perPage)
    .filter((item: any) =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return {
    filter,
    setFilter,
    newItem,
    setNewItem,
    editingItem,
    setEditingItem,
    page,
    setPage,
    perPage,
    items,
    paginatedItems,
    handleAdd,
    handleUpdate,
    handleDelete,
    handleNextPage,
    handlePrevPage,
  };
};

export default hooks;
