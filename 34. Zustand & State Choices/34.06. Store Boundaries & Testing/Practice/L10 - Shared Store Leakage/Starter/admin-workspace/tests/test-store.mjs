import { createWorkspaceStore } from "../src/workspaceStore.ts";
import { memoryStorage } from "./memory-storage.mjs";
const shared = createWorkspaceStore(memoryStorage());
export function makeTestStore() { return shared; }
