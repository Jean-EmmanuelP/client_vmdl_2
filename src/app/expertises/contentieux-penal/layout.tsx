// Same trick as /articles: re-enable the native cursor inside this
// section, since the global cursor:none is paired with the CustomCursor
// component which this route does not mount.
export default function ContentieuxPenalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="articles-section">{children}</div>;
}
