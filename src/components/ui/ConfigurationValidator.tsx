import React, { useState, useEffect } from 'react';
import { getConfigurationStatus } from '@/lib/game/config';
import styles from '@/styles/page.module.scss';

export const ConfigurationValidator: React.FC = () => {
  const [validationStatus, setValidationStatus] = useState<ReturnType<typeof getConfigurationStatus> | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Get validation status on component mount
    setValidationStatus(getConfigurationStatus());
  }, []);

  if (!validationStatus) {
    return null; // Don't render until validation is complete
  }

  const getStatusIcon = (isValid: boolean) => isValid ? '✅' : '❌';
  const getStatusColor = (isValid: boolean) => isValid ? '#4CAF50' : '#F44336';

  return (
    <div className={styles.card}>
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          cursor: 'pointer',
          marginBottom: isExpanded ? '1rem' : '0'
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 style={{ margin: 0, fontSize: '1rem' }}>
          Configuration Status
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.2rem' }}>
            {getStatusIcon(validationStatus.isValid)}
          </span>
          <span style={{ fontSize: '0.8rem', color: '#666' }}>
            {isExpanded ? '▼' : '▶'}
          </span>
        </div>
      </div>

      {isExpanded && (
        <div className={styles.section}>
          {/* Overall Status */}
          <div className={styles.row}>
            <span className={styles.tiny}>Status:</span>
            <span 
              className={styles.pill} 
              style={{ 
                background: getStatusColor(validationStatus.isValid),
                color: 'white',
                fontWeight: 'bold'
              }}
            >
              {validationStatus.isValid ? 'Valid' : 'Invalid'}
            </span>
          </div>

          {/* Error Count */}
          {validationStatus.errors.length > 0 && (
            <div className={styles.row}>
              <span className={styles.tiny}>Errors:</span>
              <span 
                className={styles.pill} 
                style={{ 
                  background: '#F44336',
                  color: 'white',
                  fontWeight: 'bold'
                }}
              >
                {validationStatus.errors.length}
              </span>
            </div>
          )}

          {/* Warning Count */}
          {validationStatus.warnings.length > 0 && (
            <div className={styles.row}>
              <span className={styles.tiny}>Warnings:</span>
              <span 
                className={styles.pill} 
                style={{ 
                  background: '#FF9800',
                  color: 'white',
                  fontWeight: 'bold'
                }}
              >
                {validationStatus.warnings.length}
              </span>
            </div>
          )}

          {/* Error Details */}
          {validationStatus.errors.length > 0 && (
            <div style={{ marginTop: '1rem' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#F44336' }}>
                Configuration Errors:
              </h4>
              {validationStatus.errors.map((error, index) => (
                <div 
                  key={index}
                  style={{
                    padding: '0.5rem',
                    margin: '0.25rem 0',
                    border: '1px solid #F44336',
                    borderRadius: '4px',
                    background: '#F4433610',
                    fontSize: '0.8rem'
                  }}
                >
                  <div style={{ fontWeight: 'bold', color: '#F44336' }}>
                    {error.category.toUpperCase()}: {error.message}
                  </div>
                  {error.details && (
                    <div style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: '#666' }}>
                      Details: {JSON.stringify(error.details)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Warning Details */}
          {validationStatus.warnings.length > 0 && (
            <div style={{ marginTop: '1rem' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#FF9800' }}>
                Configuration Warnings:
              </h4>
              {validationStatus.warnings.map((warning, index) => (
                <div 
                  key={index}
                  style={{
                    padding: '0.5rem',
                    margin: '0.25rem 0',
                    border: '1px solid #FF9800',
                    borderRadius: '4px',
                    background: '#FF980010',
                    fontSize: '0.8rem'
                  }}
                >
                  <div style={{ fontWeight: 'bold', color: '#FF9800' }}>
                    {warning.category.toUpperCase()}: {warning.message}
                  </div>
                  {warning.details && (
                    <div style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: '#666' }}>
                      Details: {JSON.stringify(warning.details)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Success Message */}
          {validationStatus.isValid && validationStatus.errors.length === 0 && validationStatus.warnings.length === 0 && (
            <div style={{ 
              marginTop: '1rem', 
              padding: '0.5rem', 
              background: '#4CAF5010', 
              border: '1px solid #4CAF50', 
              borderRadius: '4px',
              textAlign: 'center',
              color: '#4CAF50',
              fontWeight: 'bold'
            }}>
              ✅ All configuration checks passed successfully!
            </div>
          )}

          {/* Help Text */}
          <div style={{ 
            marginTop: '1rem', 
            padding: '0.5rem', 
            background: '#f5f5f5', 
            borderRadius: '4px',
            fontSize: '0.75rem',
            color: '#666'
          }}>
            <strong>Note:</strong> Configuration validation runs automatically on game startup. 
            Errors will prevent the game from running properly, while warnings indicate potential issues.
          </div>
        </div>
      )}
    </div>
  );
};
