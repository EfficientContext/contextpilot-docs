import React from 'react';
import DocSidebar from '@theme-original/DocSidebar';

export default function DocSidebarWrapper(props) {
  return (
    <div className="sidebar-with-logo">
      <a href="/" className="sidebar-logo-container">
        <span className="sidebar-brand-text">ContextPilot</span>
      </a>
      <DocSidebar {...props} />
    </div>
  );
}
