export default function Carriere() {
  return (
    <div className="w-full h-full bg-blanc flex flex-col sm:flex-row items-center justify-center">
      <div className="w-full sm:w-[40%] h-[30%] sm:h-full">
        <img
          src="/images/court-hammer-books-judgment-law-concept.jpg"
          alt=""
          className="object-cover w-full h-full"
        />
      </div>
      <div className="w-full sm:w-[60%] h-[70%] sm:h-full flex items-center justify-center">
        <p className="w-[70%] text-left">
          VMDL recherche en permanence des avocats et
          avocats-stagiaires de talent.
          <br />
          <br />
          Si vous souhaitez rejoindre notee cabinet et disposez
          d&apos;excellentes references tout en etant au benefice dun parcours
          academique exemplaire, n&apos;hesitez pas a nous faire parvenir votre
          dossier.
          <br />
          <br />
          Toutes les candidatures seront traitees de maniere confidentielle.
          Pour candidatez, envoyez un mail a l&apos;addresse ci-dessous:
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
    </div>
  );
}
