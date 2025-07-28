'use client';

import { useEffect } from 'react';
import HeroSection from "@/components/herosection";
import Image from "next/image";
import SobreMim from '../components/sobremim/index';
import Contato from '../components/contato/index';

export default function Home() {
  useEffect(() => {
    // Verifica se há um hash na URL quando a página carrega
    if (window.location.hash) {
      const element = document.getElementById(window.location.hash.slice(1));
      if (element) {
        // Delay para garantir que a página foi totalmente carregada
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  return (
    <div>
      <HeroSection />
      <SobreMim />
      <Contato />
    </div>
  );
}
