import Link from "next/link";
import Brand from "./Brand";

const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/bookeasy.ua";
const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "bookeasy.ua@gmail.com";

const resolveSupportHref = (value: string | null): string | null => {
  if (!value) return null;

  const emailValue = value.replace(/^mailto:/i, "").trim();
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
  if (!isValidEmail) return null;

  const normalized = emailValue.toLowerCase();
  if (normalized.endsWith("@gmail.com")) {
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailValue)}`;
  }

  return `mailto:${emailValue}`;
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const supportHref = resolveSupportHref(SUPPORT_EMAIL);

  return (
    <footer className="border-t border-slate-200 py-6 sm:py-8 px-6 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
        <Brand to="/" />

        <p className="text-sm text-slate-500">© {currentYear} BOOKEASY</p>

        <div className="flex w-full flex-col items-center gap-2 text-sm text-slate-500 md:w-auto md:flex-row md:items-center md:gap-4">
          {INSTAGRAM_URL && (
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="text-center hover:text-slate-900"
            >
              Instagram
            </a>
          )}
          {supportHref && (
            <a href={supportHref} className="text-center hover:text-slate-900">
              Підтримка
            </a>
          )}
          <Link href="/terms" className="text-center hover:text-slate-900">
            Умови користування
          </Link>
          <Link href="/privacy-policy" className="text-center hover:text-slate-900">
            Політика конфіденційності
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
