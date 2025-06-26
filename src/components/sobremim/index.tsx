import Image from "next/image";
import Card from "../Card";

export default function SobreMim () {
    return (
        <section className="flex flex-col items-center justify-center bg-branco px-36 py-20 gap-20">
            <div className="flex flex-row items-center justify-between gap-8 w-full ">
                <Image src="" alt="alt" width={200} height={200} className="w-10"/>
                <div className="flex flex-col items-start justify-center w-7/12 gap-8">
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
        </section>
    )
}