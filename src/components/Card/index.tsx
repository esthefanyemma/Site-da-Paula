type CardProps = {
  titulo: string;
  texto: string;
};

export default function Card({ titulo, texto }: CardProps) {
    return (
        <div className="bg-verde-escuro flex flex-col items-center gap-4 p-6 rounded-lg shadow-lg w-80">
            <h1 className="font-krub text-preto text-3xl font-bold">
                {titulo}
            </h1>
            <p className="font-krub text-center text-preto text-xl">
                {texto}
            </p>
        </div>
    )
}