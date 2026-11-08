import { Component } from "react";
import { reportFailure } from "./reportFailure";
import type { ReactNode } from "react";

type BoundaryProps = { children: ReactNode; fallback: ReactNode };
type BoundaryState = { hasError: boolean };
export class ErrorBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { hasError: false };
  static getDerivedStateFromError(): BoundaryState {
    return { hasError: true };
  }
  componentDidCatch() {
    reportFailure("react-render");
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}
