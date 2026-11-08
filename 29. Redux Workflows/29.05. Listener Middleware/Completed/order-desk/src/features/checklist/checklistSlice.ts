import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
export type PackingTask = { id: string; text: string; done: boolean };
const tasksAdapter = createEntityAdapter<PackingTask>();
const initialState = tasksAdapter.setAll(tasksAdapter.getInitialState(), [
  { id: "labels", text: "Check shipping labels", done: false },
  { id: "supplies", text: "Prepare packing supplies", done: false },
]);
const checklistSlice = createSlice({
  name: "checklist",
  initialState,
  reducers: {
    taskAdded: tasksAdapter.addOne,
    taskRemoved: tasksAdapter.removeOne,
    taskToggled(state, action: PayloadAction<string>) {
      const task = state.entities[action.payload];
      if (task) tasksAdapter.updateOne(state, { id: task.id, changes: { done: !task.done } });
    },
  },
});
export const { taskAdded, taskRemoved, taskToggled } = checklistSlice.actions;
export default checklistSlice.reducer;
export const { selectAll: selectTasks } = tasksAdapter.getSelectors((state: RootState) => state.checklist);
