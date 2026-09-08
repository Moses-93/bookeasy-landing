"use client";

import React from "react";
import { PatternFormat } from "react-number-format";

interface IClientFormFieldsProps {
  clientName: string;
  onChangeName: (value: string) => void;
  clientPhone: string;
  onChangePhone: (value: string) => void;
  instagramUsername: string;
  onChangeInstagram: (value: string) => void;
  telegramUsername: string;
  onChangeTelegram: (value: string) => void;
  disabled?: boolean;
  labels?: {
    name?: string;
    phone?: string;
    instagram?: string;
    telegram?: string;
  };
  requiredFields?: {
    name?: boolean;
    phone?: boolean;
    instagram?: boolean;
    telegram?: boolean;
  };
}

export const ClientFormFields: React.FC<IClientFormFieldsProps> = ({
  clientName,
  onChangeName,
  clientPhone,
  onChangePhone,
  instagramUsername,
  onChangeInstagram,
  telegramUsername,
  onChangeTelegram,
  disabled = false,
  labels,
  requiredFields = { name: true },
}) => {
  return (
    <fieldset
      disabled={disabled}
      className="bg-white rounded-2xl border-[0.5px] border-slate-200/50 overflow-hidden flex flex-col disabled:opacity-75 transition-opacity"
    >
      {/* Name Field */}
      <div className="flex flex-col px-4 py-2.5 border-b border-slate-100">
        <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
          {labels?.name || "Ім'я клієнта"}{" "}
          {requiredFields?.name && <span className="text-red-500">*</span>}
        </label>
        <input
          type="text"
          required
          placeholder="Ім'я та прізвище"
          value={clientName}
          onChange={(e) => onChangeName(e.target.value)}
          className="w-full bg-transparent text-slate-900 text-sm placeholder-slate-400 outline-none"
        />
      </div>

      {/* Phone Field */}
      <div className="flex flex-col px-4 py-2.5 border-b border-slate-100">
        <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
          {labels?.phone || "Телефон"}
          {requiredFields?.phone && <span className="text-red-500">*</span>}
        </label>
        <div className="w-full bg-transparent flex items-center">
          <span className="mr-2 shrink-0 text-sm text-slate-400">+380</span>
          <PatternFormat
            format="## ### ## ##"
            mask="_"
            allowEmptyFormatting={false}
            value={clientPhone}
            onValueChange={(values) => onChangePhone(values.value)}
            type="tel"
            inputMode="numeric"
            placeholder="67 123 45 67"
            className="w-full border-none bg-transparent p-0 text-sm text-slate-900 outline-none placeholder-slate-400 focus:ring-0"
          />
        </div>
      </div>

      {/* Instagram Field */}
      <div className="flex flex-col px-4 py-2.5 border-b border-slate-100">
        <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
          {labels?.instagram || "Instagram"}
          {requiredFields?.instagram && <span className="text-red-500">*</span>}
        </label>
        <div className="w-full bg-transparent flex items-center">
          <span className="mr-1 shrink-0 text-sm text-slate-400">@</span>
          <input
            type="text"
            placeholder="username"
            value={instagramUsername}
            onChange={(e) => onChangeInstagram(e.target.value)}
            className="w-full border-none bg-transparent p-0 text-sm text-slate-900 outline-none placeholder-slate-400 focus:ring-0"
          />
        </div>
      </div>

      {/* Telegram Field */}
      <div className="flex flex-col px-4 py-2.5">
        <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
          {labels?.telegram || "Telegram"}
          {requiredFields?.telegram && <span className="text-red-500">*</span>}
        </label>
        <div className="w-full bg-transparent flex items-center">
          <span className="mr-1 shrink-0 text-sm text-slate-400">@</span>
          <input
            type="text"
            placeholder="username"
            value={telegramUsername}
            onChange={(e) => onChangeTelegram(e.target.value)}
            className="w-full border-none bg-transparent p-0 text-sm text-slate-900 outline-none placeholder-slate-400 focus:ring-0"
          />
        </div>
      </div>
    </fieldset>
  );
};
