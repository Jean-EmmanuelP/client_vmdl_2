import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer
      id="Footer"
      className="relative w-full py-8 sm:py-14 px-6 sm:px-10 gap-3 sm:gap-5 flex flex-col items-center justify-center bg-noir text-blanc"
    >
      <div className="w-full text-center sm:w-4/5 flex justify-center items-center">
        <Link href="/" className="group flex flex-col gap-1 sm:gap-2">
          <p className="md:text-2xl group-hover:text-gray-400 transition duration-300 text-[19px] sm:text-[32px] font-semibold">
            VMDL - Law firm &amp; Cover group
          </p>
          <p className="uppercase flex justify-center group-hover:text-gray-400 transition duration-300 text-[15px] sm:text-[22px] leading-[26px] font-light">
            Cabinet d&apos;avocat
          </p>
        </Link>
      </div>

      <div className="w-full sm:w-4/5 gap-2 sm:gap-4 flex flex-col justify-center items-center mt-4 sm:mt-6 text-[14px] sm:text-[16px] leading-[22px] font-light">
        <div className="hidden sm:flex px-4 w-full text-left text-blanc gap-6">
          <Link
            href="/"
            className="hover:text-gray-300 transition"
          >
            Mentions légales
          </Link>
          <Link
            href="/articles"
            className="hover:text-gray-300 transition"
          >
            Articles
          </Link>
        </div>

        <div className="border border-y-[0.5px] border-x-0 sm:gap-4 border-white/20 w-full flex justify-center sm:justify-between items-center p-4 pt-5 sm:py-10">
          <div className="justify-center items-center gap-1 sm:gap-6 flex flex-col sm:flex-row">
            <a
              href="https://www.google.com/maps/search/?api=1&query=2%20Rue%20de%20Poissy%2C%2075005%20Paris"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8A8A8A] uppercase hover:scale-105 text-center transition duration-300 text-xs md:text-base"
            >
              2 rue de Poissy, 75005 Paris
            </a>
            <a
              href="tel:0757417287"
              className="text-[#8A8A8A] uppercase hover:scale-105 text-center transition duration-300 text-xs md:text-base"
            >
              07 57 41 72 87
            </a>
            <a
              href="tel:0144329523"
              className="text-[#8A8A8A] uppercase hover:scale-105 transition duration-300 text-xs md:text-base hidden md:block"
            >
              01 44 32 13 93
            </a>
            <p className="hover:scale-105 transition duration-300 text-[#8A8A8A] flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect x="1" y="13" fill="#8A8A8A" strokeWidth="2" width="62" height="37" />
                <polyline
                  fill="#8A8A8A"
                  stroke="black"
                  strokeWidth="2"
                  points="1,13 32,33 63,13"
                />
              </svg>
              <a href="mailto:cabinet@vmdl.ai" className="hover:scale-105 transition">
                cabinet@vmdl.ai
              </a>
            </p>
          </div>

          <div className="hidden sm:flex justify-center items-center gap-2 md:gap-8 py-1">
            <a
              href="https://www.instagram.com/v.machadodaluz/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:scale-125 transition duration-300 hover:brightness-150"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="#8A8A8A"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.336-2.633 1.311-3.608.975-.975 2.242-1.249 3.608-1.311 1.266-.058 1.646-.07 4.85-.07zm0 5.838a3.999 3.999 0 100 7.998 3.999 3.999 0 000-7.998zm0 6.598a2.6 2.6 0 110-5.2 2.6 2.6 0 010 5.2zm5.116-6.764a.936.936 0 100-1.872.936.936 0 000 1.872z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/vincent-machado-da-luz-550a942a2/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:scale-125 transition duration-300 hover:brightness-150"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="#8A8A8A"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 0h-14C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="flex w-full px-4 mt-4 justify-between gap-4 sm:hidden">
          <div className="flex gap-4">
            <Link href="/" className="hover:text-gray-300 transition">
              Mentions légales
            </Link>
            <Link href="/articles" className="hover:text-gray-300 transition">
              Articles
            </Link>
          </div>
          <div className="flex gap-3">
            <a
              href="https://www.instagram.com/v.machadodaluz/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg fill="#fff" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.34 5.46h0a1.2 1.2 0 1 0 1.2 1.2 1.2 1.2 0 0 0-1.2-1.2zm4.6 2.42a7.59 7.59 0 0 0-.46-2.43 4.94 4.94 0 0 0-1.16-1.77 4.7 4.7 0 0 0-1.77-1.15 7.3 7.3 0 0 0-2.43-.47C15.06 2 14.72 2 12 2s-3.06 0-4.12.06a7.3 7.3 0 0 0-2.43.47A4.78 4.78 0 0 0 3.68 3.68 4.7 4.7 0 0 0 2.53 5.45a7.3 7.3 0 0 0-.47 2.43C2 8.94 2 9.28 2 12s0 3.06.06 4.12a7.3 7.3 0 0 0 .47 2.43 4.7 4.7 0 0 0 1.15 1.77 4.78 4.78 0 0 0 1.77 1.15 7.3 7.3 0 0 0 2.43.47C8.94 22 9.28 22 12 22s3.06 0 4.12-.06a7.3 7.3 0 0 0 2.43-.47 4.7 4.7 0 0 0 1.77-1.15 4.85 4.85 0 0 0 1.16-1.77 7.59 7.59 0 0 0 .46-2.43c0-1.06.06-1.4.06-4.12s0-3.06-.06-4.12zM12 15.33A3.33 3.33 0 1 1 15.33 12 3.33 3.33 0 0 1 12 15.33z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/vincent-machado-da-luz-550a942a2/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg width="20" height="20" fill="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 0h-14C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
