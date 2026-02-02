import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import './App.css';

const HomePage = lazy(() => import('./pages/HomePage'));
const PlaceholderPage = lazy(() => import('./pages/PlaceholderPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const RequestPage = lazy(() => import('./pages/RequestPage'));
const CalculatorPage = lazy(() => import('./pages/CalculatorPage'));

const PageLoader = () => (
  <div className="page-loader" aria-hidden="true">
    <div className="page-loader__spinner" />
  </div>
);

function App() {
  return (
    <Router basename='/bdk_test/' future={{ v7_startTransition: true }}>
      <div className="App">
        <Header />
        <main className="main-content">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalog" element={<PlaceholderPage title="Каталог" />} />
              <Route path="/catalog/standard" element={<PlaceholderPage title="Стандартные размеры" />} />
              <Route path="/catalog/custom" element={<PlaceholderPage title="Индивидуальные решения" />} />
              <Route path="/calculator" element={<CalculatorPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/about/production" element={<PlaceholderPage title="Производство" />} />
              <Route path="/about/certificates" element={<PlaceholderPage title="Сертификаты" />} />
              <Route path="/about/partners" element={<PlaceholderPage title="Партнёры" />} />
              <Route path="/projects" element={<PlaceholderPage title="Проекты" />} />
              <Route path="/articles" element={<PlaceholderPage title="Статьи" />} />
              <Route path="/contacts" element={<PlaceholderPage title="Контакты" />} />
              <Route path="/request" element={<RequestPage />} />
              <Route path="/documents" element={<PlaceholderPage title="Документация" />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

