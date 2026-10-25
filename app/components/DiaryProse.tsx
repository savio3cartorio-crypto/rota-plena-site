export default function DiaryProse({ body }: { body: string }) {
  const blocks = body.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean);
  return <div className="public-diary-prose">{blocks.map((block, index) => block.startsWith("## ")
    ? <h2 key={`${block}-${index}`}>{block.slice(3)}</h2>
    : block.startsWith("“") || block.startsWith('"')
      ? <blockquote key={`${block}-${index}`}>{block}</blockquote>
      : <p key={`${block}-${index}`}>{block}</p>)}</div>;
}

