import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: () => fetch(`${BASE_URL}/todos?_limit=20`).then((r) => r.json()),
  });
}

export function useTask(id) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["tasks", String(id)],
    queryFn: async () => {
      const tasks = queryClient.getQueryData(["tasks"]);
      const cachedTask = tasks?.find((t) => t.id === Number(id));
      if (cachedTask) return cachedTask;

      return fetch(`${BASE_URL}/todos/${id}`).then((r) => r.json());
    },
    enabled: !!id,
  });
}

export function useTeam() {
  return useQuery({
    queryKey: ["team"],
    queryFn: () => fetch(`${BASE_URL}/users`).then((r) => r.json()),
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, completed }) =>
      fetch(`${BASE_URL}/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed }),
      }).then((r) => r.json()),

    onMutate: async ({ id, completed }) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      await queryClient.cancelQueries({ queryKey: ["tasks", String(id)] });

      const previousTasks = queryClient.getQueryData(["tasks"]);

      queryClient.setQueryData(["tasks"], (old) =>
        old ? old.map((t) => (t.id === id ? { ...t, completed } : t)) : []
      );

      queryClient.setQueryData(["tasks", String(id)], (old) =>
        old ? { ...old, completed } : { id, completed }
      );

      return { previousTasks };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["tasks"], context.previousTasks);
    },
  });
}
