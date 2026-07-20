import { useState, type FormEvent } from 'react';
import { validateContactForm, type ValidationError } from '../../utils/formValidation';
import { buildContactWhatsAppMessage, buildWhatsAppUrl } from '../../utils/whatsapp';
import { buildContactMailto } from '../../utils/email';
import styles from './EnquiryForm.module.css';

export function ContactForm() {
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [fields, setFields] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Website Enquiry',
    message: '',
  });

  const getError = (field: string) => errors.find((e) => e.field === field)?.message;

  const handleSubmit = (method: 'whatsapp' | 'email') => (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateContactForm(fields);
    setErrors(validationErrors);
    if (validationErrors.length > 0) return;

    if (method === 'whatsapp') {
      window.open(buildWhatsAppUrl(buildContactWhatsAppMessage(fields)), '_blank');
    } else {
      window.location.href = buildContactMailto(fields);
    }
  };

  return (
    <form className={styles.form} noValidate>
      <div className="form-group">
        <label htmlFor="cf-name" className="form-label">Full Name *</label>
        <input id="cf-name" type="text" className={`form-input ${getError('name') ? 'form-input--error' : ''}`}
          value={fields.name} onChange={(e) => setFields({ ...fields, name: e.target.value })} />
        {getError('name') && <p className="form-error" role="alert">{getError('name')}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="cf-phone" className="form-label">Phone Number *</label>
        <input id="cf-phone" type="tel" className={`form-input ${getError('phone') ? 'form-input--error' : ''}`}
          value={fields.phone} onChange={(e) => setFields({ ...fields, phone: e.target.value })} />
        {getError('phone') && <p className="form-error" role="alert">{getError('phone')}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="cf-email" className="form-label">Email Address *</label>
        <input id="cf-email" type="email" className={`form-input ${getError('email') ? 'form-input--error' : ''}`}
          value={fields.email} onChange={(e) => setFields({ ...fields, email: e.target.value })} />
        {getError('email') && <p className="form-error" role="alert">{getError('email')}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="cf-subject" className="form-label">Subject</label>
        <input id="cf-subject" type="text" className="form-input"
          value={fields.subject} onChange={(e) => setFields({ ...fields, subject: e.target.value })} />
      </div>
      <div className="form-group">
        <label htmlFor="cf-message" className="form-label">Message *</label>
        <textarea id="cf-message" className={`form-textarea ${getError('message') ? 'form-input--error' : ''}`}
          rows={5} value={fields.message} onChange={(e) => setFields({ ...fields, message: e.target.value })} />
        {getError('message') && <p className="form-error" role="alert">{getError('message')}</p>}
      </div>
      <div className={styles.actions}>
        <button type="button" className="btn btn--whatsapp" onClick={handleSubmit('whatsapp')}>
          Send Through WhatsApp
        </button>
        <button type="button" className="btn btn--secondary" onClick={handleSubmit('email')}>
          Send by Email
        </button>
      </div>
      <p className="form-note">
        Submitting through WhatsApp or email will open the selected application on your device.
      </p>
    </form>
  );
}
