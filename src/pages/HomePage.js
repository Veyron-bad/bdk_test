import React, { Suspense, lazy } from 'react';
import './HomePage.css';
import HeroSection from '../components/sections/HeroSection/HeroSection';

const HomePageSections = lazy(() => import('./HomePageSections'));

const HomePage = () => (
  <div className="home-page">
    <HeroSection />
    <Suspense fallback={<div className="home-page__placeholder" aria-hidden="true" />}>
      <HomePageSections />
    </Suspense>
  </div>
);

export default HomePage;


