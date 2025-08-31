"use client";

import React, { Component, ReactNode } from 'react';
import { loadSave, hasSave } from '@/lib/game/saveSystem';
import { SAVE_KEY } from '@/lib/game/config';
import { logGameError, logErrorBoundaryOperation } from '@/lib/game/utils/errorLogger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  hasSaveData: boolean;
  isRecovering: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      hasError: false, 
      hasSaveData: hasSave(),
      isRecovering: false 
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { 
      hasError: true, 
      error,
      hasSaveData: hasSave(),
      isRecovering: false
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logGameError(error, errorInfo);
  }

  handleRecoverGame = () => {
    this.setState({ isRecovering: true });
    
    try {
      const savedState = loadSave();
      if (savedState) {
        // Store the recovered state in localStorage for the game to pick up
        localStorage.setItem(SAVE_KEY, JSON.stringify(savedState));
        logErrorBoundaryOperation('Game state recovery', true, { saveKey: SAVE_KEY });
        
        // Reload the page to restart with recovered state
        window.location.reload();
      } else {
        logErrorBoundaryOperation('Game state recovery', false, { reason: 'No save data found' });
        this.setState({ isRecovering: false });
      }
    } catch (recoveryError) {
      logErrorBoundaryOperation('Game state recovery', false, { 
        reason: 'Recovery failed', 
        error: recoveryError instanceof Error ? recoveryError.message : String(recoveryError) 
      });
      this.setState({ isRecovering: false });
    }
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
          <p>The game encountered an error. You can try to recover your progress or refresh the page.</p>
          
          {this.state.hasSaveData && (
            <div style={{ marginBottom: '15px' }}>
              <button 
                onClick={this.handleRecoverGame}
                disabled={this.state.isRecovering}
                style={{
                  background: '#28a745',
                  color: '#ffffff',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  cursor: this.state.isRecovering ? 'not-allowed' : 'pointer',
                  fontWeight: '600',
                  marginRight: '10px',
                  opacity: this.state.isRecovering ? 0.6 : 1
                }}
              >
                {this.state.isRecovering ? 'Recovering...' : 'Recover Game'}
              </button>
            </div>
          )}
          
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
          
          {this.state.hasSaveData && (
            <p style={{ fontSize: '14px', marginTop: '15px', opacity: 0.8 }}>
              💾 Save data detected - you can recover your progress
            </p>
          )}
        </div>
      );
    }

    return this.props.children;
  }
} 