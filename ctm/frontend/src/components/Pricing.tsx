import React from "react";
import { Check, ArrowLeft } from "lucide-react";
import { useLocation } from "react-router-dom";

function Pricing() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
    <section
      id="pricing"
      className="py-4 bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-800"
    >
      {!isHomePage && (
        <div className="hidden lg:block p-4">
          <a href="/dashboard">
            <button className="flex items-center border border-gray-300 dark:border-gray-600 py-2 px-4 rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-900 transition-all">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <p>Go back</p>
            </button>
          </a>
        </div>
      )}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Whether you're a small team or growing business, we have a plan that
            fits your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 flex flex-col">
            <div className="p-8 flex-grow">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Free Plan
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Get started with the basic features for free.
              </p>
              <div className="flex items-baseline mb-8">
                <span className="text-5xl font-extrabold text-gray-900 dark:text-white">
                  $0
                </span>
                <span className="text-xl text-gray-500 dark:text-gray-400 ml-2">
                  /month
                </span>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  "Up to 2 users per project",
                  "Up to 3 active projects",
                  "Basic task management",
                  "File uploads up to 10 MB",
                  "Real-time collaboration",
                  "In-app notifications",
                ].map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center text-gray-600 dark:text-gray-300"
                  >
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 mt-auto">
              <a href="/dashboard">
                <button className="w-full py-3 px-4 bg-gray-900 dark:bg-gray-600 text-white rounded-full font-semibold hover:bg-gray-800 dark:hover:bg-gray-500 transition-colors duration-300">
                  Get Started
                </button>
              </a>
            </div>
          </div>
          <div className="bg-indigo-700 text-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 relative flex flex-col">
            <div className="absolute top-0 right-0 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-bl-lg">
              POPULAR
            </div>
            <div className="p-8 flex-grow">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Pro Plan
              </h3>
              <p className="text-indigo-200 mb-6">
                Unlock the full potential of your team with advanced features.
              </p>
              <div className="flex items-baseline mb-8">
                <span className="text-5xl font-extrabold text-white">$15</span>
                <span className="text-xl text-indigo-200 ml-2">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  "Unlimited users per project",
                  "Unlimited active projects",
                  "Advanced task features",
                  "File uploads up to 500 MB",
                  "Advanced collaboration tools",
                  "Email & SMS notifications",
                  "Priority support",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center text-indigo-100">
                    <Check className="h-5 w-5 text-indigo-300 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 mt-auto">
              <button className="w-full py-3 px-4 bg-white text-indigo-700 rounded-full font-semibold hover:bg-indigo-50 transition-colors duration-300">
                Upgrade to Pro
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
