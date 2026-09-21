"use client";

import React, { useState } from "react";
import { AsYouType } from "libphonenumber-js";
import { getCountryFlagEmoji } from "@/lib/types";

interface IClientFormFieldsProps {
  disabled?: boolean;
}

/**
 * Render client contact information form fields.
 *
 * @param props - Component properties.
 * @param props.disabled - Whether the form fields are disabled.
 * @returns JSX fieldset element containing name, phone, instagram, and telegram inputs.
 */
export const ClientFormFields: React.FC<IClientFormFieldsProps> = ({
  disabled = false,
}) => {
  const [phone, setPhone] = useState("");

  const asYouType = phone ? new AsYouType() : null;
  if (asYouType && phone) {
    asYouType.input(phone);
  }
  const flag = asYouType ? getCountryFlagEmoji(asYouType.getCountry()) : "";

  return (
    <fieldset
      disabled={disabled}
      className="bg-white rounded-2xl border-[0.5px] border-slate-200/50 overflow-hidden flex flex-col disabled:opacity-75 transition-opacity"
    >
      {/* Name Field */}
      <div className="flex flex-col px-4 py-2.5 border-b border-slate-100 focus-within:bg-slate-50/50 transition-colors">
        <label
          htmlFor="client_name_input"
          className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 cursor-pointer"
        >
          Ваше ім&apos;я та прізвище <span className="text-red-500">*</span>
        </label>
        <input
          id="client_name_input"
          type="text"
          name="name"
          autoComplete="name"
          autoCapitalize="words"
          required
          placeholder="Ім'я та прізвище"
          className="w-full bg-transparent text-slate-900 text-sm placeholder-slate-400 outline-none"
        />
      </div>

      {/* Phone Field */}
      <div className="flex flex-col px-4 py-2.5 border-b border-slate-100 focus-within:bg-slate-50/50 transition-colors">
        <label
          htmlFor="phone_number_input"
          className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5 cursor-pointer"
        >
          Телефон <span className="text-red-500">*</span>
        </label>
        <div className="relative flex items-center w-full bg-transparent">
          <div
            aria-hidden="true"
            className="absolute left-0 flex items-center gap-1.5 pointer-events-none select-none"
          >
            {flag && <span className="text-base leading-none">{flag}</span>}
            <span className="text-slate-400 font-semibold text-sm">+</span>
          </div>

          <input
            id="phone_number_input"
            type="tel"
            name="phone_number"
            autoComplete="tel"
            inputMode="numeric"
            maxLength={15}
            required
            className={`w-full border-none bg-transparent p-0 text-sm text-slate-900 outline-none placeholder-slate-400 focus:ring-0 transition-all duration-200 ease-out ${
              flag ? "pl-11" : "pl-4"
            }`}
            value={phone.replace(/^\+/, "")}
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, "").slice(0, 15);
              setPhone(digits ? `+${digits}` : "");
            }}
          />
        </div>
      </div>

      {/* Instagram Field */}
      <div className="flex flex-col px-4 py-2.5 border-b border-slate-100 focus-within:bg-slate-50/50 transition-colors">
        <label
          htmlFor="instagram_username_input"
          className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5 cursor-pointer"
        >
          Instagram
        </label>
        <div className="w-full bg-transparent flex items-center">
          <span aria-hidden="true" className="mr-1 shrink-0 text-sm text-slate-400 select-none">
            @
          </span>
          <input
            id="instagram_username_input"
            type="text"
            name="instagram_username"
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="username"
            className="w-full border-none bg-transparent p-0 text-sm text-slate-900 outline-none placeholder-slate-400 focus:ring-0"
          />
        </div>
      </div>

      {/* Telegram Field */}
      <div className="flex flex-col px-4 py-2.5 focus-within:bg-slate-50/50 transition-colors">
        <label
          htmlFor="telegram_username_input"
          className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5 cursor-pointer"
        >
          Telegram
        </label>
        <div className="w-full bg-transparent flex items-center">
          <span aria-hidden="true" className="mr-1 shrink-0 text-sm text-slate-400 select-none">
            @
          </span>
          <input
            id="telegram_username_input"
            type="text"
            name="telegram_username"
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="username"
            className="w-full border-none bg-transparent p-0 text-sm text-slate-900 outline-none placeholder-slate-400 focus:ring-0"
          />
        </div>
      </div>
    </fieldset>
  );
};
