import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Navigation from './components/Layout/Navigation';
import Metrics from './views/Metrics';
import Summaries from './views/Summaries';
import Plan from './views/Plan';
import Data from './views/Data';
import Chat from './views/Chat';

function App() {
  const getTitle = (path) => {
    switch (path) {
      case '/metrics':
        return 'Métriques';
      case '/summaries':
        return 'Résumés';
      case '/plan':
        return 'Plan';
      case '/data':
        return 'Données';
      case '/chat':
        return 'Chat';
      default:
        return 'Coach Michel';
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-lightest">
        <Routes>
          <Route path="/" element={<Metrics />} />
          <Route path="/metrics" element={<Metrics />} />
          <Route path="/summaries" element={<Summaries />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/data" element={<Data />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
        <Navigation />
      </div>
    </Router>
  );
}

export default App;