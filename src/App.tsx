import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Index';
import { Dashboard } from './pages/Dashboard';
import { Today } from './pages/Today';
import Example from './pages/Example';
import { Important } from './pages/Important';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/today" element={<Today />} />
          <Route path="/important" element={<Important />} />
          <Route path="/example" element={<Example />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;