export default function Avatar({
  initials,
  tone = "purple",
  small = false,
}: {
  initials: string;
  tone?: string;
  small?: boolean;
}) {
  return <span className={`avatar avatar-${tone} ${small ? "avatar-small" : ""}`}>{initials}</span>;
}
