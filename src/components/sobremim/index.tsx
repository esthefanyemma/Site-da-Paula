import Image from "next/image";
import Card from "../Card";

export default function SobreMim () {
    return (
        <section className="flex flex-col items-center justify-center px-36 pt-8 pb-16 gap-20 bg-gradient-to-t from-[#5AC2C3] to-verde-claro text-white">
            <div className="flex flex-col items-center justify-center gap-8 w-full bg-white/50 p-12 rounded-lg shadow-lg">
                <div className="flex flex-row items-center justify-between gap-8 w-full">
                    <div className="flex flex-col items-start justify-center gap-8">
                        <h1 className="text-4xl font-krub font-bold text-preto">
                            Sobre Mim
                        </h1>
                        <p className="text-2xl font-krub text-preto">
                            Fundei a minha instituição de inglês há -- anos, desde então sigo fazendo o trabalho personalizado para todos os alunos que estão aqui. Tenho experiência no mercado há mais de 15 anos. 
                        </p>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-between gap-20 w-full">
                    <Card titulo="Missão" texto="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."></Card>
                    <Card titulo="Visão" texto="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."></Card>
                    <Card titulo="Valores" texto="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."></Card>
                </div>
            </div>
        </section>
    )
}