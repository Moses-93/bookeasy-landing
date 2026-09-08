import { Scissors, Eye, Paintbrush, Sparkles, Flower, Zap, Hand } from "lucide-react";
import { MARKETING_COPY } from "./copy";

interface DirectionIconProps {
  label: string;
}

const DirectionIcon = ({ label }: DirectionIconProps) => {
  switch (label) {
    case "Нігті":
      return (
        <Hand className="w-5 h-5 text-slate-500 transition-transform duration-300 group-hover:scale-110" />
      );
    case "Волосся":
      return (
        <Scissors className="w-5 h-5 text-slate-500 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12" />
      );
    case "Брови та вії":
      return (
        <Eye className="w-5 h-5 text-slate-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
      );
    case "Макіяж":
      return (
        <Paintbrush className="w-5 h-5 text-slate-500 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" />
      );
    case "Епіляція":
      return (
        <Zap className="w-5 h-5 text-slate-500 transition-transform duration-300 group-hover:scale-110 group-hover:translate-y-[-2px]" />
      );
    case "Косметологія":
      return (
        <Flower className="w-5 h-5 text-slate-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-45" />
      );
    default:
      return <Sparkles className="w-5 h-5 text-slate-500" />;
  }
};

export const WhoIsItFor = () => {
  const { eyebrow, heading, directions } = MARKETING_COPY.whoIsItFor;

  const cleanHeading = heading.endsWith(":") ? heading.slice(0, -1) : heading;

  return (
    <section className="max-w-6xl mx-auto px-6 py-8 sm:py-10 lg:py-12">
      <div className="mb-8 md:mb-12 text-center flex flex-col items-center">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#8F5E66] font-semibold font-mono mb-3">
          {eyebrow}
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 font-display max-w-2xl mx-auto text-balance text-center">
          {cleanHeading}
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-3.5 sm:gap-4 max-w-4xl mx-auto">
        {directions.map((d) => (
          <div
            key={d.label}
            className="group bg-white rounded-2xl px-5 py-3.5 shadow-sm flex items-center gap-3.5 select-none cursor-pointer hover:-translate-y-0.5 active:scale-[0.98] hover:shadow-md transition-all duration-200 w-fit"
          >
            <div className="text-slate-500 shrink-0">
              <DirectionIcon label={d.label} />
            </div>
            <span className="font-sans text-sm sm:text-base font-semibold text-slate-800 tracking-tight">
              {d.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
