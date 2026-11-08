import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
type BoundaryProps = {
    children: ReactNode;
    fallback: ReactNode;
};
type BoundaryState = {
    hasError: boolean;
};
export class ErrorBoundary extends Component<BoundaryProps, BoundaryState> {
    state: BoundaryState = { hasError: false };
    static getDerivedStateFromError(): BoundaryState {
        return { hasError: true };
    }
    componentDidCatch(error: unknown, info: ErrorInfo) {
        console.error("An optional store panel failed to render.", error, info.componentStack);
    }
    render() {
        if (this.state.hasError)
            return this.props.fallback;
        return this.props.children;
    }
}
