import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { SuburbPin } from '../../data/suburbCoordinates';
import styles from './ServiceAreasMap.module.css';

interface ServiceAreasMapProps {
  pins: SuburbPin[];
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function createBillboardIcon(label: string): L.DivIcon {
  return L.divIcon({
    className: styles.markerRoot,
    html: `
      <div class="${styles.billboard}">
        <span class="${styles.billboardLabel}">${escapeHtml(label)}</span>
        <span class="${styles.billboardPin}" aria-hidden="true"></span>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
}

export function ServiceAreasMap({ pins }: ServiceAreasMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      scrollWheelZoom: false,
      attributionControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map);

    const bounds = L.latLngBounds([]);
    const markers: L.Marker[] = [];

    for (const pin of pins) {
      const latLng = L.latLng(pin.lat, pin.lng);
      const marker = L.marker(latLng, {
        icon: createBillboardIcon(pin.name),
        title: pin.name,
        keyboard: true,
      }).addTo(map);
      markers.push(marker);
      bounds.extend(latLng);
    }

    if (pins.length > 0) {
      map.fitBounds(bounds.pad(0.08));
    } else {
      map.setView([-37.8136, 144.9631], 10);
    }

    mapRef.current = map;

    const onResize = () => {
      map.invalidateSize();
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      markers.forEach((marker) => marker.remove());
      map.remove();
      mapRef.current = null;
    };
  }, [pins]);

  return (
    <div className={styles.wrap}>
      <div
        ref={containerRef}
        className={styles.map}
        role="img"
        aria-label="Map of Melbourne suburbs we clean, with labelled pins for each area"
      />
    </div>
  );
}
