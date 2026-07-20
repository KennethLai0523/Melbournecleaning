import { useCallback, useEffect, useState } from 'react';
import { SEO } from '../components/layout/SEO';
import { ScrollJourney } from '../components/journey/ScrollJourney';
import { Hero } from '../components/home/Hero';
import { PropertyTypeSelector } from '../components/home/PropertyTypeSelector';
import { QuoteBuilder } from '../components/quote/QuoteBuilder';
import { TrustSection } from '../components/home/TrustSection';
import { NextSteps } from '../components/home/NextSteps';
import { FinalCTA } from '../components/home/FinalCTA';
import { seoConfig } from '../config/seoConfig';
import { defaultQuoteState, type QuoteFormState } from '../types/quote';

export default function HomePage() {
  const [quoteState, setQuoteState] = useState<QuoteFormState>(defaultQuoteState);

  const scrollToQuoteBuilder = useCallback(() => {
    const target = document.getElementById('quote-builder');
    if (target) {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    }
  }, []);

  const handlePropertyTypeSelect = useCallback((propertyType: string) => {
    setQuoteState((prev) => ({
      ...prev,
      property: { ...prev.property, propertyType },
    }));
    scrollToQuoteBuilder();
  }, [scrollToQuoteBuilder]);

  useEffect(() => {
    if (window.location.hash === '#quote-builder') {
      const timer = window.setTimeout(scrollToQuoteBuilder, 150);
      return () => window.clearTimeout(timer);
    }
  }, [scrollToQuoteBuilder]);

  return (
    <>
      <SEO seo={seoConfig.home} />
      <ScrollJourney>
        <Hero onBuildQuote={scrollToQuoteBuilder} />
        <PropertyTypeSelector
          selectedId={quoteState.property.propertyType}
          onSelect={handlePropertyTypeSelect}
        />
        <QuoteBuilder state={quoteState} onChange={setQuoteState} />
        <TrustSection />
        <NextSteps />
        <FinalCTA onBuildQuote={scrollToQuoteBuilder} />
      </ScrollJourney>
    </>
  );
}
