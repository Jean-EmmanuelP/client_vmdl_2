// Floating "WhatsApp the firm" button. Pinned to the bottom-left of every
// page, always tappable. Plain server component (no JS needed) so it
// renders on first paint and is crawlable by search engines.
export default function WhatsAppFab() {
  const phone = "33757417287"; // +33 7 57 41 72 87
  const prefill = encodeURIComponent(
    "Bonjour Maître, je souhaite échanger avec le cabinet VMDL."
  );
  const href = `https://wa.me/${phone}?text=${prefill}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter le cabinet VMDL sur WhatsApp"
      data-clickable="true"
      className="fixed left-4 bottom-4 sm:left-6 sm:bottom-6 z-[2147483646] flex items-center gap-2 rounded-full bg-[#25D366] text-white shadow-2xl shadow-black/30 hover:scale-105 hover:bg-[#1ebe5d] active:scale-95 transition-all duration-300 ease-out h-12 w-12 sm:h-14 sm:w-14 justify-center"
    >
      {/* Inline WhatsApp glyph — no external asset, no extra request. */}
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="h-7 w-7 sm:h-8 sm:w-8"
        fill="currentColor"
      >
        <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39-.066 0-.124-.024-.165-.05-1.214-.527-2.343-1.318-3.276-2.252-.933-.933-1.724-2.062-2.252-3.275-.026-.041-.05-.099-.05-.165 0-.43 1.39-1.146 1.39-1.518 0-.108-.025-.207-.066-.298-.215-.439-.488-.84-.795-1.198-.273-.314-.711-.612-1.131-.612-.215 0-.43.05-.612.158-.703.43-1.207 1.347-1.207 2.16 0 1.547 1.215 3.052 2.16 4.214 1.74 2.116 3.81 3.81 6.298 4.985.793.372 2.165.999 3.052.999.92 0 1.794-.488 2.116-1.265.198-.488.198-.92.149-1.005-.066-.149-.281-.198-.563-.314-.281-.116-1.689-.852-1.951-.951-.265-.099-.512-.149-.728-.149zm-3.045 11.405h-.025c-2.534-.001-5.019-.679-7.186-1.964l-.515-.305-5.354 1.404 1.425-5.214-.336-.539a13.214 13.214 0 01-2.029-7.064c.003-7.314 5.957-13.267 13.275-13.267 3.546 0 6.876 1.383 9.38 3.892a13.18 13.18 0 013.881 9.379c-.003 7.314-5.958 13.268-13.272 13.268m11.293-24.561a15.847 15.847 0 00-11.291-4.679c-8.799 0-15.961 7.161-15.964 15.964a15.946 15.946 0 002.135 7.986l-2.27 8.293 8.488-2.225a15.96 15.96 0 007.626 1.939h.007c8.799 0 15.961-7.161 15.964-15.964a15.857 15.857 0 00-4.69-11.299" />
      </svg>
    </a>
  );
}
