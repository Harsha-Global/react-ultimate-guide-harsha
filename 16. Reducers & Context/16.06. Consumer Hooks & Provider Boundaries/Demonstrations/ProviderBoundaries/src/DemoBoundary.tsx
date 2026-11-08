import { Component } from "react";
import type { ReactNode } from "react";
export class DemoBoundary extends Component<
  { children: ReactNode },
  { error: string | null }
> {
  state = { error: null as string | null };
  static getDerivedStateFromError(error: unknown) {
    return { error: error instanceof Error ? error.message : "Provider error" };
  }
  render() {
    return this.state.error ? (
      <p role="alert" className="lab-error">
        {this.state.error}
      </p>
    ) : (
      this.props.children
    );
  }
}
