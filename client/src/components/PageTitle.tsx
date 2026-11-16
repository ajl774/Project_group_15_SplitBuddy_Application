export default function PageTitle({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="page-heading">
      <p>{eyebrow}</p>
      <h1>{title}</h1>
      <span>{copy}</span>
    </div>
  );
}
