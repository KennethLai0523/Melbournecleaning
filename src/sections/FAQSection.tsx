import { homeFaqs } from '../data/faqs';
import { FAQAccordion } from '../components/ui/FAQAccordion';

export function FAQSection() {
  return (
    <section className="section section--grey" aria-labelledby="faq-heading">
      <div className="container">
        <div className="section-header">
          <span className="section-label">FAQ</span>
          <h2 id="faq-heading">Frequently Asked Questions</h2>
          <p>Answers to common questions about our cleaning services across Melbourne.</p>
        </div>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <FAQAccordion items={homeFaqs} />
        </div>
      </div>
    </section>
  );
}
