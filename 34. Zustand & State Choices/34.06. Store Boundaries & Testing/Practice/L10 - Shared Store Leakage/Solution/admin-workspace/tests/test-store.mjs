import { createWorkspaceStore } from "../src/workspaceStore.ts";
import { memoryStorage } from "./memory-storage.mjs";
export function makeTestStore() { return createWorkspaceStore(memoryStorage()); }
