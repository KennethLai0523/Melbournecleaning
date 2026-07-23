import { useState, type FormEvent } from 'react';
import { serviceTypeOptions } from '../../data/services';
import {
  validateQuickEnquiry,
  type ValidationError,
} from '../../utils/formValidation';
import {
  buildQuickEnquiryWhatsAppMessage,
  buildWhatsAppUrl,
} from '../../utils/whatsapp';
import { buildQuickEnquiryMailto } from '../../utils/email';
import styles from './EnquiryForm.module.css';

interface QuickEnquiryFormProps {
  id?: string;
  compact?: boolean;
}

export function QuickEnquiryForm({ id = 'quick-enquiry', compact = false }: QuickEnquiryFormProps) {
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [fields, setFields] = useState({
    name: '',
    phone: '',
    email: '',
    suburb: '',
    service: '',
    preferredDate: '',
    message: '',
  });

  const getError = (field: string) => errors.find((e) => e.field === field)?.message;

  const handleSubmit = (method: 'whatsapp' | 'email') => (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateQuickEnquiry(fields);
    setErrors(validationErrors);
    if (validationErrors.length > 0) return;

    const serviceLabel =
      serviceTypeOptions.find((s) => s.value === fields.service)?.label ?? fields.service;

    const data = { ...fields, service: serviceLabel };

    if (method === 'whatsapp') {
      const message = buildQuickEnquiryWhatsAppMessage(data);
      window.open(buildWhatsAppUrl(message), '_blank');
    } else {
      window.location.href = buildQuickEnquiryMailto(data);
    }
  };

  return (
    <form id={id} className={`${styles.form} ${compact ? styles.compact : ''}`} noValidate>
      <div className={styles.grid}>
        <div className="form-group">
          <label htmlFor={`${id}-name`} className="form-label">Full Name *</label>
          <input
            id={`${id}-name`}
            type="text"
            className={`form-input ${getError('name') ? 'form-input--error' : ''}`}
            value={fields.name}
            onChange={(e) => setFields({ ...fields, name: e.target.value })}
            autoComplete="name"
          />
          {getError('name') && <p className="form-error" role="alert">{getError('name')}</p>}
        </div>

        <div className="form-group">
          <label htmlFor={`${id}-phone`} className="form-label">Phone Number *</label>
          <input
            id={`${id}-phone`}
            type="tel"
            className={`form-input ${getError('phone') ? 'form-input--error' : ''}`}
            value={fields.phone}
            onChange={(e) => setFields({ ...fields, phone: e.target.value })}
            autoComplete="tel"
          />
          {getError('phone') && <p className="form-error" role="alert">{getError('phone')}</p>}
        </div>

        <div className="form-group">
          <label htmlFor={`${id}-email`} className="form-label">Email Address *</label>
          <input
            id={`${id}-email`}
            type="email"
            className={`form-input ${getError('email') ? 'form-input--error' : ''}`}
            value={fields.email}
            onChange={(e) => setFields({ ...fields, email: e.target.value })}
            autoComplete="email"
          />
          {getError('email') && <p className="form-error" role="alert">{getError('email')}</p>}
        </div>

        <div className="form-group">
          <label htmlFor={`${id}-suburb`} className="form-label">Suburb *</label>
          <input
            id={`${id}-suburb`}
            type="text"
            className={`form-input ${getError('suburb') ? 'form-input--error' : ''}`}
            value={fields.suburb}
            onChange={(e) => setFields({ ...fields, suburb: e.target.value })}
          />
          {getError('suburb') && <p className="form-error" role="alert">{getError('suburb')}</p>}
        </div>

        <div className="form-group">
          <label htmlFor={`${id}-service`} className="form-label">Service Type *</label>
          <select
            id={`${id}-service`}
            className={`form-select ${getError('service') ? 'form-select--error' : ''}`}
            value={fields.service}
            onChange={(e) => setFields({ ...fields, service: e.target.value })}
          >
            <option value="">Select a service</option>
            {serviceTypeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {getError('service') && <p className="form-error" role="alert">{getError('service')}</p>}
        </div>

        <div className="form-group">
          <label htmlFor={`${id}-date`} className="form-label">Preferred Date</label>
          <input
            id={`${id}-date`}
            type="date"
            className="form-input"
            value={fields.preferredDate}
            onChange={(e) => setFields({ ...fields, preferredDate: e.target.value })}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor={`${id}-message`} className="form-label">Message</label>
        <textarea
          id={`${id}-message`}
          className="form-textarea"
          value={fields.message}
          onChange={(e) => setFields({ ...fields, message: e.target.value })}
          rows={3}
        />
      </div>

      <div className={styles.actions}>
        <button type="button" className="btn btn--whatsapp" onClick={handleSubmit('whatsapp')}>
          Send Enquiry Through WhatsApp
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
