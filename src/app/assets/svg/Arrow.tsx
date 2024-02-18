interface ArrowProps {
  fill?: string;
  width?: string;
  height?: string;
  viewBox?: string;
  baseProfile?: string;
  xmlns?: string;
  overflow?: string;
  reversed?: boolean;
}

const Arrow = (props: ArrowProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 16 16"
    {...props}
  >
    <defs />
    <defs>
      <path
        id="dduq1q"
        d="M13 9V7h3v2h-3zM7.03233022 1l1.43859292 1.43076034-4.58011387 4.55637467H10v2.02471813H3.89080927l4.58011387 4.55637466L7.03233022 15 0 8l.71777145-.71538017.71878813-.71639202L7.03233022 1z"
      />
    </defs>
    <use
      fill="currentColor"
      fillRule="evenodd"
      transform="matrix(-1 0 0 1 16 0)"
      xlinkHref="#dduq1q"
    />
  </svg>
);
export default Arrow;