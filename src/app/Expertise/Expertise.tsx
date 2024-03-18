import { useData } from "../utils/DataContext";
import ExpertiseContent from "./ExpertiseContent";

export default function Expertise() {
  const { data } = useData();
  if (!data) {
    return null;
  }
  return <ExpertiseContent />;
}
