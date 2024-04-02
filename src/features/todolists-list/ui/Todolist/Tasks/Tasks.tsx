import { Task } from "features/todolists-list/ui/Todolist/Tasks/Task/Task";
import React from "react";
import { TaskStatuses } from "common/enums";
import { TodolistDomainType } from "features/todolists-list/model/todolistsSlice";
import { TaskType } from "features/todolists-list/api/tasks/tasksApi.types";

type Props = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};

export const Tasks = ({ tasks, todolist }: Props) => {
  const { id, filter } = todolist;

  let tasksForTodolist = tasks;

  if (filter === "active") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }

  return (
    <div>
      {tasksForTodolist.map((t) => (
        <Task key={t.id} task={t} todolistId={id} />
      ))}
    </div>
  );
};
