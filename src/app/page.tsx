import HeroSection from "@/components/herosection";
import Navbar from "@/components/navbar";
import Image from "next/image";
import SobreMim from '../components/sobremim/index';
import Contato from '../components/contato/index';

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <HeroSection></HeroSection>
      <SobreMim></SobreMim>
      <Contato></Contato>
    </div>
  );
}
