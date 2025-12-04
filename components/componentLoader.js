/**
 * Component Loader
 * Dynamically loads HTML components into the page
 */

class ComponentLoader {
  constructor() {
    this.components = new Map();
  }

  /**
   * Load a component from a file
   * @param {string} componentName - Name of the component file (without .html)
   * @returns {Promise<string>} - HTML content of the component
   */
  async loadComponent(componentName) {
    // Check cache first
    if (this.components.has(componentName)) {
      return this.components.get(componentName);
    }

    try {
      const response = await fetch(`components/${componentName}.html`);
      if (!response.ok) {
        throw new Error(`Failed to load component: ${componentName}`);
      }
      const html = await response.text();
      this.components.set(componentName, html);
      return html;
    } catch (error) {
      console.error(`Error loading component ${componentName}:`, error);
      return '';
    }
  }

  /**
   * Load multiple components
   * @param {string[]} componentNames - Array of component names
   * @returns {Promise<Object>} - Object with component names as keys and HTML as values
   */
  async loadComponents(componentNames) {
    const promises = componentNames.map(name => 
      this.loadComponent(name).then(html => ({ name, html }))
    );
    const results = await Promise.all(promises);
    return results.reduce((acc, { name, html }) => {
      acc[name] = html;
      return acc;
    }, {});
  }

  /**
   * Insert a component into a target element
   * @param {string} componentName - Name of the component
   * @param {string|HTMLElement} target - Selector or DOM element where to insert
   * @param {string} position - 'beforebegin', 'afterbegin', 'beforeend', 'afterend'
   */
  async insertComponent(componentName, target, position = 'beforeend') {
    const html = await this.loadComponent(componentName);
    const targetElement = typeof target === 'string' 
      ? document.querySelector(target) 
      : target;
    
    if (!targetElement) {
      console.error(`Target element not found: ${target}`);
      return;
    }

    targetElement.insertAdjacentHTML(position, html);
  }

  /**
   * Replace the content of a target element with a component
   * @param {string} componentName - Name of the component
   * @param {string|HTMLElement} target - Selector or DOM element
   */
  async replaceWithComponent(componentName, target) {
    const html = await this.loadComponent(componentName);
    const targetElement = typeof target === 'string' 
      ? document.querySelector(target) 
      : target;
    
    if (!targetElement) {
      console.error(`Target element not found: ${target}`);
      return;
    }

    targetElement.innerHTML = html;
  }
}

// Create a global instance
window.componentLoader = new ComponentLoader();

// Auto-load components when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  const loader = window.componentLoader;
  
  try {
    // Load header
    await loader.insertComponent('Header', 'body', 'afterbegin');
    
    // Load main content pages
    const main = document.getElementById('main');
    if (main) {
      const pages = ['Home', 'About', 'Services', 'Industries', 'Talent', 'Contact'];
      for (const page of pages) {
        await loader.insertComponent(page, main);
      }
    }
    
    // Load footer
    await loader.insertComponent('Footer', 'body', 'beforeend');
    
    // Dispatch custom event when components are loaded
    window.dispatchEvent(new CustomEvent('componentsLoaded'));
  } catch (error) {
    console.error('Error loading components:', error);
  }
});

