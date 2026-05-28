// Floating quick-contact buttons (Phone + WhatsApp). Pinned to the
// bottom-left of /articles and /expertises/contentieux-penal (NOT the
// home — by design). Plain server component, no JS needed.
const PHONE_RAW = "33757417287"; // +33 7 57 41 72 87
const PHONE_DISPLAY = "+33 7 57 41 72 87";
// Direct, professional pre-fill. Gives the caller a frame to fill in
// 5 seconds without the polite intro nobody writes in a hurry.
const WHATSAPP_PREFILL =
  "Bonjour Maître, je souhaite être rappelé dans les meilleurs délais.\n\nContexte : [garde à vue / convocation / mise en examen / dossier sportif / autre]\nNom : ";

export default function WhatsAppFab() {
  const waHref = `https://wa.me/${PHONE_RAW}?text=${encodeURIComponent(
    WHATSAPP_PREFILL
  )}`;
  const telHref = `tel:+${PHONE_RAW}`;

  return (
    <div className="fixed left-4 bottom-4 sm:left-6 sm:bottom-6 z-[2147483646] flex flex-col items-start gap-3">
      <a
        href={telHref}
        aria-label={`Appeler le cabinet VMDL — ${PHONE_DISPLAY}`}
        data-clickable="true"
        className="flex items-center gap-3 bg-noir text-blanc shadow-2xl shadow-black/40 hover:scale-[1.02] active:scale-95 transition-all duration-300 ease-out h-12 sm:h-14 pl-3 sm:pl-4 pr-4 sm:pr-5"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-5 w-5 sm:h-6 sm:w-6"
          fill="currentColor"
        >
          <path d="M20.487 17.14l-4.065-3.696a1 1 0 00-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 00.043-1.391L6.859 3.513a1 1 0 00-1.391-.087l-2.17 1.861a1 1 0 00-.291.649c-.015.25-.301 6.172 4.291 10.766C11.288 20.689 16.31 21 17.69 21c.201 0 .325-.006.358-.008a.99.99 0 00.648-.292l1.861-2.171a1 1 0 00-.07-1.389z" />
        </svg>
        <span className="flex flex-col leading-tight">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-blanc/60">
            Cabinet · joignable 7j/7
          </span>
          <span className="text-[12px] sm:text-[14px] font-medium tracking-wider">
            {PHONE_DISPLAY}
          </span>
        </span>
      </a>

      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Écrire au cabinet VMDL sur WhatsApp"
        data-clickable="true"
        className="flex items-center gap-2 bg-[#25D366] text-white shadow-2xl shadow-black/30 hover:scale-105 hover:bg-[#1ebe5d] active:scale-95 transition-all duration-300 ease-out h-12 sm:h-14 pl-3 sm:pl-4 pr-4 sm:pr-5"
      >
        <svg
          viewBox="0 0 32 32"
          aria-hidden="true"
          className="h-5 w-5 sm:h-6 sm:w-6"
          fill="currentColor"
        >
          <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39-.066 0-.124-.024-.165-.05-1.214-.527-2.343-1.318-3.276-2.252-.933-.933-1.724-2.062-2.252-3.275-.026-.041-.05-.099-.05-.165 0-.43 1.39-1.146 1.39-1.518 0-.108-.025-.207-.066-.298-.215-.439-.488-.84-.795-1.198-.273-.314-.711-.612-1.131-.612-.215 0-.43.05-.612.158-.703.43-1.207 1.347-1.207 2.16 0 1.547 1.215 3.052 2.16 4.214 1.74 2.116 3.81 3.81 6.298 4.985.793.372 2.165.999 3.052.999.92 0 1.794-.488 2.116-1.265.198-.488.198-.92.149-1.005-.066-.149-.281-.198-.563-.314-.281-.116-1.689-.852-1.951-.951-.265-.099-.512-.149-.728-.149zm-3.045 11.405h-.025c-2.534-.001-5.019-.679-7.186-1.964l-.515-.305-5.354 1.404 1.425-5.214-.336-.539a13.214 13.214 0 01-2.029-7.064c.003-7.314 5.957-13.267 13.275-13.267 3.546 0 6.876 1.383 9.38 3.892a13.18 13.18 0 013.881 9.379c-.003 7.314-5.958 13.268-13.272 13.268m11.293-24.561a15.847 15.847 0 00-11.291-4.679c-8.799 0-15.961 7.161-15.964 15.964a15.946 15.946 0 002.135 7.986l-2.27 8.293 8.488-2.225a15.96 15.96 0 007.626 1.939h.007c8.799 0 15.961-7.161 15.964-15.964a15.857 15.857 0 00-4.69-11.299" />
        </svg>
        <span className="text-[12px] sm:text-[13px] font-medium uppercase tracking-wider">
          WhatsApp
        </span>
      </a>
    </div>
  );
}
