import { NavLink, Navigate, Route, Routes } from "react-router";
import { OrderQueue } from "./OrderQueue";
import { PagedQueue } from "./PagedQueue";
import { LiveQueue } from "./LiveQueue";
import { DemoControls } from "./DemoControls";
export function QueueWorkspace() {
  return (
    <>
      <nav aria-label="Queue views">
        <NavLink to="/" end>Search view</NavLink>{" "}
        <NavLink to="/pages">Page view</NavLink>{" "}
        <NavLink to="/feed">Load-more view</NavLink>{" "}
        <NavLink to="/live">Live view</NavLink>
      </nav>
      <DemoControls />
      <Routes>
        <Route path="/" element={<OrderQueue />} />
        <Route path="/pages" element={<PagedQueue key="pages" mode="pages" />} />
        <Route path="/feed" element={<PagedQueue key="feed" mode="feed" />} />
        <Route path="/live" element={<LiveQueue />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
