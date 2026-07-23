import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileContactBar } from './MobileContactBar';

export function Layout() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="main-content">
        <Outlet />
      </main>
      <Footer />
      <MobileContactBar />
    </>
  );
}
