"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MapPin, Phone, Send, X, ChevronLeft, ChevronRight } from "lucide-react";
import InstagramIcon from "@mui/icons-material/Instagram";
import type { IPublicMasterProfile, IPhoto } from "@/lib/types";

export const MasterHero: React.FC<{ info: IPublicMasterProfile }> = ({ info }) => {
  const { name, contact, avatar_url, cover_url } = info;

  const socials = [];
  if (contact.telegram_link) {
    socials.push({
      icon: Send,
      href: contact.telegram_link,
      label: "Telegram",
    });
  }
  if (contact.instagram_link) {
    socials.push({
      icon: InstagramIcon,
      href: contact.instagram_link,
      label: "Instagram",
    });
  }
  if (contact.phone_number) {
    const digits = contact.phone_number.replace(/\D/g, "");
    const tel = digits.startsWith("380")
      ? `tel:+${digits}`
      : `tel:${contact.phone_number.replace(/\s+/g, "")}`;
    socials.push({ icon: Phone, href: tel, label: "Phone" });
  }
  if (contact.google_maps_link) {
    socials.push({
      icon: MapPin,
      href: contact.google_maps_link,
      label: "Map",
    });
  }

  return (
    <div className="w-full mb-8">
      {/* Cover */}
      <div className="h-56 sm:h-72 w-full relative">
        {cover_url ? (
          <Image
            src={cover_url}
            alt="Cover"
            fill
            priority
            className="w-full h-full object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-tr from-orange-100/60 via-slate-100 to-slate-200" />
        )}
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center sm:flex-row sm:items-end sm:text-left gap-4 sm:gap-5 -mt-12 sm:-mt-16 relative z-10 mb-4 sm:mb-6">
          {/* Avatar */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white bg-zinc-100 shadow-sm overflow-hidden shrink-0 relative">
            {avatar_url ? (
              <Image
                src={avatar_url}
                alt={name}
                fill
                className="w-full h-full object-cover"
                unoptimized
              />
            ) : (
              <div className="w-full h-full bg-zinc-200 flex items-center justify-center text-zinc-500 font-bold text-3xl">
                {name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Title & Address */}
          <div className="pt-1 sm:pt-0 sm:pb-2 flex-1 flex flex-col items-center sm:items-start">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1A1A1A]">
              {name}
            </h1>
            {contact.address && (
              <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-1.5 text-[13px] text-stone-500 font-medium">
                <MapPin size={14} className="shrink-0" />
                {contact.google_maps_link ? (
                  <a
                    href={contact.google_maps_link}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="truncate hover:text-zinc-900 transition-colors underline decoration-zinc-300 underline-offset-2"
                  >
                    {contact.address}
                  </a>
                ) : (
                  <span className="truncate">{contact.address}</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Socials & About */}
        <div className="max-w-2xl mb-2 flex flex-col items-center sm:items-start text-center sm:text-left mx-auto sm:mx-0">
          {socials.length > 0 && (
            <div className="flex flex-wrap justify-center sm:justify-start gap-2.5 mb-6">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/60 backdrop-blur-md border border-white/80 text-stone-600 hover:bg-white hover:text-zinc-950 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.02)]"
                  aria-label={s.label}
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          )}

          {contact.about && (
            <p className="text-[14px] leading-relaxed text-stone-600 whitespace-pre-line mb-2 text-left">
              {contact.about}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export const MasterPortfolio: React.FC<{ photos: IPhoto[] }> = ({ photos }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!photos || photos.length === 0) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null && selectedIndex < photos.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  return (
    <>
      <div className="mb-8 mt-2 -mx-4 sm:mx-0">
        <div className="flex overflow-x-auto snap-x snap-mandatory scroll-px-4 sm:scroll-px-0 gap-3 sm:gap-4 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* Left spacer for mobile (4px width + 12px gap = 16px offset) */}
          <div className="shrink-0 w-1 sm:hidden" aria-hidden="true"></div>

          {photos.map((photo, index) => (
            <button
              key={photo.photo_id}
              onClick={() => setSelectedIndex(index)}
              className="relative shrink-0 w-[200px] sm:w-[260px] aspect-[3/4] snap-start rounded-2xl overflow-hidden bg-zinc-100 hover:opacity-90 transition-opacity cursor-zoom-in group"
            >
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
              <Image
                src={photo.url}
                alt="Portfolio"
                fill
                className="w-full h-full object-cover"
                unoptimized
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-8 animate-in fade-in duration-200">
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-4 right-4 sm:top-8 sm:right-8 p-3 text-zinc-400 hover:text-white transition-colors z-[101]"
          >
            <X size={28} />
          </button>

          {selectedIndex > 0 && (
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white transition-colors z-[101]"
            >
              <ChevronLeft size={36} />
            </button>
          )}

          <Image
            src={photos[selectedIndex].url}
            alt="Fullscreen"
            width={1200}
            height={1200}
            className="max-w-full max-h-full w-auto h-auto object-contain rounded-xl select-none"
            onClick={(e) => e.stopPropagation()}
            unoptimized
          />

          {selectedIndex < photos.length - 1 && (
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white transition-colors z-[101]"
            >
              <ChevronRight size={36} />
            </button>
          )}

          <div
            className="absolute inset-0 z-[-1] cursor-zoom-out"
            onClick={() => setSelectedIndex(null)}
            aria-label="Закрити"
          />
        </div>
      )}
    </>
  );
};

export const CompactMasterHeader: React.FC<{ info: IPublicMasterProfile }> = ({ info }) => {
  return (
    <div className="flex items-center gap-3 bg-white/95 backdrop-blur-md border border-zinc-200/80 rounded-2xl p-3 shadow-[0_4px_12px_-8px_rgba(24,24,27,0.2)] mb-6">
      <div className="w-10 h-10 rounded-full bg-zinc-100 overflow-hidden shrink-0 border border-zinc-200 relative">
        {info.avatar_url ? (
          <Image
            src={info.avatar_url}
            alt={info.name}
            fill
            className="w-full h-full object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-500 font-bold text-sm">
            {info.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="min-w-0">
        <h2 className="text-sm font-semibold tracking-tight text-zinc-900 leading-tight truncate">
          {info.name}
        </h2>
        {info.contact.address && (
          <p className="text-[11px] text-zinc-500 truncate mt-0.5">{info.contact.address}</p>
        )}
      </div>
    </div>
  );
};
