"use client";

import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Game Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{
          padding: '20px',
          textAlign: 'center',
          color: '#e6e9ff',
          background: '#0f1532',
          border: '1px solid #21307a',
          borderRadius: '12px',
          margin: '20px'
        }}>
          <h3>Something went wrong</h3>
          <p>The game encountered an error. Please refresh the page to continue.</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              background: '#22307b',
              color: '#e6e9ff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Refresh Game
          </button>
        </div>
      );
    }

    return this.props.children;
  }
} 