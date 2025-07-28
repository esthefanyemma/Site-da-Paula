import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <header className="bg-verde-escuro flex flex-row px-12 py-6 justify-between">
            <Link className="mx-auto md:mx-0" href="/">
                <Image src="/assets/logonome.svg" alt = "Logo da Paula" width = {300} height = {120} className="w-48"/>
            </Link>
            <nav className="flex flex-row gap-12 text-white text-xl font-krub font-semibold items-center">
                <Link className="transition ease-in-out duration-300 hover:scale-110" href="/">Home</Link>
                <Link className="transition ease-in-out duration-300 hover:scale-110" href="/sobre">Sobre Mim</Link>
                <Link className="transition ease-in-out duration-300 hover:scale-110" href="/agendamento">Agendamento</Link>
                <Link className="transition ease-in-out duration-300 hover:scale-110" href="/contato">Contato</Link>
            </nav>
        </header>
    )
}