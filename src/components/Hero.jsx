import { Link } from "react-router-dom";
import heroImage from "/cookies.png";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col-reverse md:flex-row items-center justify-center p-4 md:px-16 overflow-hidden 
      bg-gradient-to-br from-primary/10 via-secondary/40 to-background"
    >
      {/* Text Section */}
      <div className="md:w-1/2 text-center md:text-left z-10 ">
        <h1 className="text-6xl md:text-8xl font-extrabold leading-tight text-heading drop-shadow-sm">
          NutriGren
        </h1>

        <p className="text-md  md:text-2xl italic text-subtle  mx-auto md:mx-0">
          <span className="font-semibold text-primary md:text-4xl">
            —“Har Bite Mein Hai Maa Ka Pyaar.”
          </span>
          <br />
          Freshly baked with love and nutrition in every cookie.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col  justify-center md:flex-row md:justify-start gap-3 p-4 md:pt-4 md:p-0">
          <Link
            to="#products"
            className="px-6  py-3 rounded-full bg-primary text-primary-foreground font-semibold text-md  shadow-lg hover:scale-105 hover:shadow-xl transition-all"
          >
            Shop Now
          </Link>

          <Link
            to="/about"
            className="px-6  py-3 rounded-full border-2 border-primary text-primary font-semibold text-md  hover:bg-primary hover:text-primary-foreground transition-all"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Image Section */}
      <div className="md:w-1/2 flex justify-center md:justify-end z-10 mt-10 md:mt-0">
        <img
          src={heroImage}
          alt="NutriGren Cookies"
          className="w-64 sm:w-80 md:w-[420px]"
        />
      </div>
    </section>
  );
}
