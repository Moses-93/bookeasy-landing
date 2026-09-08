import Link from "next/link";
import Brand from "@/components/ui/Brand";
import Footer from "@/components/ui/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBFB] text-slate-900">
      <header className="border-b border-[#2C050C]/10 bg-white sticky top-0 z-20">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Brand href="/" />
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16">
        <p className="text-xs uppercase tracking-[0.2em] font-mono text-[#8F5E66] font-semibold mb-3">
          404 Помилка
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#2C050C] font-display max-w-md text-balance">
          Сторінку не знайдено
        </h1>
        <p className="text-sm sm:text-base text-[#5A3D42] mt-3 max-w-md text-pretty">
          Можливо, сторінку було перенесено або адреса введена з помилкою.
        </p>

        <div className="mt-8">
          <Link
            href="/"
            className="px-6 py-3.5 bg-[#2B030A] text-white rounded-xl font-semibold text-sm hover:bg-[#1C0105] transition-[background-color,box-shadow] duration-150 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2B030A]"
          >
            На головну сторінку
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
