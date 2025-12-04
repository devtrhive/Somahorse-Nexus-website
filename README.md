# Somahorse Nexus Website

> **The Operating System for Africa's AI Economy**

A modern, responsive single-page application (SPA) website for Somahorse Nexus, connecting Africa's brightest youth AI talent with industry through three core components: Talent Foundry, Industrial Solutions Hub, and Capital & Impact Dashboard.

## 🌟 Overview

Somahorse Nexus accelerates Africa's AI revolution by empowering developers to build transformative solutions across key industries: Education, Agriculture, Fintech, Healthcare, and Manufacturing. This website serves as the digital frontend for showcasing services, connecting talent, and facilitating business inquiries.

## ✨ Features

- **Single-Page Application (SPA)** - Smooth, seamless navigation without page reloads
- **Component-Based Architecture** - Modular HTML components loaded dynamically
- **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices
- **Modern UI/UX** - Built with Tailwind CSS featuring gradient animations and smooth transitions
- **Interactive Elements**:
  - Service accordion cards with expandable details
  - Industry cards with inline problem/solution displays
  - Mobile-responsive navigation menu
  - Form handling with toast notifications
- **Accessibility** - ARIA labels, keyboard navigation, and focus management
- **Performance Optimized** - Component caching and efficient DOM manipulation

## 🛠️ Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom styles with Tailwind CSS
- **JavaScript (ES6+)** - Vanilla JavaScript for SPA functionality
- **Tailwind CSS** - Utility-first CSS framework (via CDN)
- **Web3Forms** - Form submission service
- **Google Fonts** - Inter font family

## 📁 Project Structure

```
Somahorse-Nexus-website/
├── components/
│   ├── About.html          # About section component
│   ├── Contact.html        # Contact form component
│   ├── Footer.html         # Footer component
│   ├── Header.html         # Navigation header component
│   ├── Home.html           # Hero/home section component
│   ├── Industries.html     # Industries showcase component
│   ├── Services.html       # Services accordion component
│   ├── Talent.html         # Talent registration component
│   └── componentLoader.js  # Dynamic component loading system
├── images/                 # Image assets
│   ├── AI Data Analysis.avif
│   ├── Custom Software & AI Development.png
│   ├── Information Management Solutions.webp
│   ├── Mobile App Development.jpg
│   ├── Tech & AI Consulting.jpg
│   └── [flag images and logo]
├── index.html              # Main entry point
├── script.js               # SPA navigation and interactivity
├── style.css               # Custom CSS styles
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/devtrhive/Somahorse-Nexus-website.git
   cd Somahorse-Nexus-website
   ```

2. **Open the project**
   - For simple viewing: Open `index.html` directly in your browser
   - For development: Use a local server to avoid CORS issues with component loading

 navigate to `http://localhost:8000` in your browser.

## 📖 Usage

### Navigation

The website uses a single-page application architecture. Navigation is handled through:

- **Desktop Navigation**: Click navigation buttons in the header
- **Mobile Navigation**: Use the hamburger menu for mobile devices
- **Direct Links**: Buttons and CTAs throughout the site navigate to different sections

### Sections

1. **Home** - Hero section with main value proposition and CTAs
2. **About** - Information about Somahorse Nexus and its three core components
3. **Services** - Interactive accordion showcasing services:
   - Custom Software & AI Development
   - Tech & AI Consulting
   - Mobile App Development
   - Information Management Solutions
   - AI Data Analysis
4. **Industries** - Industry-specific solutions for:
   - Fintech
   - Agriculture
   - Education
   - Healthcare
   - Manufacturing
5. **Talent** - Registration form for developers to join the platform
6. **Contact** - Business inquiry form

### Component System

The website uses a custom component loader (`componentLoader.js`) that:

- Dynamically loads HTML components from the `components/` directory
- Caches components for performance
- Inserts components into the DOM in the correct order
- Dispatches a `componentsLoaded` event when ready

### Form Handling

Forms are integrated with Web3Forms. To configure:

1. Get a Web3Forms access key from [web3forms.com](https://web3forms.com)
2. Update the form `action` attributes in `Contact.html` and `Talent.html`:
   ```html
   <form action="https://api.web3forms.com/submit" method="POST">
     <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY">
     <!-- form fields -->
   </form>
   ```

## 🎨 Customization

### Colors

Tailwind colors are configured in `index.html`. To change the color scheme, modify the `tailwind.config`:

```javascript
colors: {
  'primary': '#2563EB',      // Main brand color
  'primary-dark': '#1E40AF',
  'primary-light': '#3B82F6',
  'secondary': '#10B981',     // Accent color
  'accent': '#8B5CF6',        // Secondary accent
}
```

### Content

- **Page Content**: Edit HTML files in the `components/` directory
- **Industry Data**: Modify the `industryData` object in `script.js` (lines 116-162)
- **Navigation**: Update navigation items in `Header.html`

### Styling

- **Custom Styles**: Add or modify styles in `style.css`
- **Tailwind Classes**: Use Tailwind utility classes directly in HTML
- **Animations**: Custom animations are defined in `index.html` (Tailwind config) and `style.css`

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Breakpoints

The website uses Tailwind's default breakpoints:

- **sm**: 640px and up
- **md**: 768px and up
- **lg**: 1024px and up
- **xl**: 1280px and up

## 🔧 Development

### Adding New Components

1. Create a new HTML file in the `components/` directory
2. Add the component name to the `pages` array in `componentLoader.js`:
   ```javascript
   const pages = ['Home', 'About', 'Services', 'Industries', 'Talent', 'Contact', 'YourNewPage'];
   ```
3. Add navigation link in `Header.html`
4. Update `script.js` to handle any new interactive elements

### JavaScript Modules

The main `script.js` file contains several self-contained modules:

- **SPA Navigation** - Handles page switching and navigation
- **Services Accordion** - Manages expandable service cards
- **Industries Inline** - Handles industry card interactions
- **Form Handling** - Manages form submissions and toast notifications
- **Hero CTA Switching** - Handles hero button navigation

## 📝 Notes

- The website requires a web server to load components dynamically (due to CORS restrictions)
- All images should be optimized for web use
- Form submissions require a valid Web3Forms access key
- The component loader caches components after first load for better performance

---

**Built with ❤️ for Africa's AI Economy**

