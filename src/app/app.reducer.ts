import {
  createSlice,
  isAnyOf,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
  UnknownAction,
} from "@reduxjs/toolkit";
import { todolistsThunks } from "features/todolists-list/model/todolistsSlice";
import { tasksThunks } from "features/todolists-list/model/tasksSlice";
import { authThunks } from "features/auth/model/auth.slice";

const initialState = {
  status: "idle" as RequestStatusType,
  error: null as string | null,
  isInitialized: false,
};

export type AppInitialStateType = typeof initialState;
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status;
    },
    setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.status = "loading";
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = "succeeded";
      })
      .addMatcher(isRejected, (state, action: any) => {
        debugger;
        state.status = "failed";
        if (action.payload) {
          if (
            action.type === todolistsThunks.addTodolist.rejected.type ||
            action.type === tasksThunks.addTask.rejected.type ||
            action.type === authThunks.initializeApp.rejected.type
          ) {
            return;
          }

          state.error = action.payload.messages[0];
        } else {
          state.error = action.error.message ? action.error.message : "Some error occurred";
        }
      })

      .addMatcher(isAnyOf(authThunks.initializeApp.fulfilled, authThunks.initializeApp.rejected), (state) => {
        state.isInitialized = true;
      });
    // .addDefaultCase((state, action) => {
    //   console.log(action.type);
    // });
  },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
