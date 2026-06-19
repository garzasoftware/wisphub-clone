import React from 'react';

interface Props {
    size?: number;
    color?: string;
    fullScreen?: boolean;
}

const LoadingSpinner: React.FC<Props> = ({ size = 40, color = '#1890ff', fullScreen = false }) => {
    const spinner = (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                  <div style={{
                    width: size,
                    height: size,
                    border: `4px solid #f3f3f3`,
                    borderTop: `4px solid ${color}`,
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
          }} />
                  <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>style>
          </div>div>
        );
  
    if (fullScreen) {
          return (
                  <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(255,255,255,0.8)', zIndex: 9999 }}>
                    {spinner}
                  </div>div>
                );
    }
  
    return spinner;
};

export default LoadingSpinner;</style>
