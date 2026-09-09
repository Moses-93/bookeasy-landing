"use client";

import React from "react";
import { PatternFormat } from "react-number-format";

interface IClientFormFieldsProps {
  disabled?: boolean;
}

export const ClientFormFields: React.FC<IClientFormFieldsProps> = ({
  disabled = false,
}) => {
  return (
    <fieldset
      disabled={disabled}
      className="bg-white rounded-2xl border-[0.5px] border-slate-200/50 overflow-hidden flex flex-col disabled:opacity-75 transition-opacity"
    >
      {/* Name Field */}
      <div className="flex flex-col px-4 py-2.5 border-b border-slate-100">
        <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
          Ваше ім&apos;я та прізвище <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          required
          placeholder="Ім'я та прізвище"
          className="w-full bg-transparent text-slate-900 text-sm placeholder-slate-400 outline-none"
        />
      </div>

      {/* Phone Field */}
      <div className="flex flex-col px-4 py-2.5 border-b border-slate-100">
        <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
          Телефон <span className="text-red-500">*</span>
        </label>
        <div className="w-full bg-transparent flex items-center">
          <PatternFormat
            format="+380 ## ### ## ##"
            mask="_"
            allowEmptyFormatting={false}
            name="phone_number"
            type="tel"
            inputMode="numeric"
            placeholder="+380 67 123 45 67"
            required
            className="w-full border-none bg-transparent p-0 text-sm text-slate-900 outline-none placeholder-slate-400 focus:ring-0"
          />
        </div>
      </div>

      {/* Instagram Field */}
      <div className="flex flex-col px-4 py-2.5 border-b border-slate-100">
        <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
          Instagram
        </label>
        <div className="w-full bg-transparent flex items-center">
          <span className="mr-1 shrink-0 text-sm text-slate-400">@</span>
          <input
            type="text"
            name="instagram_username"
            placeholder="username"
            className="w-full border-none bg-transparent p-0 text-sm text-slate-900 outline-none placeholder-slate-400 focus:ring-0"
          />
        </div>
      </div>

      {/* Telegram Field */}
      <div className="flex flex-col px-4 py-2.5">
        <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
          Telegram
        </label>
        <div className="w-full bg-transparent flex items-center">
          <span className="mr-1 shrink-0 text-sm text-slate-400">@</span>
          <input
            type="text"
            name="telegram_username"
            placeholder="username"
            className="w-full border-none bg-transparent p-0 text-sm text-slate-900 outline-none placeholder-slate-400 focus:ring-0"
          />
        </div>
      </div>
    </fieldset>
  );
};
