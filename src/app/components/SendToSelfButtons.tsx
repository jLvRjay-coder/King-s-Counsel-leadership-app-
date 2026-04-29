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

  const emailUrl = `mailto:?subject=${encodedSubject}&body=${encodedBody}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&su=${encodedSubject}&body=${encodedBody}`;
  const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?subject=${encodedSubject}&body=${encodedBody}`;
  const smsUrl = `sms:?&body=${encodedBody}`;
  const whatsappUrl = `https://wa.me/?text=${encodedShareText}`;
  const telegramUrl = `https://t.me/share/url?text=${encodedShareText}`;

  const markCopied = (action: string) => {
    setCopiedAction(action);

    window.setTimeout(() => {
      setCopiedAction('');
    }, 1600);
  };

  const handleNativeShare = async (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    try {
      if (navigator.share) {
        await navigator.share({
          title: subject,
          text: body,
        });
        return;
      }

      await copyToClipboard(fullShareText);
      markCopied('share');
    } catch {
      // User may cancel the native share sheet. No error display needed.
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

  const handleCopy = async (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    try {
      await copyToClipboard(fullShareText);
      markCopied('copy');
    } catch {
      markCopied('error');
    }
  };

  return (
    <section className="send-card" aria-label="Send insight to yourself">
      <div>
        <span className="section-label">No storage</span>
        <h2>Send the insight to yourself.</h2>
        <p>
          Email, text, or share this counsel. The app does not create accounts, save reflections,
          or store user history.
        </p>
      </div>

      <div className="send-actions">
        <a href={emailUrl}>Email</a>

        <a href={gmailUrl} target="_blank" rel="noreferrer">
          Gmail
        </a>

        <a href={outlookUrl} target="_blank" rel="noreferrer">
          Outlook
        </a>

        <a href={smsUrl}>SMS</a>

        <a href={whatsappUrl} target="_blank" rel="noreferrer">
          WhatsApp
        </a>

        <a href={telegramUrl} target="_blank" rel="noreferrer">
          Telegram
        </a>

        <a href="#share" onClick={handleNativeShare}>
          {copiedAction === 'share' ? 'Copied' : 'Share'}
        </a>

        <a href="#copy-for-slack" onClick={handleCopyForSlack}>
          {copiedAction === 'slack' ? 'Copied' : 'Slack Copy'}
        </a>

        <a href="#copy" onClick={handleCopy}>
          {copiedAction === 'copy' ? 'Copied' : copiedAction === 'error' ? 'Error' : 'Copy'}
        </a>
      </div>
    </section>
  );
}
