type Draft = { kind: "individual" } | { kind: "group"; groupName: string; attendees: readonly string[] };
type Action = { type: "replaced"; draft: Draft } | { type: "groupRenamed"; groupName: string };
function assertNever(value: never): never { throw new Error("Unhandled action."); }
function bookingReducer(state: Draft, action: Action): Draft {
  switch (action.type) {
    case "replaced": return action.draft;
    case "groupRenamed":
      return state.kind === "group" ? { ...state, groupName: action.groupName } : state;
    default: return assertNever(action);
  }
}
