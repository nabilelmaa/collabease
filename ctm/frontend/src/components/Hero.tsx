import React from "react";
import { ArrowRight } from "lucide-react";
import { BackgroundBeamsWithCollision } from "./ui/background-beams-with-collision";

const Hero = () => {
  return (
    <section id="hero" className="relative h-screen bg-gradient-to-b from-neutral-100 to-white dark:from-neutral-800 dark:to-neutral-950">
      <BackgroundBeamsWithCollision>
        <div className="px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
                Collaborate Better,
                <span className="text-primaryColor"> Achieve More</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
                Manage tasks effortlessly with your team and reach your goals
                faster. Boost productivity and streamline your workflow today.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a
                  href="/dashboard"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primaryColor hover:bg-secondaryColor transition duration-150 ease-in-out"
                >
                  Get Started for Free
                  <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
                </a>
                <a
                  href="#demo"
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-100 text-base font-medium rounded-md text-gray-700 bg-white dark:bg-gray-200 hover:bg-gray-50 dark:hover:bg-gray-300 transition duration-150 ease-in-out"
                >
                  Watch Demo
                </a>
              </div>
            </div>
            <div className="lg:w-1/2">
              <img
                src="/hero.svg"
                alt="Collaboration illustration"
                width={1000}
                className="h-auto"
              />
            </div>
          </div>
        </div>
      </BackgroundBeamsWithCollision>
    </section>
  );
};

export default Hero;