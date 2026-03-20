'use client';

import { client, kps } from '@/data/client-config';

export default function Footer() {
  return (
    <footer className="doc-footer">
      <div className="footer-logos">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={client.logoUrl}
          alt={client.name}
        />
        <div className="logo-sep" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={kps.logoUrl}
          alt="KPS"
        />
      </div>
      <div className="footer-text">Confidential · {client.year}</div>
    </footer>
  );
}
