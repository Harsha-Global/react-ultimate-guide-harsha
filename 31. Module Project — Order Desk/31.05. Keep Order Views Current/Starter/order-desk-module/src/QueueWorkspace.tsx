import { NavLink, Navigate, Route, Routes } from "react-router";
import { OperationsQueue } from "./OperationsQueue";
import { LiveQueue } from "./LiveQueue";
import { DemoControls } from "./DemoControls";
export function QueueWorkspace() {
  return (
    <>
      <nav aria-label="Queue views">
        <NavLink to="/" end>Order queue</NavLink>{" "}
        <NavLink to="/live">Live view</NavLink>
      </nav>
      <DemoControls />
      <Routes>
        <Route path="/" element={<OperationsQueue />} />
        <Route path="/live" element={<LiveQueue />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
