# CSS Organization Structure

This document outlines the new CSS organization structure for the Supply Chain AI Agent frontend.

## Overview

The CSS has been reorganized into a modular, component-based structure with the following benefits:

- **Maintainability**: Each component has its own CSS file
- **Reusability**: Global variables and utilities are centralized
- **Scalability**: Easy to add new components without affecting existing styles
- **Performance**: Better tree-shaking and loading optimization

## File Structure

```
frontend/src/
├── styles/
│   ├── variables.css      # Global CSS variables and design tokens
│   ├── utilities.css      # Utility classes (spacing, typography, layout)
│   └── README.md         # This documentation
├── components/
│   ├── LoginForm.css     # LoginForm component styles
│   ├── SignUpForm.css    # SignUpForm component styles
│   ├── Sidebar.css       # Sidebar component styles
│   ├── Topbar.css        # Topbar component styles
│   ├── HeaderCards.css   # HeaderCards component styles
│   ├── RouteCards.css    # RouteCards component styles
│   ├── SupplierForm.css  # SupplierForm component styles (existing)
│   ├── DynamicMap.css    # DynamicMap component styles (existing)
│   ├── AuthPanel.css     # AuthPanel component styles (existing)
│   └── Dashboard/
│       ├── InventoryCard.css  # InventoryCard component styles
│       ├── RiskPanel.css      # RiskPanel component styles
│       └── dashboard.css      # Dashboard component styles (existing)
├── index.css             # Global base styles and imports
└── App.css              # App-specific styles (minimal)
```

## Design System

### CSS Variables (`variables.css`)

The design system is built around CSS custom properties (variables) that define:

- **Colors**: Primary palette, risk colors, text colors, backgrounds
- **Typography**: Font families, sizes, weights, line heights
- **Spacing**: Consistent spacing scale
- **Shadows**: Elevation system
- **Border Radius**: Consistent corner radius values
- **Transitions**: Animation timing
- **Z-Index**: Layering system

### Utility Classes (`utilities.css`)

Utility classes provide common styling patterns:

- **Spacing**: Margin and padding utilities
- **Typography**: Text sizing, colors, alignment
- **Layout**: Flexbox, Grid, positioning
- **Borders**: Border styles and radius
- **Backgrounds**: Background colors and effects
- **Shadows**: Elevation utilities
- **Responsive**: Mobile-first responsive utilities

## Component CSS Guidelines

### Naming Convention

- Use BEM-like naming: `.component-name__element--modifier`
- Prefix component classes with component name: `.login-form`, `.sidebar-nav`
- Use kebab-case for class names

### Structure

Each component CSS file should follow this structure:

```css
/* ComponentName Component Styles */

/* Main container */
.component-name {
  /* Base styles */
}

/* Header section */
.component-name-header {
  /* Header styles */
}

/* Content sections */
.component-name-content {
  /* Content styles */
}

/* Interactive elements */
.component-name-btn {
  /* Button styles */
}

.component-name-btn:hover {
  /* Hover states */
}

/* Variants */
.component-name--variant {
  /* Variant styles */
}

/* Responsive Design */
@media (max-width: 768px) {
  /* Tablet styles */
}

@media (max-width: 480px) {
  /* Mobile styles */
}
```

### Best Practices

1. **Use CSS Variables**: Always use design system variables instead of hardcoded values
2. **Mobile First**: Write responsive styles with mobile-first approach
3. **Consistent Spacing**: Use the spacing scale from variables
4. **Semantic Class Names**: Use descriptive, semantic class names
5. **Avoid Deep Nesting**: Keep CSS selectors shallow (max 3 levels)
6. **Group Related Styles**: Organize styles logically within the file

## Usage Examples

### Using CSS Variables

```css
.my-component {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  padding: var(--space-lg);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}
```

### Using Utility Classes

```jsx
<div className="flex items-center justify-between p-4 bg-primary rounded-lg shadow-md">
  <h2 className="text-xl font-bold text-primary">Title</h2>
  <button className="btn btn-primary">Action</button>
</div>
```

### Component CSS Import

```jsx
import React from 'react';
import './MyComponent.css';

const MyComponent = () => {
  return (
    <div className="my-component">
      <div className="my-component-header">
        <h1 className="my-component-title">Title</h1>
      </div>
    </div>
  );
};
```

## Migration Guide

### From Global CSS to Component CSS

1. **Identify Component Styles**: Extract styles specific to each component
2. **Create Component CSS File**: Create a new CSS file for the component
3. **Update Imports**: Update the component to import its CSS file
4. **Update Class Names**: Use component-specific class names
5. **Remove Global Styles**: Remove component styles from global CSS files

### Example Migration

**Before (Global CSS):**
```css
/* In Dashboard.css */
.dashboard-card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
}
```

**After (Component CSS):**
```css
/* In InventoryCard.css */
.inventory-card {
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
}
```

## Benefits

1. **Better Organization**: Styles are co-located with components
2. **Easier Maintenance**: Changes to component styles are isolated
3. **Improved Performance**: Better CSS tree-shaking and loading
4. **Consistent Design**: Centralized design system ensures consistency
5. **Developer Experience**: Easier to find and modify styles
6. **Scalability**: New components can be added without affecting existing styles

## Future Enhancements

- **CSS Modules**: Consider migrating to CSS Modules for better scoping
- **Styled Components**: Evaluate styled-components for dynamic styling
- **Design Tokens**: Expand the design system with more tokens
- **Theme Support**: Add support for multiple themes
- **CSS-in-JS**: Consider CSS-in-JS solutions for complex dynamic styling
