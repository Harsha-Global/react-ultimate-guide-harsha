import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export type Preview = { count: number; message: string };
type PreviewState = { status: "idle" | "pending" | "succeeded" | "failed"; result: Preview | null; error: string };
const initialState: PreviewState = { status: "idle", result: null, error: "" };
export const preparePacking = createAsyncThunk<Preview, string[], { rejectValue: string }>(
  "preview/prepare",
  async (ids, { rejectWithValue }) => {
    const response = await fetch("http://127.0.0.1:5188/api/packing-preview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    });
    const data: unknown = await response.json();
    if (!response.ok) {
      const message =
        typeof data === "object" && data !== null && "message" in data && typeof data.message === "string"
          ? data.message
          : "Could not prepare the preview.";
      return rejectWithValue(message);
    }
    if (typeof data !== "object" || data === null || !("count" in data) || typeof data.count !== "number" ||
      !("message" in data) || typeof data.message !== "string") throw new Error("Invalid preview response.");
    return { count: data.count, message: data.message };
  },
);
const previewSlice = createSlice({
  name: "preview",
  initialState,
  reducers: {
    previewCleared: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(preparePacking.pending, (state) => {
      state.status = "pending";
      state.result = null;
      state.error = "";
    });
    builder.addCase(preparePacking.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.result = action.payload;
    });
    builder.addCase(preparePacking.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload ?? "Preview unavailable. Check the API and retry.";
    });
  },
});
export const { previewCleared } = previewSlice.actions;
export default previewSlice.reducer;
