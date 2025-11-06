"use client";
import React, { useState, useEffect } from "react";

const HeroBanner = () => {
  const words = ["Visibility", "Meets", "Credibility"];
  const [visibleWords, setVisibleWords] = useState([false, false, false]);
  const [currentCycle, setCurrentCycle] = useState(0);

  useEffect(() => {
    const animateWords = () => {
      // Reset all words to invisible
      setVisibleWords([false, false, false]);
      
      // Show words one by one with 0.5s delay
      words.forEach((_, index) => {
        setTimeout(() => {
          setVisibleWords(prev => {
            const newVisible = [...prev];
            newVisible[index] = true;
            return newVisible;
          });
        }, index * 500);
      });
    };

    // Start animation immediately
    animateWords();

    // Set up continuous looping
    const interval = setInterval(() => {
      setCurrentCycle(prev => prev + 1);
      animateWords();
    }, words.length * 500 + 2000); // Total animation time + pause

    return () => clearInterval(interval);
  }, [currentCycle]);

  return (
    <section className="hero-banner">
      <div className="hero-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
        <h1 className="hero-heading" style={{ textAlign: 'center', margin: '0 0 20px 0', color: 'white', fontFamily: 'Poppins, sans-serif', fontWeight: '700', fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
          Discovering Brands
        </h1>
        <h2 className="hero-tagline" style={{ textAlign: 'center', margin: 0, fontWeight: '400', fontSize: 'calc(clamp(1.4rem, 4vw, 3rem) - 5px)' }}>
          {words.map((word, index) => (
            <span 
              key={index} 
              className={`hero-word ${visibleWords[index] ? 'visible' : ''}`}
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              {word}
              {index < words.length - 1 && <span className="word-space"> </span>}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
};

export default HeroBanner;