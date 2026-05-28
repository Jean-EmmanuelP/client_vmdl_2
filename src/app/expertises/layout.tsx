import WhatsAppFab from "../Components/WhatsAppFab";

export default function ExpertisesIndexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="articles-section">
      {children}
      <WhatsAppFab />
    </div>
  );
}
