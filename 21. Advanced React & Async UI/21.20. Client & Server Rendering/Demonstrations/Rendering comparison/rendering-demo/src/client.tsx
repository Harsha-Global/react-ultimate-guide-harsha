import { createRoot, hydrateRoot } from "react-dom/client";
import { Example } from "./Example";
import "./index.css";
const root = document.getElementById("root")!;
if (root.dataset.mode === "server") {
  hydrateRoot(root, <Example />);
} else {
  createRoot(root).render(<Example />);
}
