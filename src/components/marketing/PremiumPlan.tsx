"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { PRICING_PLANS } from "@/lib/pricing";
import { parseDecimalString } from "@/lib/formatters";

function formatAmount(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(2);
}

function isYearlyDuration(duration?: string): boolean {
  if (!duration) return false;
  return duration.toUpperCase().includes("Y");
}

function getMonthsText(count: number): string {
  const rem10 = count % 10;
  const rem100 = count % 100;
  if (rem100 >= 11 && rem100 <= 14) return "місяців";
  if (rem10 === 1) return "місяць";
  if (rem10 >= 2 && rem10 <= 4) return "місяці";
  return "місяців";
}

export function PremiumPlan() {
  const [billingCycle, setBillingCycle] = useState<"month" | "year">("month");
  const publicPlans = PRICING_PLANS;



  const hasMonthlyPlans = publicPlans.some((plan) => !isYearlyDuration(plan.duration));
  const hasYearlyPlans = publicPlans.some((plan) => isYearlyDuration(plan.duration));
  const showToggle = hasMonthlyPlans && hasYearlyPlans;

  const filteredPlans = publicPlans.filter((plan) =>
    billingCycle === "year" ? isYearlyDuration(plan.duration) : !isYearlyDuration(plan.duration),
  );

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 sm:space-y-6">
      {showToggle && (
        <div className="flex justify-center mb-2 sm:mb-4">
          <div className="bg-[#f3f4f6] p-1 rounded-full inline-flex items-center">
            <button
              onClick={() => setBillingCycle("month")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                billingCycle === "month"
                  ? "bg-white shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08)] text-[#121212]"
                  : "text-[#4b5563] hover:text-[#121212]"
              }`}
            >
              Місяць
            </button>
            <button
              onClick={() => setBillingCycle("year")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                billingCycle === "year"
                  ? "bg-white shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08)] text-[#121212]"
                  : "text-[#4b5563] hover:text-[#121212]"
              }`}
            >
              Рік
            </button>
          </div>
        </div>
      )}

      {filteredPlans.map((plan) => {
        const currencyLabel = plan.currency === "UAH" ? "₴" : plan.currency;
        const oldPrice = plan.old_price ?? null;
        const hasOldPrice = oldPrice !== null && oldPrice !== plan.price;
        const current = parseDecimalString(plan.price);
        const old = hasOldPrice ? parseDecimalString(oldPrice) : null;
        const hasDiscount = old !== null && current !== null && old > 0 && current < old;
        const discountPercent = hasDiscount ? Math.round(((old - current) / old) * 100) : null;
        const savings = hasDiscount ? old - current : null;
        const isYearly = isYearlyDuration(plan.duration);
        const freeMonths =
          savings !== null && old !== null && old > 0 ? Math.round((savings / old) * 12) : null;

        return (
          <div
            key={plan.id}
            className="bg-[#ffffff] border border-[#e7e7e7] w-full rounded-[32px] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col md:flex-row"
          >
            <div className="w-full md:w-5/12 px-5 sm:px-6 md:px-8 pt-7 sm:pt-8 md:pt-12 pb-6 sm:pb-8 md:pb-10 border-b md:border-b-0 md:border-r border-[#e7e7e7] flex flex-col items-center justify-center text-center">
              {hasDiscount ? (
                isYearly && freeMonths !== null && freeMonths > 0 ? (
                  <div className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-800 border border-amber-200 mb-3 sm:mb-5">
                    {freeMonths} {getMonthsText(freeMonths)} безкоштовно
                  </div>
                ) : discountPercent !== null ? (
                  <div className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-700 border border-emerald-200 mb-3 sm:mb-5">
                    -{discountPercent}% для перших клієнтів
                  </div>
                ) : null
              ) : null}

              <h2 className="text-3xl sm:text-4xl tracking-tight text-[#121212] font-semibold mb-3 sm:mb-6">
                {plan.title || "Premium"}
              </h2>

              {hasOldPrice ? (
                <div className="text-base font-medium text-[#4b5563] mb-1">
                  <span className="uppercase tracking-wider text-[11px] text-[#6b7280] mr-2">
                    Було
                  </span>
                  <span className="line-through">
                    {oldPrice} {currencyLabel}/{isYearly ? "рік" : "міс"}
                  </span>
                </div>
              ) : null}

              <div className="flex items-center justify-center gap-2.5 sm:gap-3 my-1.5 sm:my-2">
                <span className="text-6xl sm:text-7xl font-light tracking-tighter text-[#121212] leading-none">
                  {plan.price}
                </span>
                <div className="flex flex-col items-start justify-center gap-1 sm:gap-1.5 mt-1.5 sm:mt-2">
                  <span className="text-lg sm:text-xl font-medium text-[#121212] leading-none">
                    {currencyLabel}
                  </span>
                  <span className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-widest leading-none">
                    {isYearly ? "щороку" : "щомісяця"}
                  </span>
                </div>
              </div>

              {savings !== null && savings > 0 ? (
                <p className="mt-1 text-sm font-semibold text-emerald-700">
                  Економія {formatAmount(savings)} {currencyLabel}{" "}
                  {isYearly ? "на рік" : "щомісяця"}
                </p>
              ) : null}

              <Link
                href={`/register?plan_id=${plan.id}`}
                className="w-full max-w-xs py-3.5 sm:py-4 px-6 mt-5 sm:mt-8 bg-[#121212] flex flex-col items-center justify-center gap-1 text-[#ffffff] rounded-[12px] font-semibold tracking-wide hover:bg-[#1f1f1f] transition-all duration-[200ms] ease-in-out focus:outline-none focus:ring-2 focus:ring-[#121212] focus:ring-offset-2 text-center"
              >
                <span>Спробувати безкоштовно</span>
              </Link>

              <p className="text-xs text-center text-[#4b5563] mt-3 sm:mt-4 font-medium">
                Почніть 7-денний безкоштовний період. <br className="hidden md:block" />
                Скасуйте в будь-який момент.
              </p>
            </div>

            <div className="w-full md:w-7/12 p-5 sm:p-6 md:p-8 flex flex-col justify-center bg-slate-50/50">
              <ul className="space-y-4 sm:space-y-6 md:space-y-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 sm:gap-4">
                    <Check className="w-6 h-6 text-[#cfcfcf] stroke-[1.5] shrink-0 mt-0.5" />
                    <div className="flex flex-col text-left">
                      <span className="text-base sm:text-[17px] font-semibold text-[#121212] mb-0.5 sm:mb-1">
                        {feature.name}
                      </span>
                      {feature.description && (
                        <span className="text-[13px] sm:text-[14px] text-[#5a5a5a] leading-relaxed mt-0.5 sm:mt-1">
                          {feature.description}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
