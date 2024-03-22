export default function Carriere() {
  return (
    <div className="relative w-full h-full bg-blanc flex flex-col sm:flex-row items-center justify-center">
      <div className="absolute top-[20%] sm:top-[22%] text-[20px] sm:text-[30px] uppercase left-1/2 -translate-x-1/2 -translate-y-1/2 sm:title font-light">
        Carriere
      </div>
      <p className="text-left text-[16px] px-10 sm:px-0 sm:text-[24px] items-center -mt-[80px] max-w-[790px] font-light">
        VMDL recherche en permanence des avocats et avocats-stagiaires de
        talent.
        <br />
        <br />
        Si vous souhaitez rejoindre notee cabinet et disposez d&apos;excellentes
        references tout en etant au benefice dun parcours academique exemplaire,
        n&apos;hesitez pas a nous faire parvenir votre dossier.
        <br />
        <br />
        Toutes les candidatures seront traitees de maniere confidentielle. Pour
        candidatez, envoyez un mail a l&apos;addresse ci-dessous:
        <br />
        <br />
        <a
          className="underline transition duration-70"
          href="mailto:cabinet@vmdl.ai"
        >
          cabinet@vmdl.ai
        </a>
      </p>
    </div>
  );
}
