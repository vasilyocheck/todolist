import { EditableSpan } from "common/components";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import React, { useCallback } from "react";
import { useActions } from "common/hooks";
import { TodolistDomainType, todolistsThunks } from "features/todolists-list/model/todolistsSlice";

type Props = {
  todolist: TodolistDomainType;
};

export const TodolistTitle = ({ todolist }: Props) => {
  const { entityStatus, title, id } = todolist;

  const { removeTodolist, changeTodolistTitle } = useActions(todolistsThunks);

  const removeTodolistCb = () => {
    removeTodolist(id);
  };

  const changeTodolistTitleCb = useCallback(
    (title: string) => {
      changeTodolistTitle({ id, title });
    },
    [id],
  );

  return (
    <h3>
      <EditableSpan value={title} onChange={changeTodolistTitleCb} />
      <IconButton onClick={removeTodolistCb} disabled={entityStatus === "loading"}>
        <Delete />
      </IconButton>
    </h3>
  );
};
