import { MouseEvent, useState } from 'react';

type SendToSelfButtonsProps = {
  subject: string;
  body: string;
};

async function copyToClipboard(text: string) {
  if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.setAttribute('readonly', 'true');
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';

  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
}

export function SendToSelfButtons({ subject, body }: SendToSelfButtonsProps) {
  const [copiedAction, setCopiedAction] = useState('');

  const fullShareText = `${subject}\n\n${body}`;

  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  const encodedShareText = encodeURIComponent(fullShareText);

  const smsUrl = `sms:?&body=${encodedBody}`;
  const emailUrl = `mailto:?subject=${encodedSubject}&body=${encodedBody}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&su=${encodedSubject}&body=${encodedBody}`;
  const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?subject=${encodedSubject}&body=${encodedBody}`;
  const whatsappUrl = `https://wa.me/?text=${encodedShareText}`;
  const telegramUrl = `https://t.me/share/url?text=${encodedShareText}`;

  const markCopied = (action: string) => {
    setCopiedAction(action);

    window.setTimeout(() => {
      setCopiedAction('');
    }, 1600);
  };

  const handleCopy = async (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    try {
      await copyToClipboard(fullShareText);
      markCopied('copy');
    } catch {
      markCopied('error');
    }
  };

  const handleCopyForSlack = async (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    try {
      await copyToClipboard(fullShareText);
      markCopied('slack');
    } catch {
      markCopied('error');
    }
  };

  return (
    <section className="send-card" aria-label="Send insight to yourself">
      <div className="send-card-copy">
        <span className="section-label">No storage</span>
        <h2>Keep a copy of this insight.</h2>
        <p>
          Send or copy this counsel without creating an account. The app does not save reflections
          or store user history.
        </p>
      </div>

      <div className="send-card-controls">
        <div className="send-primary-actions" aria-label="Primary share actions">
          <a href={smsUrl}>SMS</a>
          <a href={emailUrl}>Email</a>
          <a href="#copy" onClick={handleCopy}>
            {copiedAction === 'copy' ? 'Copied' : copiedAction === 'error' ? 'Error' : 'Copy'}
          </a>
        </div>

        <details className="send-more">
          <summary>More Options</summary>

          <div className="send-secondary-actions" aria-label="More share options">
            <a href={gmailUrl} target="_blank" rel="noreferrer">
              Gmail
            </a>

            <a href={outlookUrl} target="_blank" rel="noreferrer">
              Outlook
            </a>

            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              WhatsApp
            </a>

            <a href={telegramUrl} target="_blank" rel="noreferrer">
              Telegram
            </a>

            <a href="#copy-for-slack" onClick={handleCopyForSlack}>
              {copiedAction === 'slack' ? 'Copied' : 'Slack Copy'}
            </a>
          </div>
        </details>
      </div>
    </section>
  );
}
