type ReflectionBlockProps = {
  prompts: string[];
};

export function ReflectionBlock({ prompts }: ReflectionBlockProps) {
  return (
    <section className="reflection-card" aria-labelledby="reflection-title">
      <span className="section-label">Reflection</span>
      <h2 id="reflection-title">Answer as a steward, not a spectator.</h2>
      <div className="reflection-list">
        {prompts.map((prompt, index) => (
          <div className="reflection-item" key={prompt}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <p>{prompt}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
