type ScriptureBlockProps = {
  reference: string;
  text: string;
};

export function ScriptureBlock({ reference, text }: ScriptureBlockProps) {
  return (
    <figure className="scripture-block">
      <figcaption>{reference}</figcaption>
      <blockquote>“{text}”</blockquote>
    </figure>
  );
}
