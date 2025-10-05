import type { Metadata } from "next";
import { Inter_Tight, Poppins } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weights: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "VibeCoin Landing",
  description: "Create a vibrant, single-page landing to introduce a crypto project and guide users to learn, engage, and take action."
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${interTight.variable} antialiased`}
        style={{ background: "linear-gradient(135deg, #0b0c10 0%, #1a1032 60%, #0b0c10 100%)" }}
      >
        <script dangerouslySetInnerHTML={{ __html: `
(function() {
  // Only run if inside an iframe
  if (window.self === window.top) return;
  
  // Prevent multiple initializations
  if (window.__WEBILD_VISUAL_EDITOR_INITIALIZED__) return;
  window.__WEBILD_VISUAL_EDITOR_INITIALIZED__ = true;

  // Inject styles
  const existingStyle = document.getElementById('webild-inspector-styles');
  if (existingStyle) existingStyle.remove();
  
  const style = document.createElement('style');
  style.id = 'webild-inspector-styles';
  style.textContent = \`
    .webild-hover-element {
      outline: 2px dashed rgba(168, 85, 247, 0.8) !important;
      outline-offset: 2px !important;
      cursor: pointer !important;
      position: relative !important;
    }
    
    .webild-selected-element {
      outline: 2px solid rgba(59, 130, 246, 0.8) !important;
      outline-offset: 2px !important;
      position: relative !important;
    }
    
    .webild-hover-overlay {
      position: absolute;
      background: rgba(168, 85, 247, 0.1);
      pointer-events: none;
      z-index: 9998;
      border: 2px dashed rgba(168, 85, 247, 0.8);
    }
    
    .webild-selected-overlay {
      position: absolute;
      background: rgba(59, 130, 246, 0.1);
      pointer-events: none;
      z-index: 9999;
      border: 2px solid rgba(59, 130, 246, 0.8);
    }
    
    [contenteditable="true"] {
      outline: 2px solid rgba(59, 130, 246, 0.8) !important;
      outline-offset: 2px !important;
    }
  \`;
  document.head.appendChild(style);

  // Configuration
  const textElements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'a', 'button', 'li', 'div'];
  const invalidElements = ['html', 'body', 'script', 'style', 'meta', 'link', 'head'];
  const hoverClass = 'webild-hover-element';
  const selectedClass = 'webild-selected-element';

  // State
  let hoveredElement = null;
  let selectedElement = null;
  let originalContent = null;
  let isEditing = false;
  let hoverOverlay = null;
  let selectedOverlay = null;

  // Helper functions
  const getUniqueSelector = (element) => {
    const path = [];
    let current = element;
    
    while (current && current !== document.body) {
      let selector = current.tagName.toLowerCase();
      
      if (current.id) {
        selector = \`#\${current.id}\`;
        path.unshift(selector);
        break;
      }
      
      const parent = current.parentElement;
      if (parent) {
        const siblings = Array.from(parent.children).filter(el => el.tagName === current.tagName);
        if (siblings.length > 1) {
          const index = siblings.indexOf(current) + 1;
          selector += \`:nth-of-type(\${index})\`;
        }
      }
      
      path.unshift(selector);
      current = parent;
      
      if (path.length >= 3) break;
    }
    
    return path.join(' > ');
  };

  const getElementInfo = (element) => {
    const rect = element.getBoundingClientRect();
    const tagName = element.tagName.toLowerCase();
    const selector = getUniqueSelector(element);
    
    const info = {
      tagName: tagName,
      id: element.id || undefined,
      className: element.className || undefined,
      selector: selector,
      boundingBox: {
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height
      }
    };
    
    if (tagName === 'img') {
      info.imageData = {
        src: element.src,
        alt: element.alt || undefined,
        naturalWidth: element.naturalWidth,
        naturalHeight: element.naturalHeight
      };
    }
    
    const computedStyle = window.getComputedStyle(element);
    const backgroundImage = computedStyle.backgroundImage;
    if (backgroundImage && backgroundImage !== 'none') {
      const urlMatch = backgroundImage.match(/url\(['"]?([^'")]+)['"]?\)/);
      if (urlMatch) {
        info.imageData = {
          src: urlMatch[1],
          isBackground: true
        };
      }
    }
    
    return info;
  };

  const isValidElement = (element) => {
    const tagName = element.tagName?.toLowerCase();
    return !invalidElements.includes(tagName);
  };

  const isTextElement = (element) => {
    const tagName = element.tagName.toLowerCase();
    if (!textElements.includes(tagName)) return false;
    
    if (tagName === 'div') {
      const hasElementChildren = Array.from(element.children).length > 0;
      if (hasElementChildren) return false;
    }
    
    return true;
  };

  const createOverlay = (rect, className) => {
    const overlay = document.createElement('div');
    overlay.className = className;
    overlay.style.left = rect.left + window.scrollX + 'px';
    overlay.style.top = rect.top + window.scrollY + 'px';
    overlay.style.width = rect.width + 'px';
    overlay.style.height = rect.height + 'px';
    return overlay;
  };

  const updateOverlay = (overlay, rect) => {
    if (!overlay) return;
    overlay.style.left = rect.left + window.scrollX + 'px';
    overlay.style.top = rect.top + window.scrollY + 'px';
    overlay.style.width = rect.width + 'px';
    overlay.style.height = rect.height + 'px';
  };

  const removeOverlay = (overlay) => {
    if (overlay && overlay.parentNode) {
      overlay.parentNode.removeChild(overlay);
    }
  };

  const makeEditable = (element) => {
    if (!isTextElement(element)) return;
    
    originalContent = element.textContent;
    element.contentEditable = 'true';
    element.focus();
    isEditing = true;
    
    window.parent.postMessage({
      type: 'webild-text-editing-started',
      data: { selector: getElementInfo(element).selector }
    }, '*');
    
    const handleInput = () => {
      if (element.textContent !== originalContent) {
        window.parent.postMessage({
          type: 'webild-text-changed',
          data: { 
            selector: getElementInfo(element).selector,
            hasChanges: true
          }
        }, '*');
      }
    };
    
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        finishEditing(element, true);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        finishEditing(element, false);
      }
    };
    
    element.addEventListener('input', handleInput);
    element.addEventListener('keydown', handleKeyDown);
    
    element._cleanupEditing = () => {
      element.removeEventListener('input', handleInput);
      element.removeEventListener('keydown', handleKeyDown);
    };
  };

  const finishEditing = (element, save) => {
    if (!element || !isEditing) return;
    
    element.contentEditable = 'false';
    isEditing = false;
    
    if (element._cleanupEditing) {
      element._cleanupEditing();
      delete element._cleanupEditing;
    }
    
    window.parent.postMessage({
      type: 'webild-text-editing-ended',
      data: { selector: getElementInfo(element).selector }
    }, '*');
    
    if (save && originalContent !== element.textContent) {
      window.parent.postMessage({
        type: 'webild-element-changed',
        data: {
          type: 'updateText',
          selector: getElementInfo(element).selector,
          oldValue: originalContent,
          newValue: element.textContent
        }
      }, '*');
    } else if (!save && originalContent !== null) {
      element.textContent = originalContent;
    }
    
    originalContent = null;
  };

  // Event handlers
  const handleMouseMove = (e) => {
    if (isEditing) return;
    
    const element = e.target;
    if (!isValidElement(element) || element === hoveredElement) return;
    
    if (hoveredElement) {
      hoveredElement.classList.remove(hoverClass);
      removeOverlay(hoverOverlay);
      hoverOverlay = null;
    }
    
    hoveredElement = element;
    element.classList.add(hoverClass);
    
    const rect = element.getBoundingClientRect();
    hoverOverlay = createOverlay(rect, 'webild-hover-overlay');
    document.body.appendChild(hoverOverlay);
    
    window.parent.postMessage({
      type: 'webild-element-hover',
      data: getElementInfo(element)
    }, '*');
  };

  const handleClick = (e) => {
    if (isEditing) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const element = e.target;
    if (!isValidElement(element)) return;
    
    if (selectedElement) {
      selectedElement.classList.remove(selectedClass);
      removeOverlay(selectedOverlay);
      selectedOverlay = null;
    }
    
    selectedElement = element;
    element.classList.add(selectedClass);
    
    const rect = element.getBoundingClientRect();
    selectedOverlay = createOverlay(rect, 'webild-selected-overlay');
    document.body.appendChild(selectedOverlay);
    
    window.parent.postMessage({
      type: 'webild-element-selected',
      data: getElementInfo(element)
    }, '*');
    
    if (isTextElement(element)) {
      setTimeout(() => makeEditable(element), 100);
    }
  };

  const handleScroll = () => {
    if (hoveredElement && hoverOverlay) {
      const rect = hoveredElement.getBoundingClientRect();
      updateOverlay(hoverOverlay, rect);
    }
    
    if (selectedElement && selectedOverlay) {
      const rect = selectedElement.getBoundingClientRect();
      updateOverlay(selectedOverlay, rect);
    }
    
    window.parent.postMessage({
      type: 'webild-iframe-scroll'
    }, '*');
  };

  // Initialize
  document.addEventListener('mousemove', handleMouseMove, true);
  document.addEventListener('click', handleClick, true);
  document.addEventListener('scroll', handleScroll, true);
  window.addEventListener('scroll', handleScroll, true);

  // Cleanup function
  window.__WEBILD_CLEANUP_VISUAL_EDITOR__ = () => {
    document.removeEventListener('mousemove', handleMouseMove, true);
    document.removeEventListener('click', handleClick, true);
    document.removeEventListener('scroll', handleScroll, true);
    window.removeEventListener('scroll', handleScroll, true);
    
    if (hoveredElement) {
      hoveredElement.classList.remove(hoverClass);
      removeOverlay(hoverOverlay);
    }
    
    if (selectedElement) {
      selectedElement.classList.remove(selectedClass);
      removeOverlay(selectedOverlay);
      if (isEditing) {
        finishEditing(selectedElement, false);
      }
    }
    
    const styleEl = document.getElementById('webild-inspector-styles');
    if (styleEl) styleEl.remove();
    
    window.__WEBILD_VISUAL_EDITOR_INITIALIZED__ = false;
  };

  console.log('[Webild Visual Editor] Initialized successfully');
})();
` }} />
        {children}
      </body>
    </html>
  );
}