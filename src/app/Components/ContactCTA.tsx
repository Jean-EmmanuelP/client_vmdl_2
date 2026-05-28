// Reusable contact CTA block. Three buttons (Phone / WhatsApp / Email)
// + an urgency line. Used on /articles, on each /articles/[slug] page,
// and on /expertises/contentieux-penal so the visitor never has to
// scroll back to the navbar to reach the firm.
//
// `variant`:
//   - "default": dark background, white text — strong end-of-page block
//   - "inline":  light background, used inside content flow

const PHONE_DISPLAY = "07 57 41 72 87";
const PHONE_TEL = "+33757417287";
const WA_PREFILL =
  "Bonjour Maître, je souhaite échanger avec le cabinet VMDL au sujet d'une affaire pénale.";

export default function ContactCTA({
  variant = "default",
  eyebrow,
  title,
  body,
}: {
  variant?: "default" | "inline";
  eyebrow?: string;
  title?: string;
  body?: string;
}) {
  const isDark = variant === "default";

  const wa = `https://wa.me/${PHONE_TEL.replace(
    "+",
    ""
  )}?text=${encodeURIComponent(WA_PREFILL)}`;

  return (
    <aside
      aria-label="Contacter le cabinet VMDL"
      className={
        isDark
          ? "mt-16 sm:mt-20 bg-noir text-blanc px-6 sm:px-10 py-10 sm:py-14"
          : "mt-12 sm:mt-16 border-t border-noir/15 pt-10 sm:pt-14"
      }
    >
      <p
        className={`uppercase text-[10px] sm:text-[11px] tracking-[0.3em] mb-2 ${
          isDark ? "text-blanc/55" : "text-noir/45"
        }`}
      >
        {eyebrow ?? "Urgence pénale — réponse immédiate"}
      </p>
      <h2
        className={`uppercase text-[22px] sm:text-[30px] leading-[1.15] font-light max-w-3xl ${
          isDark ? "text-blanc" : "text-noir"
        }`}
      >
        {title ?? "Garde à vue, convocation, mise en examen ?"}
      </h2>
      <p
        className={`mt-3 max-w-2xl text-[13px] sm:text-[15px] leading-[1.7] font-light ${
          isDark ? "text-blanc/75" : "text-noir/65"
        }`}
      >
        {body ??
          "Maître Vincent Machado Da Luz intervient dès la première heure de garde à vue. Le cabinet répond en direct, 7j/7, pour toute urgence pénale."}
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={`tel:${PHONE_TEL}`}
          data-clickable="true"
          aria-label={`Appeler Maître Vincent Machado Da Luz au ${PHONE_DISPLAY}`}
          className={
            isDark
              ? "inline-flex items-center gap-2 bg-blanc text-noir px-5 py-3 text-[11px] sm:text-[13px] uppercase tracking-[0.25em] hover:opacity-85 transition font-medium"
              : "inline-flex items-center gap-2 bg-noir text-blanc px-5 py-3 text-[11px] sm:text-[13px] uppercase tracking-[0.25em] hover:opacity-85 transition font-medium"
          }
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
            <path d="M20.487 17.14l-4.065-3.696a1 1 0 00-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 00.043-1.391L6.859 3.513a1 1 0 00-1.391-.087l-2.17 1.861a1 1 0 00-.291.649c-.015.25-.301 6.172 4.291 10.766C11.288 20.689 16.31 21 17.69 21c.201 0 .325-.006.358-.008a.99.99 0 00.648-.292l1.861-2.171a1 1 0 00-.07-1.389z" />
          </svg>
          Appeler · {PHONE_DISPLAY}
        </a>

        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          data-clickable="true"
          aria-label="Écrire au cabinet VMDL sur WhatsApp"
          className={
            isDark
              ? "inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-3 text-[11px] sm:text-[13px] uppercase tracking-[0.25em] hover:bg-[#1ebe5d] transition font-medium"
              : "inline-flex items-center gap-2 border border-noir/30 text-noir px-5 py-3 text-[11px] sm:text-[13px] uppercase tracking-[0.25em] hover:bg-noir hover:text-blanc transition font-medium"
          }
        >
          <svg viewBox="0 0 32 32" className="h-4 w-4" fill="currentColor" aria-hidden="true">
            <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39-.066 0-.124-.024-.165-.05-1.214-.527-2.343-1.318-3.276-2.252-.933-.933-1.724-2.062-2.252-3.275-.026-.041-.05-.099-.05-.165 0-.43 1.39-1.146 1.39-1.518 0-.108-.025-.207-.066-.298-.215-.439-.488-.84-.795-1.198-.273-.314-.711-.612-1.131-.612-.215 0-.43.05-.612.158-.703.43-1.207 1.347-1.207 2.16 0 1.547 1.215 3.052 2.16 4.214 1.74 2.116 3.81 3.81 6.298 4.985.793.372 2.165.999 3.052.999.92 0 1.794-.488 2.116-1.265.198-.488.198-.92.149-1.005-.066-.149-.281-.198-.563-.314-.281-.116-1.689-.852-1.951-.951-.265-.099-.512-.149-.728-.149zm-3.045 11.405h-.025c-2.534-.001-5.019-.679-7.186-1.964l-.515-.305-5.354 1.404 1.425-5.214-.336-.539a13.214 13.214 0 01-2.029-7.064c.003-7.314 5.957-13.267 13.275-13.267 3.546 0 6.876 1.383 9.38 3.892a13.18 13.18 0 013.881 9.379c-.003 7.314-5.958 13.268-13.272 13.268m11.293-24.561a15.847 15.847 0 00-11.291-4.679c-8.799 0-15.961 7.161-15.964 15.964a15.946 15.946 0 002.135 7.986l-2.27 8.293 8.488-2.225a15.96 15.96 0 007.626 1.939h.007c8.799 0 15.961-7.161 15.964-15.964a15.857 15.857 0 00-4.69-11.299" />
          </svg>
          WhatsApp
        </a>

        <a
          href="mailto:cabinet@vmdl.ai"
          data-clickable="true"
          aria-label="Écrire au cabinet VMDL par e-mail"
          className={
            isDark
              ? "inline-flex items-center gap-2 border border-blanc/30 text-blanc px-5 py-3 text-[11px] sm:text-[13px] uppercase tracking-[0.25em] hover:bg-blanc hover:text-noir transition"
              : "inline-flex items-center gap-2 border border-noir/30 text-noir px-5 py-3 text-[11px] sm:text-[13px] uppercase tracking-[0.25em] hover:bg-noir hover:text-blanc transition"
          }
        >
          cabinet@vmdl.ai
        </a>
      </div>

      <p
        className={`mt-6 text-[11px] sm:text-[12px] leading-[1.5] font-light max-w-2xl ${
          isDark ? "text-blanc/55" : "text-noir/50"
        }`}
      >
        Cabinet VMDL · 2 rue de Poissy, 75005 Paris · Avocat à la Cour ·
        Intervention dès la 1re heure de garde à vue.
      </p>
    </aside>
  );
}
