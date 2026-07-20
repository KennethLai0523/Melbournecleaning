import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { serviceTypeOptions } from '../../data/services';
import { validateDetailedQuote, type ValidationError } from '../../utils/formValidation';
import {
  buildDetailedQuoteWhatsAppMessage,
  buildWhatsAppUrl,
  type DetailedQuoteData,
} from '../../utils/whatsapp';
import { buildDetailedQuoteMailto, copyToClipboard } from '../../utils/email';
import styles from './EnquiryForm.module.css';

const additionalServiceOptions = [
  'Oven cleaning',
  'Internal window cleaning',
  'Carpet cleaning',
  'Fridge cleaning',
  'Cabinet cleaning',
  'Balcony cleaning',
  'Garage cleaning',
];

const initialState = {
  name: '',
  phone: '',
  email: '',
  address: '',
  propertyType: '',
  serviceType: '',
  bedrooms: '',
  bathrooms: '',
  propertySize: '',
  frequency: '',
  preferredDate: '',
  preferredTime: '',
  additionalServices: [] as string[],
  notes: '',
  contactMethod: '',
  privacyConsent: false,
};

export function DetailedQuoteForm() {
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [fields, setFields] = useState(initialState);
  const [copyStatus, setCopyStatus] = useState('');

  const getError = (field: string) => errors.find((e) => e.field === field)?.message;

  const getQuoteData = (): DetailedQuoteData => {
    const serviceLabel =
      serviceTypeOptions.find((s) => s.value === fields.serviceType)?.label ?? fields.serviceType;
    return { ...fields, serviceType: serviceLabel };
  };

  const buildTextSummary = (data: DetailedQuoteData) => {
    return [
      'Detailed Cleaning Quote Request',
      '',
      `Name: ${data.name}`,
      `Phone: ${data.phone}`,
      `Email: ${data.email}`,
      `Address/Suburb: ${data.address}`,
      `Property type: ${data.propertyType}`,
      `Service: ${data.serviceType}`,
      `Bedrooms: ${data.bedrooms || 'N/A'}`,
      `Bathrooms: ${data.bathrooms || 'N/A'}`,
      `Property size: ${data.propertySize || 'N/A'}`,
      `Frequency: ${data.frequency}`,
      `Preferred date: ${data.preferredDate || 'Flexible'}`,
      `Preferred time: ${data.preferredTime || 'Flexible'}`,
      `Additional services: ${data.additionalServices.length > 0 ? data.additionalServices.join(', ') : 'None'}`,
      `Notes: ${data.notes || 'None'}`,
      `Preferred contact: ${data.contactMethod}`,
    ].join('\n');
  };

  const validate = () => {
    const validationErrors = validateDetailedQuote(fields);
    setErrors(validationErrors);
    return validationErrors.length === 0;
  };

  const handleWhatsApp = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const data = getQuoteData();
    window.open(buildWhatsAppUrl(buildDetailedQuoteWhatsAppMessage(data)), '_blank');
  };

  const handleEmail = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    window.location.href = buildDetailedQuoteMailto(getQuoteData());
  };

  const handleCopy = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const success = await copyToClipboard(buildTextSummary(getQuoteData()));
    setCopyStatus(success ? 'Enquiry details copied to clipboard.' : 'Unable to copy. Please try again.');
  };

  const toggleAdditional = (service: string) => {
    setFields((prev) => ({
      ...prev,
      additionalServices: prev.additionalServices.includes(service)
        ? prev.additionalServices.filter((s) => s !== service)
        : [...prev.additionalServices, service],
    }));
  };

  return (
    <form className={styles.form} noValidate>
      <div className={styles.grid}>
        <div className="form-group">
          <label htmlFor="dq-name" className="form-label">Full Name *</label>
          <input id="dq-name" type="text" className={`form-input ${getError('name') ? 'form-input--error' : ''}`}
            value={fields.name} onChange={(e) => setFields({ ...fields, name: e.target.value })} />
          {getError('name') && <p className="form-error" role="alert">{getError('name')}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="dq-phone" className="form-label">Phone Number *</label>
          <input id="dq-phone" type="tel" className={`form-input ${getError('phone') ? 'form-input--error' : ''}`}
            value={fields.phone} onChange={(e) => setFields({ ...fields, phone: e.target.value })} />
          {getError('phone') && <p className="form-error" role="alert">{getError('phone')}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="dq-email" className="form-label">Email Address *</label>
          <input id="dq-email" type="email" className={`form-input ${getError('email') ? 'form-input--error' : ''}`}
            value={fields.email} onChange={(e) => setFields({ ...fields, email: e.target.value })} />
          {getError('email') && <p className="form-error" role="alert">{getError('email')}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="dq-address" className="form-label">Property Address or Suburb *</label>
          <input id="dq-address" type="text" className={`form-input ${getError('address') ? 'form-input--error' : ''}`}
            value={fields.address} onChange={(e) => setFields({ ...fields, address: e.target.value })} />
          {getError('address') && <p className="form-error" role="alert">{getError('address')}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="dq-property" className="form-label">Property type *</label>
          <select id="dq-property" className={`form-select ${getError('propertyType') ? 'form-select--error' : ''}`}
            value={fields.propertyType} onChange={(e) => setFields({ ...fields, propertyType: e.target.value })}>
            <option value="">Select property type</option>
            <option value="Apartment">Apartment</option>
            <option value="Unit">Unit</option>
            <option value="Townhouse">Townhouse</option>
            <option value="House">House</option>
            <option value="Studio">Studio</option>
          </select>
          {getError('propertyType') && <p className="form-error" role="alert">{getError('propertyType')}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="dq-service" className="form-label">Service Type *</label>
          <select id="dq-service" className={`form-select ${getError('serviceType') ? 'form-select--error' : ''}`}
            value={fields.serviceType} onChange={(e) => setFields({ ...fields, serviceType: e.target.value })}>
            <option value="">Select a service</option>
            {serviceTypeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {getError('serviceType') && <p className="form-error" role="alert">{getError('serviceType')}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="dq-bedrooms" className="form-label">Number of Bedrooms</label>
          <input id="dq-bedrooms" type="number" min="0" className="form-input"
            value={fields.bedrooms} onChange={(e) => setFields({ ...fields, bedrooms: e.target.value })} />
        </div>
        <div className="form-group">
          <label htmlFor="dq-bathrooms" className="form-label">Number of Bathrooms</label>
          <input id="dq-bathrooms" type="number" min="0" className="form-input"
            value={fields.bathrooms} onChange={(e) => setFields({ ...fields, bathrooms: e.target.value })} />
        </div>
        <div className="form-group">
          <label htmlFor="dq-size" className="form-label">Approximate Property Size</label>
          <input id="dq-size" type="text" className="form-input" placeholder="e.g. 150 sqm"
            value={fields.propertySize} onChange={(e) => setFields({ ...fields, propertySize: e.target.value })} />
        </div>
        <div className="form-group">
          <label htmlFor="dq-frequency" className="form-label">One-Time or Recurring *</label>
          <select id="dq-frequency" className={`form-select ${getError('frequency') ? 'form-select--error' : ''}`}
            value={fields.frequency} onChange={(e) => setFields({ ...fields, frequency: e.target.value })}>
            <option value="">Select frequency</option>
            <option value="One-time">One-time</option>
            <option value="Weekly">Weekly</option>
            <option value="Fortnightly">Fortnightly</option>
            <option value="Monthly">Monthly</option>
          </select>
          {getError('frequency') && <p className="form-error" role="alert">{getError('frequency')}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="dq-date" className="form-label">Preferred Date</label>
          <input id="dq-date" type="date" className="form-input"
            value={fields.preferredDate} onChange={(e) => setFields({ ...fields, preferredDate: e.target.value })} />
        </div>
        <div className="form-group">
          <label htmlFor="dq-time" className="form-label">Preferred Time</label>
          <input id="dq-time" type="text" className="form-input" placeholder="e.g. Morning, 10am"
            value={fields.preferredTime} onChange={(e) => setFields({ ...fields, preferredTime: e.target.value })} />
        </div>
        <div className="form-group">
          <label htmlFor="dq-contact" className="form-label">Preferred Contact Method *</label>
          <select id="dq-contact" className={`form-select ${getError('contactMethod') ? 'form-select--error' : ''}`}
            value={fields.contactMethod} onChange={(e) => setFields({ ...fields, contactMethod: e.target.value })}>
            <option value="">Select contact method</option>
            <option value="Phone">Phone</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Email">Email</option>
          </select>
          {getError('contactMethod') && <p className="form-error" role="alert">{getError('contactMethod')}</p>}
        </div>
      </div>

      <fieldset className={styles.fieldset}>
        <legend className="form-label">Additional Services</legend>
        <div className={styles.checkboxGrid}>
          {additionalServiceOptions.map((service) => (
            <label key={service} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={fields.additionalServices.includes(service)}
                onChange={() => toggleAdditional(service)}
              />
              {service}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="form-group">
        <label htmlFor="dq-notes" className="form-label">Cleaning Notes</label>
        <textarea id="dq-notes" className="form-textarea" rows={4}
          value={fields.notes} onChange={(e) => setFields({ ...fields, notes: e.target.value })} />
      </div>

      <div className="form-group">
        <label className="form-checkbox-group">
          <input
            type="checkbox"
            checked={fields.privacyConsent}
            onChange={(e) => setFields({ ...fields, privacyConsent: e.target.checked })}
          />
          <span>
            I agree to the <Link to="/privacy-policy">Privacy Policy</Link> *
          </span>
        </label>
        {getError('privacyConsent') && <p className="form-error" role="alert">{getError('privacyConsent')}</p>}
      </div>

      <div className={styles.actions}>
        <button type="button" className="btn btn--whatsapp" onClick={handleWhatsApp}>
          Send Through WhatsApp
        </button>
        <button type="button" className="btn btn--secondary" onClick={handleEmail}>
          Send by Email
        </button>
        <button type="button" className="btn btn--primary" onClick={handleCopy}>
          Copy Enquiry Details
        </button>
      </div>

      {copyStatus && <p className="form-note" role="status">{copyStatus}</p>}
      <p className="form-note">
        Submitting through WhatsApp or email will open the selected application on your device.
        Your enquiry is not stored on this website.
      </p>
    </form>
  );
}
