import React, { Component, ErrorInfo } from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode; // Custom fallback UI
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state to display fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return (
        this.props.fallback || (
          <div style={{ padding: "20px", textAlign: "center" }}>
            <h1>Something went wrong.</h1>
            <p>We’re sorry for the inconvenience.</p>
            <button onClick={() => window.location.reload()}>Reload</button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
