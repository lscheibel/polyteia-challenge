import React from 'react';

export interface FallbackArgs {
  error: Error;
  reset: () => void;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback: React.ReactNode | ((args: FallbackArgs) => React.ReactNode);
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  error: Error | null;
  caughtErrorCount: number;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null, caughtErrorCount: 0 };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.error != null) {
      if (typeof this.props.fallback === 'function') {
        return this.props.fallback({
          error: this.state.error,
          reset: () => this.setState({ error: null }),
        });
      }

      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
