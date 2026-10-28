"use client";

import { useState } from "react";

interface PropertyMortgageTeaserProps {
  price: number;
}

export function PropertyMortgageTeaser({ price }: PropertyMortgageTeaserProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [termYears, setTermYears] = useState(30);
  const [interestRate, setInterestRate] = useState(5.5);

  // Cálculo de cuota mensual: M = P * [ r(1+r)^n ] / [ (1+r)^n - 1]
  const principal = price * (1 - downPaymentPercent / 100);
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = termYears * 12;

  const monthlyPayment =
    monthlyRate > 0
      ? Math.round(
          (principal *
            (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
            (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
        )
      : Math.round(principal / numberOfPayments);

  return (
    <>
      <div className="bg-mosque/5 p-6 rounded-xl border border-mosque/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white rounded-full text-mosque shadow-sm flex-none">
            <span className="material-icons">calculate</span>
          </div>
          <div>
            <h3 className="font-semibold text-nordic">Estimated Payment</h3>
            <p className="text-sm text-nordic/60">
              Starting from{" "}
              <strong className="text-mosque font-bold">
                ${monthlyPayment.toLocaleString()}/mo
              </strong>{" "}
              with {downPaymentPercent}% down
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="whitespace-nowrap px-4 py-2.5 bg-white border border-nordic/15 rounded-lg text-sm font-semibold hover:border-mosque hover:text-mosque transition-colors text-nordic cursor-pointer shadow-xs"
        >
          Calculate Mortgage
        </button>
      </div>

      {/* Modal interactivo de simulación hipotecaria */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-nordic/40 hover:text-nordic cursor-pointer"
            >
              <span className="material-icons">close</span>
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-mosque/10 text-mosque flex items-center justify-center">
                <span className="material-icons text-xl">calculate</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-nordic">Mortgage Calculator</h3>
                <p className="text-xs text-nordic/60">
                  Property Value: ${price.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Resultado estimado */}
            <div className="bg-mosque/5 p-5 rounded-xl border border-mosque/10 text-center mb-6">
              <span className="text-xs uppercase tracking-wider text-nordic/60">
                Estimated Monthly Principal & Interest
              </span>
              <div className="text-3xl sm:text-4xl font-bold text-mosque mt-1">
                ${monthlyPayment.toLocaleString()}
                <span className="text-base font-normal text-nordic/60">/mo</span>
              </div>
            </div>

            <div className="space-y-5">
              {/* Down payment slider */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-nordic">Down Payment</span>
                  <span className="font-semibold text-mosque">
                    {downPaymentPercent}% (${((price * downPaymentPercent) / 100).toLocaleString()})
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="5"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full accent-[#006655] cursor-pointer"
                />
              </div>

              {/* Loan Term */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-nordic">Loan Term</span>
                  <span className="font-semibold text-mosque">{termYears} Years</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[15, 20, 30].map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setTermYears(term)}
                      className={`py-2 rounded-lg text-sm font-medium border transition-colors cursor-pointer ${
                        termYears === term
                          ? "bg-mosque text-white border-mosque"
                          : "bg-white border-slate-200 text-nordic hover:border-mosque"
                      }`}
                    >
                      {term} Years
                    </button>
                  ))}
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-nordic">Interest Rate</span>
                  <span className="font-semibold text-mosque">{interestRate}%</span>
                </div>
                <input
                  type="range"
                  min="2.5"
                  max="10"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-[#006655] cursor-pointer"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="mt-6 w-full bg-mosque hover:bg-primary-hover text-white py-3 rounded-lg font-medium transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
}

