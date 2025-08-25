import React from "react";
import { BarChart3 } from "lucide-react";

const Card = ({ title, action, children, className = "", icon }) => {
  return (
    <div className={`card ${className} animate-fade-in`}>
      {(title || action) && (
        <div className="card-title">
          {title && (
            <h3>
              {icon && <span>{icon}</span>}
              {title}
            </h3>
          )}
          {action}
        </div>
      )}
      {children}
    </div>
  );
};

const ColorPalette = () => {
  return (
    // <Card className="chart-container" title="Enhanced Color Palette" icon={<BarChart3 size={20} />}>
    //   <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
    //     <div style={{ 
    //       display: 'grid', 
    //       gridTemplateColumns: 'repeat(4, 1fr)', 
    //       gap: '1rem',
    //       marginBottom: '1rem'
    //     }}>
    //       <div style={{ 
    //         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    //         height: '60px',
    //         borderRadius: '8px',
    //         display: 'flex',
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //         color: 'white',
    //         fontWeight: '600',
    //         fontSize: '0.875rem'
    //       }}>
    //         Primary
    //       </div>
    //       <div style={{ 
    //         background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    //         height: '60px',
    //         borderRadius: '8px',
    //         display: 'flex',
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //         color: 'white',
    //         fontWeight: '600',
    //         fontSize: '0.875rem'
    //       }}>
    //         Warning
    //       </div>
    //       <div style={{ 
    //         background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    //         height: '60px',
    //         borderRadius: '8px',
    //         display: 'flex',
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //         color: 'white',
    //         fontWeight: '600',
    //         fontSize: '0.875rem'
    //       }}>
    //         Danger
    //       </div>
    //       <div style={{ 
    //         background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
    //         height: '60px',
    //         borderRadius: '8px',
    //         display: 'flex',
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //         color: 'white',
    //         fontWeight: '600',
    //         fontSize: '0.875rem'
    //       }}>
    //         Success
    //       </div>
    //     </div>
    //     <div style={{ 
    //       display: 'grid', 
    //       gridTemplateColumns: 'repeat(2, 1fr)', 
    //       gap: '1rem'
    //     }}>
    //       <div style={{ 
    //         background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    //         height: '40px',
    //         borderRadius: '6px',
    //         display: 'flex',
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //         color: 'white',
    //         fontWeight: '500',
    //         fontSize: '0.75rem'
    //       }}>
    //         Purple
    //       </div>
    //       <div style={{ 
    //         background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
    //         height: '40px',
    //         borderRadius: '6px',
    //         display: 'flex',
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //         color: 'white',
    //         fontWeight: '500',
    //         fontSize: '0.75rem'
    //       }}>
    //         Cyan
    //       </div>
    //     </div>
    //   </div>
    // </Card>
    <div></div>
    
  );
};

export default ColorPalette;
