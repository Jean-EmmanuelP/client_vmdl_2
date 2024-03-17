import ContactContent from "./Contact-content";
import { useData } from "../utils/DataContext";

export default function Contact() {
  const { data } = useData();
  if (!data) {
    return;
  }
  return (
    <section
      id="Contact"
      className="relative w-full h-full flex justify-center items-center bg-blanc text-noir"
    >
      <ContactContent />
    </section>
  );
}
