# Supply Chain AI - Design System

A comprehensive, modern design system built with CSS custom properties, featuring a cohesive color palette, responsive components, and accessibility-first design principles.

## Table of Contents

1. [Color Palette](#color-palette)
2. [Typography](#typography)
3. [Spacing](#spacing)
4. [Components](#components)
5. [Responsive Design](#responsive-design)
6. [Accessibility](#accessibility)
7. [Dark Mode](#dark-mode)
8. [CSS Custom Properties](#css-custom-properties)
9. [Usage Guidelines](#usage-guidelines)
10. [Customization](#customization)
11. [Best Practices](#best-practices)
12. [Future Enhancements](#future-enhancements)

## Color Palette

### Primary Colors
- **Primary 50-950**: Blue-based brand colors
- **Secondary 50-950**: Purple-based accent colors
- **Ocean 50-950**: Teal-based supporting colors

### Semantic Colors
- **Success**: Green shades for positive actions
- **Warning**: Yellow/Orange shades for caution
- **Error**: Red shades for errors and destructive actions
- **Neutral**: Gray shades for text and backgrounds

### Usage Examples
```css
/* Primary brand elements */
.btn-primary {
  background: var(--primary-500);
  color: white;
}

/* Success states */
.alert-success {
  background: var(--success-50);
  border-color: var(--success-200);
  color: var(--success-700);
}

/* Error states */
.alert-error {
  background: var(--error-50);
  border-color: var(--error-200);
  color: var(--error-700);
}
```

## Typography

### Font Families
- **Sans**: `Inter, system-ui, -apple-system, sans-serif`
- **Mono**: `JetBrains Mono, Consolas, monospace`
- **Display**: `Poppins, sans-serif`

### Font Sizes
- **xs**: 0.75rem (12px)
- **sm**: 0.875rem (14px)
- **base**: 1rem (16px)
- **lg**: 1.125rem (18px)
- **xl**: 1.25rem (20px)
- **2xl**: 1.5rem (24px)
- **3xl**: 1.875rem (30px)
- **4xl**: 2.25rem (36px)
- **5xl**: 3rem (48px)

### Font Weights
- **thin**: 100
- **light**: 300
- **normal**: 400
- **medium**: 500
- **semibold**: 600
- **bold**: 700
- **extrabold**: 800

## Spacing

### Scale
- **0**: 0px
- **1**: 0.25rem (4px)
- **2**: 0.5rem (8px)
- **3**: 0.75rem (12px)
- **4**: 1rem (16px)
- **5**: 1.25rem (20px)
- **6**: 1.5rem (24px)
- **8**: 2rem (32px)
- **10**: 2.5rem (40px)
- **12**: 3rem (48px)
- **16**: 4rem (64px)
- **20**: 5rem (80px)
- **24**: 6rem (96px)

## Components

### Buttons

#### Variants
- **Primary**: Brand color with gradient
- **Secondary**: Outlined style
- **Ghost**: Transparent background
- **Danger**: Red color for destructive actions

#### Sizes
- **sm**: Small (32px height)
- **md**: Medium (40px height)
- **lg**: Large (48px height)

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-lg);
  font-weight: var(--font-semibold);
  transition: all var(--transition-fast);
}

.btn--primary {
  background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
  color: white;
  border: none;
}
```

### Cards

#### Structure
- **Header**: Title and actions
- **Content**: Main content area
- **Footer**: Actions and metadata

```css
.card {
  background: var(--bg-primary);
  border: 1px solid var(--border-200);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.card__header {
  padding: var(--space-6);
  border-bottom: 1px solid var(--border-200);
}

.card__content {
  padding: var(--space-6);
}

.card__footer {
  padding: var(--space-6);
  border-top: 1px solid var(--border-200);
  background: var(--bg-secondary);
}
```

### Progress Bars

#### Linear Progress
- **Variants**: Primary, Success, Warning, Error
- **Sizes**: sm, md, lg
- **Animations**: Shimmer effect

#### Circular Progress
- **Sizes**: sm (80px), md (120px), lg (160px), xl (200px), 2xl (240px)
- **Variants**: Primary, Success, Warning, Error
- **Animations**: Glow effect, smooth transitions

```jsx
<CircularProgress 
  value={75} 
  max={100} 
  size={120} 
  variant="success" 
  showLabel={true} 
/>
```

### Form Elements

#### Inputs
- **States**: Default, Focus, Error, Success, Disabled
- **Sizes**: sm, md, lg
- **Variants**: Text, Textarea, Select

```css
.input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: 2px solid var(--border-200);
  border-radius: var(--radius-lg);
  background: var(--bg-secondary);
  color: var(--text-primary);
  transition: all var(--transition-fast);
}

.input:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px var(--primary-500/20);
}
```

### Badges

#### Variants
- **Default**: Neutral gray
- **Primary**: Brand color
- **Success**: Green
- **Warning**: Yellow/Orange
- **Error**: Red
- **Info**: Blue

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
}

.badge--success {
  background: var(--success-100);
  color: var(--success-700);
}
```

### Alerts

#### Types
- **Info**: Blue theme
- **Success**: Green theme
- **Warning**: Yellow/Orange theme
- **Error**: Red theme

```css
.alert {
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  border: 1px solid;
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
}

.alert--success {
  background: var(--success-50);
  border-color: var(--success-200);
  color: var(--success-700);
}
```

### Loading States

#### Spinner
- **Sizes**: sm, md, lg
- **Variants**: Primary, Secondary, Light

#### Skeleton
- **Types**: Text, Image, Card, Button
- **Animations**: Pulse effect

```css
.skeleton {
  background: linear-gradient(90deg, var(--skeleton-start), var(--skeleton-end), var(--skeleton-start));
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

## Responsive Design

### Breakpoints
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

### Grid System
```css
.grid {
  display: grid;
  gap: var(--space-6);
}

.grid--cols-1 { grid-template-columns: repeat(1, 1fr); }
.grid--cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid--cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid--cols-4 { grid-template-columns: repeat(4, 1fr); }

@media (max-width: 768px) {
  .grid--cols-2,
  .grid--cols-3,
  .grid--cols-4 {
    grid-template-columns: repeat(1, 1fr);
  }
}
```

### Mobile-First Approach
```css
/* Base styles (mobile) */
.component {
  padding: var(--space-4);
  font-size: var(--text-base);
}

/* Tablet and up */
@media (min-width: 768px) {
  .component {
    padding: var(--space-6);
    font-size: var(--text-lg);
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .component {
    padding: var(--space-8);
    font-size: var(--text-xl);
  }
}
```

## Accessibility

### Focus States
```css
.focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .focus-visible {
    outline: 3px solid var(--primary-600);
  }
}
```

### Screen Reader Support
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### High Contrast Mode
```css
@media (prefers-contrast: high) {
  .btn {
    border: 2px solid currentColor;
  }
  
  .card {
    border: 2px solid var(--border-400);
  }
}
```

## Dark Mode

### Automatic Detection
```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: var(--neutral-900);
    --text-primary: var(--neutral-100);
    --border-200: var(--neutral-700);
  }
}
```

### Manual Toggle
```css
[data-theme="dark"] {
  --bg-primary: var(--neutral-900);
  --text-primary: var(--neutral-100);
  --border-200: var(--neutral-700);
}
```

## CSS Custom Properties

### Color Variables
```css
:root {
  /* Primary Colors */
  --primary-50: #f0f9ff;
  --primary-100: #e0f2fe;
  --primary-500: #3b82f6;
  --primary-600: #2563eb;
  --primary-900: #1e3a8a;
  
  /* Semantic Colors */
  --text-primary: var(--neutral-900);
  --text-secondary: var(--neutral-600);
  --bg-primary: white;
  --bg-secondary: var(--neutral-50);
  --border-200: var(--neutral-200);
}
```

### Spacing Variables
```css
:root {
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
}
```

### Typography Variables
```css
:root {
  --font-family-sans: 'Inter', system-ui, sans-serif;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --font-normal: 400;
  --font-semibold: 600;
}
```

## Usage Guidelines

### Component Structure
1. **Import CSS Variables**: Always import `variables.css` first
2. **Use Utility Classes**: Leverage `utilities.css` for common patterns
3. **Component-Specific Styles**: Create dedicated CSS files for components
4. **Responsive Design**: Use mobile-first approach
5. **Accessibility**: Include focus states and screen reader support

### Naming Convention
- **BEM-like**: `.component__element--modifier`
- **Examples**:
  - `.card__header`
  - `.btn--primary`
  - `.alert--success`

### File Organization
```
src/
├── styles/
│   ├── variables.css      # Design tokens
│   ├── utilities.css      # Utility classes
│   └── components.css     # Component library
├── components/
│   ├── ComponentName.jsx
│   └── ComponentName.css  # Component-specific styles
└── index.css             # Global styles and imports
```

## Customization

### Overriding Variables
```css
/* In your component CSS */
.my-component {
  --primary-500: #custom-color;
  background: var(--primary-500);
}
```

### Creating New Variants
```css
.btn--custom {
  background: linear-gradient(135deg, var(--custom-500), var(--custom-600));
  color: white;
}
```

### Extending Components
```css
/* Extend existing component */
.card--featured {
  border: 2px solid var(--primary-500);
  box-shadow: var(--shadow-xl);
}
```

## Best Practices

### Performance
1. **Use CSS Variables**: For consistent theming and easy updates
2. **Minimize Specificity**: Avoid deep nesting
3. **Optimize Animations**: Use `transform` and `opacity` for smooth animations
4. **Reduce Bundle Size**: Use utility classes for common patterns

### Maintainability
1. **Consistent Naming**: Follow established conventions
2. **Documentation**: Comment complex CSS rules
3. **Modular Structure**: Keep components self-contained
4. **Version Control**: Track design system changes

### Accessibility
1. **Color Contrast**: Ensure sufficient contrast ratios
2. **Keyboard Navigation**: Support tab navigation
3. **Screen Readers**: Provide appropriate ARIA labels
4. **Motion Preferences**: Respect user motion preferences

## Future Enhancements

### Planned Features
1. **Design Tokens**: Export to design tools (Figma, Sketch)
2. **Component Library**: React Storybook integration
3. **Theme Builder**: Visual theme customization tool
4. **Performance Monitoring**: CSS bundle size tracking
5. **Automated Testing**: Visual regression testing

### Roadmap
1. **Q1**: Component documentation and examples
2. **Q2**: Advanced animations and micro-interactions
3. **Q3**: Design token management system
4. **Q4**: Performance optimization and monitoring

## Resources

### Tools
- **Color Contrast**: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- **CSS Validator**: [W3C CSS Validator](https://jigsaw.w3.org/css-validator/)
- **Performance**: [CSS Stats](https://cssstats.com/)

### References
- **Design Systems**: [Design Systems Handbook](https://www.designsystems.com/)
- **CSS Best Practices**: [CSS Guidelines](https://cssguidelin.es/)
- **Accessibility**: [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

*This design system is maintained by the Supply Chain AI development team. For questions or contributions, please refer to the project documentation.*
