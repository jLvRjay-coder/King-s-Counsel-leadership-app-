type SendToSelfButtonsProps = {
  subject: string;
  body: string;
};

export function SendToSelfButtons({ subject, body }: SendToSelfButtonsProps) {
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);

  return (
    <section className="send-card" aria-label="Send insight to yourself">
      <div>
        <span className="section-label">No storage</span>
        <h2>Send the insight to yourself.</h2>
        <p>Email or text this counsel. The app does not create accounts, save reflections, or store user history.</p>
      </div>
      <div className="send-actions">
        <a href={`mailto:?subject=${encodedSubject}&body=${encodedBody}`}>Email</a>
        <a href={`sms:?&body=${encodedBody}`}>SMS</a>
      </div>
    </section>
  );
}
