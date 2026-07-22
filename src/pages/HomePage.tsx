import { useCallback, useEffect, useState } from 'react';
import { SEO } from '../components/layout/SEO';
import { ScrollJourney } from '../components/journey/ScrollJourney';
import { Hero } from '../components/home/Hero';
import { PropertyTypeSelector } from '../components/home/PropertyTypeSelector';
import { QuoteBuilder } from '../components/quote/QuoteBuilder';
import { DatePickerSection } from '../components/home/DatePickerSection';
import { ContactUsSection } from '../components/home/ContactUsSection';
import { QuoteWorkspace } from '../components/home/QuoteWorkspace';
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

  const handleScheduleChange = useCallback(
    (partial: Pick<QuoteFormState['quote'], 'preferredDate' | 'preferredTime'>) => {
      setQuoteState((prev) => ({
        ...prev,
        quote: { ...prev.quote, ...partial },
      }));
    },
    [],
  );

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
        <QuoteWorkspace state={quoteState} onChange={setQuoteState}>
          <PropertyTypeSelector
            selectedId={quoteState.property.propertyType}
            onSelect={handlePropertyTypeSelect}
          />
          <QuoteBuilder state={quoteState} onChange={setQuoteState} />
          <DatePickerSection
            preferredDate={quoteState.quote.preferredDate}
            preferredTime={quoteState.quote.preferredTime}
            onChange={handleScheduleChange}
          />
          <ContactUsSection state={quoteState} />
        </QuoteWorkspace>
      </ScrollJourney>
    </>
  );
}
