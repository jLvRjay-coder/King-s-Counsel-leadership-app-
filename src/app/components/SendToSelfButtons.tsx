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

const componentStyles = `
  .kc-send-card {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: clamp(24px, 5vw, 60px);
    border-radius: 28px;
    padding: clamp(26px, 5vw, 46px);
    margin-bottom: 22px;
    border: 1px solid rgba(52, 44, 32, 0.12);
    background: rgba(23, 32, 42, 0.92);
    color: #f8f4ea;
    box-shadow: 0 30px 80px rgba(23, 32, 42, 0.19);
  }

  .kc-send-copy {
    max-width: 700px;
  }

  .kc-send-label {
    display: inline-flex;
    align-items: center;
    color: #a98237;
    font-size: 0.78rem;
    font-weight: 750;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    margin-bottom: 16px;
  }

  .kc-send-title {
    margin: 0 0 14px;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(2rem, 4vw, 3.5rem);
    line-height: 0.96;
    letter-spacing: -0.035em;
    color: #f8f4ea;
  }

  .kc-send-text {
    margin: 0;
    max-width: 680px;
    color: rgba(248, 244, 234, 0.76);
    line-height: 1.72;
    font-size: 1rem;
  }

  .kc-send-controls {
    display: grid;
    justify-items: end;
    align-content: center;
    gap: 12px;
    min-width: 320px;
  }

  .kc-send-primary {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
    flex-wrap: nowrap;
  }

  .kc-pill,
  .kc-pill-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 50px;
    min-width: 92px;
    padding: 0 22px;
    border-radius: 999px;
    border: 0;
    background: #d8bd7a;
    color: #17202a;
    text-decoration: none;
    font-size: 0.98rem;
    font-weight: 800;
    line-height: 1;
    white-space: nowrap;
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
    transition: transform 160ms ease, opacity 160ms ease;
  }

  .kc-pill:hover,
  .kc-pill-button:hover {
    transform: translateY(-1px);
  }

  .kc-pill-button {
    cursor: pointer;
  }

  .kc-send-more {
    width: 100%;
    text-align: right;
  }

  .kc-send-more summary {
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
    list-style: none;
    cursor: pointer;
    color: rgba(248, 244, 234, 0.9);
    font-size: 0.95rem;
    font-weight: 700;
    user-select: none;
  }

  .kc-send-more summary::-webkit-details-marker {
    display: none;
  }

  .kc-send-more summary::before {
    content: "▸";
    margin-right: 8px;
    font-size: 0.95rem;
    line-height: 1;
  }

  .kc-send-more[open] summary::before {
    content: "▾";
  }

  .kc-send-secondary {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 14px;
    max-width: 360px;
  }

  .kc-send-secondary .kc-pill,
  .kc-send-secondary .kc-pill-button {
    min-height: 40px;
    min-width: 0;
    padding: 0 16px;
    background: rgba(255, 252, 246, 0.12);
    color: #f8f4ea;
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: none;
    font-size: 0.9rem;
  }

  @media (max-width: 720px) {
    .kc-send-card {
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .kc-send-controls {
      justify-items: start;
      min-width: 0;
      width: 100%;
    }

    .kc-send-primary {
      justify-content: flex-start;
      flex-wrap: wrap;
    }

    .kc-send-more {
      text-align: left;
    }

    .kc-send-secondary {
      justify-content: flex-start;
      max-width: none;
    }
  }
`;

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

  const handleCopy = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      await copyToClipboard(fullShareText);
      markCopied('copy');
    } catch {
      markCopied('error');
    }
  };

  const handleCopyForSlack = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      await copyToClipboard(fullShareText);
      markCopied('slack');
    } catch {
      markCopied('error');
    }
  };

  return (
    <>
      <style>{componentStyles}</style>

      <section className="kc-send-card" aria-label="Send insight to yourself">
        <div className="kc-send-copy">
          <span className="kc-send-label">No storage</span>
          <h2 className="kc-send-title">Keep a copy of this insight.</h2>
          <p className="kc-send-text">
            Send or copy this counsel without creating an account. The app does not save reflections
            or store user history.
          </p>
        </div>

        <div className="kc-send-controls">
          <div className="kc-send-primary" aria-label="Primary share actions">
            <a className="kc-pill" href={smsUrl}>
              SMS
            </a>

            <a className="kc-pill" href={emailUrl}>
              Email
            </a>

            <button className="kc-pill-button" type="button" onClick={handleCopy}>
              {copiedAction === 'copy'
                ? 'Copied'
                : copiedAction === 'error'
                  ? 'Error'
                  : 'Copy'}
            </button>
          </div>

          <details className="kc-send-more">
            <summary>More Options</summary>

            <div className="kc-send-secondary" aria-label="More share options">
              <a className="kc-pill" href={gmailUrl} target="_blank" rel="noreferrer">
                Gmail
              </a>

              <a className="kc-pill" href={outlookUrl} target="_blank" rel="noreferrer">
                Outlook
              </a>

              <a className="kc-pill" href={whatsappUrl} target="_blank" rel="noreferrer">
                WhatsApp
              </a>

              <a className="kc-pill" href={telegramUrl} target="_blank" rel="noreferrer">
                Telegram
              </a>

              <button className="kc-pill-button" type="button" onClick={handleCopyForSlack}>
                {copiedAction === 'slack' ? 'Copied' : 'Slack Copy'}
              </button>
            </div>
          </details>
        </div>
      </section>
    </>
  );
}
