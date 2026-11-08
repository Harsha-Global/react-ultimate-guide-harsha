import { BulkPriority } from "./BulkPriority";
import { Navigate, Route, Routes } from "react-router";
import { OperationsQueue } from "./OperationsQueue";
import { LiveUpdates } from "./LiveUpdates";
import { DemoControls } from "./DemoControls";
export function QueueWorkspace() {
  return (
    <>
      <LiveUpdates />
      <DemoControls />
      <BulkPriority />
      <Routes>
        <Route path="/" element={<OperationsQueue />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
