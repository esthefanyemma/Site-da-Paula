import Image from 'next/image';
import Link from 'next/link';
export default function HeroSection() {
    return (
        <section id="home" className="flex flex-row items-center justify-between bg-verde-claro pt-24">
            <Image src="/assets/fotopaulacircular.png" alt="foto" width={200} height={200} className='w-5/12 p-28' />
            <div className="flex flex-col items-start justify-center px-36 gap-8 w-7/12 border-l border-verde-escuro/50">
                <h1 className="text-5xl font-krub font-bold text-preto">
                    Aulas de inglês personalizadas!
                </h1>
                <p className="text-2xl font-krub text-preto">
                    Aprenda inglês do seu jeito, no seu tempo. Nossas aulas são feitas sob medida para você, com foco em conversação, trabalho, viagens ou objetivos pessoais.
                </p>
                <button className="bg-verde-escuro text-white px-6 py-3 rounded-lg font-krub font-semibold hover:bg-verde-botao-trans hover:scale-105 transition ease-in">
                    <Link href="/contato">
                        Entre em contato
                    </Link>
                </button>
            </div>
        </section>
    )
}