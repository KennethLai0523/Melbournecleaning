import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ServicePage from './pages/ServicePage';
import ServiceAreasPage from './pages/ServiceAreasPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import CancellationPolicyPage from './pages/CancellationPolicyPage';
import NotFoundPage from './pages/NotFoundPage';
import { commercialRedirectSlugs } from './config/navigation';

const residentialServiceRoutes = [
  'residential-cleaning',
  'end-of-lease-cleaning',
  'deep-cleaning',
  'airbnb-cleaning',
  'move-in-move-out-cleaning',
];

const removedServiceRedirects = ['carpet-cleaning', 'window-cleaning'] as const;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="services" element={<ServicesPage />} />
          {residentialServiceRoutes.map((slug) => (
            <Route key={slug} path={slug} element={<ServicePage slug={slug} />} />
          ))}
          {removedServiceRedirects.map((slug) => (
            <Route key={slug} path={slug} element={<Navigate to="/services" replace />} />
          ))}
          {commercialRedirectSlugs.map((slug) => (
            <Route
              key={slug}
              path={slug}
              element={<Navigate to="/residential-cleaning" replace />}
            />
          ))}
          <Route path="service-areas" element={<ServiceAreasPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="request-a-quote" element={<Navigate to="/#journey-choose-service" replace />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="terms-and-conditions" element={<TermsPage />} />
          <Route path="cancellation-policy" element={<CancellationPolicyPage />} />
          <Route path="404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
