import React, { useState } from 'react';
import CircularProgress from './CircularProgress';
import './DesignSystemDemo.css';

const DesignSystemDemo = () => {
  const [progressValue, setProgressValue] = useState(75);

  return (
    <div className="design-system-demo">
      <div className="container">
        <header className="demo-header">
          <h1>Supply Chain AI - Design System</h1>
          <p>A comprehensive design system with modern components and responsive design</p>
        </header>

        {/* Color Palette Section */}
        <section className="demo-section">
          <h2>Color Palette</h2>
          <div className="color-grid">
            <div className="color-group">
              <h3>Primary Colors</h3>
              <div className="color-swatches">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(shade => (
                  <div key={shade} className="color-swatch" style={{ backgroundColor: `var(--primary-${shade})` }}>
                    <span className="color-label">{shade}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="color-group">
              <h3>Secondary Colors</h3>
              <div className="color-swatches">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(shade => (
                  <div key={shade} className="color-swatch" style={{ backgroundColor: `var(--secondary-${shade})` }}>
                    <span className="color-label">{shade}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="color-group">
              <h3>Success Colors</h3>
              <div className="color-swatches">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(shade => (
                  <div key={shade} className="color-swatch" style={{ backgroundColor: `var(--success-${shade})` }}>
                    <span className="color-label">{shade}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="color-group">
              <h3>Warning Colors</h3>
              <div className="color-swatches">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(shade => (
                  <div key={shade} className="color-swatch" style={{ backgroundColor: `var(--warning-${shade})` }}>
                    <span className="color-label">{shade}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="color-group">
              <h3>Error Colors</h3>
              <div className="color-swatches">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(shade => (
                  <div key={shade} className="color-swatch" style={{ backgroundColor: `var(--error-${shade})` }}>
                    <span className="color-label">{shade}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Buttons Section */}
        <section className="demo-section">
          <h2>Buttons</h2>
          <div className="component-grid">
            <div className="component-group">
              <h3>Button Variants</h3>
              <div className="button-showcase">
                <button className="btn btn-primary">Primary Button</button>
                <button className="btn btn-secondary">Secondary Button</button>
                <button className="btn btn-ghost">Ghost Button</button>
                <button className="btn btn-outline">Outline Button</button>
              </div>
            </div>

            <div className="component-group">
              <h3>Button Sizes</h3>
              <div className="button-showcase">
                <button className="btn btn-primary btn-sm">Small</button>
                <button className="btn btn-primary">Default</button>
                <button className="btn btn-primary btn-lg">Large</button>
                <button className="btn btn-primary btn-xl">Extra Large</button>
              </div>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section className="demo-section">
          <h2>Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Basic Card</h3>
                <p className="card-subtitle">A simple card component</p>
              </div>
              <div className="card-content">
                <p>This is a basic card with header, content, and footer sections.</p>
              </div>
              <div className="card-footer">
                <button className="btn btn-primary btn-sm">Action</button>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <h3 className="card-title">Content Only</h3>
                <p>This card only has content without header or footer.</p>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Interactive Card</h3>
              </div>
              <div className="card-content">
                <p>This card has hover effects and animations.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Progress Bars Section */}
        <section className="demo-section">
          <h2>Progress Bars - Professional Colors</h2>
          <div className="component-grid">
            <div className="component-group">
              <h3>Linear Progress with Gradients</h3>
              <div className="progress-showcase">
                <div className="progress">
                  <div className="progress-bar" style={{ width: `${progressValue}%` }}></div>
                </div>
                <p className="progress-label">Primary Gradient: {progressValue}%</p>
                
                <div className="progress progress-success">
                  <div className="progress-bar" style={{ width: '85%' }}></div>
                </div>
                <p className="progress-label">Success Gradient: 85%</p>
                
                <div className="progress progress-warning">
                  <div className="progress-bar" style={{ width: '60%' }}></div>
                </div>
                <p className="progress-label">Warning Gradient: 60%</p>
                
                <div className="progress progress-error">
                  <div className="progress-bar" style={{ width: '30%' }}></div>
                </div>
                <p className="progress-label">Error Gradient: 30%</p>
              </div>
            </div>

            <div className="component-group">
              <h3>Circular Progress with Glow Effects</h3>
              <div className="circular-progress-showcase">
                <div className="progress-item">
                  <CircularProgress value={75} variant="primary" size={100} />
                  <span>Primary (75%)</span>
                </div>
                <div className="progress-item">
                  <CircularProgress value={85} variant="success" size={100} />
                  <span>Success (85%)</span>
                </div>
                <div className="progress-item">
                  <CircularProgress value={60} variant="warning" size={100} />
                  <span>Warning (60%)</span>
                </div>
                <div className="progress-item">
                  <CircularProgress value={30} variant="error" size={100} />
                  <span>Error (30%)</span>
                </div>
              </div>
            </div>

            <div className="component-group">
              <h3>Progress Bar Sizes</h3>
              <div className="progress-showcase">
                <div className="progress" style={{ height: '8px' }}>
                  <div className="progress-bar" style={{ width: '70%' }}></div>
                </div>
                <p className="progress-label">Small (8px)</p>
                
                <div className="progress" style={{ height: '12px' }}>
                  <div className="progress-bar" style={{ width: '70%' }}></div>
                </div>
                <p className="progress-label">Medium (12px)</p>
                
                <div className="progress" style={{ height: '16px' }}>
                  <div className="progress-bar" style={{ width: '70%' }}></div>
                </div>
                <p className="progress-label">Large (16px)</p>
              </div>
            </div>

            <div className="component-group">
              <h3>Circular Progress Sizes</h3>
              <div className="circular-progress-showcase">
                <div className="progress-item">
                  <CircularProgress value={65} variant="primary" size={60} />
                  <span>Small</span>
                </div>
                <div className="progress-item">
                  <CircularProgress value={65} variant="primary" size={80} />
                  <span>Medium</span>
                </div>
                <div className="progress-item">
                  <CircularProgress value={65} variant="primary" size={120} />
                  <span>Large</span>
                </div>
                <div className="progress-item">
                  <CircularProgress value={65} variant="primary" size={160} />
                  <span>Extra Large</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Badges Section */}
        <section className="demo-section">
          <h2>Badges</h2>
          <div className="badge-showcase">
            <span className="badge badge-primary">Primary</span>
            <span className="badge badge-secondary">Secondary</span>
            <span className="badge badge-success">Success</span>
            <span className="badge badge-warning">Warning</span>
            <span className="badge badge-error">Error</span>
            <span className="badge badge-neutral">Neutral</span>
          </div>
        </section>

        {/* Alerts Section */}
        <section className="demo-section">
          <h2>Alerts</h2>
          <div className="alert-showcase">
            <div className="alert alert-info">
              <div className="alert-icon">ℹ️</div>
              <div className="alert-content">
                <div className="alert-title">Information</div>
                <div className="alert-message">This is an informational alert message.</div>
              </div>
            </div>

            <div className="alert alert-success">
              <div className="alert-icon">✅</div>
              <div className="alert-content">
                <div className="alert-title">Success</div>
                <div className="alert-message">Operation completed successfully.</div>
              </div>
            </div>

            <div className="alert alert-warning">
              <div className="alert-icon">⚠️</div>
              <div className="alert-content">
                <div className="alert-title">Warning</div>
                <div className="alert-message">Please review your input before proceeding.</div>
              </div>
            </div>

            <div className="alert alert-error">
              <div className="alert-icon">❌</div>
              <div className="alert-content">
                <div className="alert-title">Error</div>
                <div className="alert-message">Something went wrong. Please try again.</div>
              </div>
            </div>
          </div>
        </section>

        {/* Form Elements Section */}
        <section className="demo-section">
          <h2>Form Elements</h2>
          <div className="form-showcase">
            <div className="form-group">
              <label htmlFor="input-demo">Input Field</label>
              <input type="text" id="input-demo" className="input" placeholder="Enter text here..." />
            </div>

            <div className="form-group">
              <label htmlFor="input-success">Success Input</label>
              <input type="text" id="input-success" className="input input-success" value="Valid input" />
            </div>

            <div className="form-group">
              <label htmlFor="input-error">Error Input</label>
              <input type="text" id="input-error" className="input input-error" value="Invalid input" />
            </div>

            <div className="form-group">
              <label htmlFor="textarea-demo">Textarea</label>
              <textarea id="textarea-demo" className="input" rows="4" placeholder="Enter longer text here..."></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="select-demo">Select</label>
              <select id="select-demo" className="input">
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
          </div>
        </section>

        {/* Loading States Section */}
        <section className="demo-section">
          <h2>Loading States</h2>
          <div className="loading-showcase">
            <div className="loading-group">
              <h3>Spinners</h3>
              <div className="spinner-showcase">
                <div className="spinner spinner-sm"></div>
                <div className="spinner spinner-md"></div>
                <div className="spinner spinner-lg"></div>
                <div className="spinner spinner-xl"></div>
              </div>
            </div>

            <div className="loading-group">
              <h3>Skeleton Loading</h3>
              <div className="skeleton-showcase">
                <div className="skeleton skeleton-avatar"></div>
                <div className="skeleton-content">
                  <div className="skeleton skeleton-text"></div>
                  <div className="skeleton skeleton-text"></div>
                  <div className="skeleton skeleton-text"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Responsive Grid Section */}
        <section className="demo-section">
          <h2>Responsive Grid</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="grid-item">
                <div className="grid-item-content">
                  <h4>Grid Item {i + 1}</h4>
                  <p>This demonstrates responsive grid behavior.</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DesignSystemDemo;
