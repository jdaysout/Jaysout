import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CountdownLanding from './components/CountdownLanding';
import CustomCursor from './components/CustomCursor';
import AI101 from './components/AI101';

function App() {
  const [showMainContent, setShowMainContent] = useState(false);

  const handleCountdownComplete = () => {
    setShowMainContent(true);
  };

  if (!showMainContent) {
    return <CountdownLanding onCountdownComplete={handleCountdownComplete} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <Header />
      <main className="pt-16">
        <Hero />
        <AI101 />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;