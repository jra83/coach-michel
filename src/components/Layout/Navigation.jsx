import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname || '/');

  const tabs = [
    { path: '/metrics', label: 'Métriques', icon: '📊' },
    { path: '/summaries', label: 'Résumés', icon: '📈' },
    { path: '/plan', label: 'Plan', icon: '📅' },
    { path: '/data', label: 'Données', icon: '👤' },
    { path: '/chat', label: 'Chat', icon: '💬' },
  ];

  const isActive = (path) => activeTab === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-lighter px-2 py-2">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            onClick={() => setActiveTab(tab.path)}
            className={`flex flex-col items-center px-4 py-2 rounded-lg transition-colors ${
              isActive(tab.path) ? 'text-primary' : 'text-gray-dark'
            }`}
          >
            <span className="text-2xl mb-1">{tab.icon}</span>
            <span className="text-xs font-medium">{tab.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;