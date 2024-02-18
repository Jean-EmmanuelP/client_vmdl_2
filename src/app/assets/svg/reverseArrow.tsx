interface reverseArrowProps {
    fill?: string;
    width?: string;
    height?: string;
    viewBox?: string;
    baseProfile?: string;
    xmlns?: string;
    overflow?: string;
    reversed?: boolean; // Ajoutez cette ligne
  }
  
  const ReversedArrow = ({ reversed = false, ...props }: reverseArrowProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M13 9V7h3v2h-3zM7.03233022 1l1.43859292 1.43076034-4.58011387 4.55637467H10v2.02471813H3.89080927l4.58011387 4.55637466L7.03233022 15 0 8l.71777145-.71538017.71878813-.71639202L7.03233022 1z"
      />
    </svg>
  );
  
  export default ReversedArrow;