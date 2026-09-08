import Link from "next/link";

interface BrandProps {
  to?: string;
  href?: string;
  dark?: boolean;
  className?: string;
}

const Brand = ({ to = "/", href, dark = false, className = "" }: BrandProps) => {
  const fillColor = dark ? "#ffffff" : "#171717";
  const linkHref = href || to;

  return (
    <Link href={linkHref} aria-label="BOOKEASY" className={`inline-flex items-center ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 300 80"
        width="180"
        height="48"
        className="h-10 w-auto sm:h-12"
      >
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="32"
          fontWeight="700"
          letterSpacing="6"
          fill={fillColor}
        >
          BOOKEASY
        </text>
      </svg>
    </Link>
  );
};

export default Brand;
