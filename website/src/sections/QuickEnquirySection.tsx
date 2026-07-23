import { QuickEnquiryForm } from '../components/forms/QuickEnquiryForm';

export function QuickEnquirySection() {
  return (
    <section className="section section--grey" id="quick-enquiry" aria-labelledby="quick-enquiry-heading">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Quick Enquiry</span>
          <h2 id="quick-enquiry-heading">Request a Cleaning Quote</h2>
          <p>
            Fill in your details below and send your enquiry through WhatsApp or email. We will respond
            with a quote based on your property and cleaning requirements.
          </p>
        </div>
        <QuickEnquiryForm />
      </div>
    </section>
  );
}
