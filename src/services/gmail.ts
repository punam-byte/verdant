import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
  signOut,
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

// All required Gmail scopes matching the granted OAuth scopes
export const GMAIL_SCOPES = [
  'https://mail.google.com/',
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.compose',
  'https://www.googleapis.com/auth/gmail.modify',
];

const provider = new GoogleAuthProvider();
GMAIL_SCOPES.forEach((scope) => {
  provider.addScope(scope);
});
provider.setCustomParameters({
  prompt: 'select_account',
});

// Flag to indicate ongoing sign-in flow
let isSigningIn = false;
// In-memory token cache (never stored in localStorage)
let cachedAccessToken: string | null = null;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user && cachedAccessToken) {
      if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to retrieve access token from Google sign in');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Google Sign In Error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const logoutGoogle = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

export interface GmailMessageSummary {
  id: string;
  threadId: string;
  snippet?: string;
  subject?: string;
  from?: string;
  to?: string;
  date?: string;
  body?: string;
}

export interface GmailProfile {
  emailAddress: string;
  messagesTotal: number;
  threadsTotal: number;
  historyId: string;
}

// Fetch user profile from Gmail API
export const fetchGmailProfile = async (token: string): Promise<GmailProfile> => {
  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/profile', {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Failed to fetch profile: ${res.statusText}`);
  }
  return res.json();
};

// Base64URL encoder for RFC 2822 emails
const encodeBase64Url = (str: string): string => {
  return btoa(unescape(encodeURIComponent(str)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

// Send email through Gmail API with RFC 2822 payload
export const sendGmailMessage = async (
  token: string,
  params: {
    to: string;
    subject: string;
    body: string;
  }
): Promise<{ id: string; threadId: string }> => {
  const { to, subject, body } = params;

  // RFC 2822 message format
  const rawEmail = [
    `To: ${to}`,
    `Subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`,
    'Content-Type: text/plain; charset="UTF-8"',
    'MIME-Version: 1.0',
    '',
    body,
  ].join('\r\n');

  const encoded = encodeBase64Url(rawEmail);

  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ raw: encoded }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Gmail API send failed: ${res.statusText}`);
  }

  return res.json();
};

// List messages from Gmail
export const listGmailMessages = async (
  token: string,
  query: string = '',
  maxResults: number = 10
): Promise<{ messages: { id: string; threadId: string }[]; resultSizeEstimate: number }> => {
  const url = new URL('https://gmail.googleapis.com/gmail/v1/users/me/messages');
  if (query) url.searchParams.set('q', query);
  url.searchParams.set('maxResults', maxResults.toString());

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Failed to list messages: ${res.statusText}`);
  }

  return res.json();
};

// Fetch full message details
export const fetchGmailMessageDetails = async (
  token: string,
  messageId: string
): Promise<GmailMessageSummary> => {
  const res = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}?format=full`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Failed to fetch message ${messageId}`);
  }

  const data = await res.json();

  let subject = '(No Subject)';
  let from = '';
  let to = '';
  let date = '';

  const headers = data.payload?.headers || [];
  headers.forEach((h: { name: string; value: string }) => {
    const name = h.name.toLowerCase();
    if (name === 'subject') subject = h.value;
    if (name === 'from') from = h.value;
    if (name === 'to') to = h.value;
    if (name === 'date') date = h.value;
  });

  // Extract body
  let body = data.snippet || '';
  if (data.payload?.body?.data) {
    try {
      body = decodeURIComponent(escape(atob(data.payload.body.data.replace(/-/g, '+').replace(/_/g, '/'))));
    } catch {
      // fallback to snippet
    }
  } else if (data.payload?.parts) {
    const textPart = data.payload.parts.find((p: any) => p.mimeType === 'text/plain');
    if (textPart?.body?.data) {
      try {
        body = decodeURIComponent(escape(atob(textPart.body.data.replace(/-/g, '+').replace(/_/g, '/'))));
      } catch {
        // fallback to snippet
      }
    }
  }

  return {
    id: data.id,
    threadId: data.threadId,
    snippet: data.snippet,
    subject,
    from,
    to,
    date,
    body,
  };
};
