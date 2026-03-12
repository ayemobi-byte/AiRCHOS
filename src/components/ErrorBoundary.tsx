import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 bg-zinc-950 text-white flex flex-col items-center justify-center p-6 z-50 font-sans">
          <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
          <h1 className="text-xl font-bold mb-2">System Fault Detected</h1>
          <p className="text-zinc-400 text-center text-sm mb-6">
            The Integrative Shadow Assistant intercepted a critical error.
          </p>
          <div className="bg-black border border-red-900/50 rounded-lg p-4 w-full max-w-sm overflow-auto max-h-48">
            <pre className="text-xs text-red-400 font-mono whitespace-pre-wrap">
              {this.state.error?.message || 'Unknown error'}
            </pre>
          </div>
          <button
            className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-full text-sm font-medium transition-colors"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Acknowledge & Restart
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
