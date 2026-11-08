import React, { useState, useEffect } from 'react';
import {
  Mail,
  Send,
  Inbox,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  X,
  LogOut,
  ExternalLink,
  Search,
  Sparkles,
  User as UserIcon,
} from 'lucide-react';
import { User } from 'firebase/auth';
import {
  googleSignIn,
  logoutGoogle,
  fetchGmailProfile,
  sendGmailMessage,
  listGmailMessages,
  fetchGmailMessageDetails,
  GmailProfile,
  GmailMessageSummary,
} from '../services/gmail';

interface GmailHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEmailSentNotice?: (details: { to: string; subject: string; body: string; id: string }) => void;
  defaultRecipient?: string;
  defaultSubject?: string;
  defaultBody?: string;
}

export const GmailHubModal: React.FC<GmailHubModalProps> = ({
  isOpen,
  onClose,
  onEmailSentNotice,
  defaultRecipient = 'majumderp937@gmail.com',
  defaultSubject = 'Order & Botanical Sanctuary Update - The Paradise Garden Service',
  defaultBody = '',
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'compose' | 'inbox'>('compose');
  const [profile, setProfile] = useState<GmailProfile | null>(null);

  // Compose State
  const [toEmail, setToEmail] = useState<string>(defaultRecipient);
  const [subject, setSubject] = useState<string>(defaultSubject);
  const [body, setBody] = useState<string>(
    defaultBody ||
      `Dear Sanctuary Member,\n\nGreetings from The Paradise Garden Service (Surat Chapter, 2026).\n\nYour heirloom botanical collection and raised bed planning details are synchronized.\nPrimary Contact: Nitin Kushwaha (+91 9837652655)\nStation: Mani Nagar, Pandesara, Surat, Gujarat.\n\nWarm regards,\nThe Paradise Garden Service Team`
  );
  const [isSending, setIsSending] = useState<boolean>(false);
  const [sendSuccessId, setSendSuccessId] = useState<string | null>(null);
  const [showSendConfirmModal, setShowSendConfirmModal] = useState<boolean>(false);

  // Inbox State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [messages, setMessages] = useState<GmailMessageSummary[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState<boolean>(false);
  const [selectedMessage, setSelectedMessage] = useState<GmailMessageSummary | null>(null);

  // Synchronize defaults if props change
  useEffect(() => {
    if (defaultRecipient) setToEmail(defaultRecipient);
    if (defaultSubject) setSubject(defaultSubject);
    if (defaultBody) setBody(defaultBody);
  }, [defaultRecipient, defaultSubject, defaultBody]);

  const handleSignIn = async () => {
    setIsSigningIn(true);
    setAuthError(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setCurrentUser(res.user);
        setToken(res.accessToken);
        loadProfileAndMessages(res.accessToken);
      }
    } catch (err: any) {
      console.error(err);
      setAuthError(err.message || 'Google Sign-In was cancelled or failed.');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    await logoutGoogle();
    setCurrentUser(null);
    setToken(null);
    setProfile(null);
    setMessages([]);
  };

  const loadProfileAndMessages = async (accessToken: string) => {
    try {
      const p = await fetchGmailProfile(accessToken);
      setProfile(p);
      loadMessages(accessToken);
    } catch (err) {
      console.error('Failed loading profile:', err);
    }
  };

  const loadMessages = async (accessToken: string, query: string = '') => {
    setIsLoadingMessages(true);
    try {
      const list = await listGmailMessages(accessToken, query, 8);
      if (list.messages && list.messages.length > 0) {
        const fullDetails = await Promise.all(
          list.messages.map((m) =>
            fetchGmailMessageDetails(accessToken, m.id).catch(() => ({
              id: m.id,
              threadId: m.threadId,
              subject: '(Could not load)',
              snippet: '',
            }))
          )
        );
        setMessages(fullDetails);
      } else {
        setMessages([]);
      }
    } catch (err: any) {
      console.error('Failed loading messages:', err);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const handleExecuteSend = async () => {
    if (!token) return;
    setShowSendConfirmModal(false);
    setIsSending(true);
    setSendSuccessId(null);
    setAuthError(null);

    try {
      const result = await sendGmailMessage(token, {
        to: toEmail,
        subject,
        body,
      });

      setSendSuccessId(result.id);
      if (onEmailSentNotice) {
        onEmailSentNotice({
          to: toEmail,
          subject,
          body,
          id: result.id,
        });
      }

      // Refresh sent messages
      loadMessages(token);
    } catch (err: any) {
      console.error('Failed to send email:', err);
      setAuthError(err.message || 'Failed to send email via Gmail API.');
    } finally {
      setIsSending(false);
    }
  };

  const applyTemplate = (type: 'order' | 'workshop' | 'clinic') => {
    if (type === 'order') {
      setSubject('Order Confirmation & Nursery Receipt - The Paradise Garden Service');
      setBody(
        `Dear Nitin Kushwaha,\n\nYour heirloom botanical specimens order has been confirmed at The Paradise Garden Service Surat Hub.\n\nORDER SUMMARY:\n• Reference: PGS-ORD-2026\n• Destination: Mani Nagar, Pandesara, Surat\n• Total: ₹1,897 (Paid via UPI/Card)\n• Contact: +91 9837652655\n\nAll specimens are potted in peat-free organic substrate with beneficial mycorrhizal root inoculants.\n\nWarm regards,\nThe Paradise Garden Service`
      );
    } else if (type === 'workshop') {
      setSubject('Conservatory Tour & Masterclass Pass - The Paradise Garden Service');
      setBody(
        `Dear Nitin Kushwaha,\n\nYour digital pass for the Victorian Glasshouse Masterclass is ready.\n\nPASS DETAILS:\n• Code: PGS-PASS-884920\n• Session: High-Humidity Tropical Canopy Tour\n• Location: The Paradise Garden Glasshouse Pavilion, Pandesara, Surat\n• Attendees: 2 Guests\n\nPlease present this email at the pavilion entrance upon arrival.\n\nThe Paradise Garden Service Team`
      );
    } else if (type === 'clinic') {
      setSubject('Plant Clinic Diagnostic Report & Foliage Prescription');
      setBody(
        `Hello Nitin Kushwaha,\n\nHere is your custom diagnostic evaluation from our resident botanist:\n\nDIAGNOSIS:\n• Suspected Condition: Early Chlorosis / Substrate Moisture Imbalance\n• Recommended Remedy: Neem organic oil emulsion with wood ash foliar spray\n• Watering Interval: 4–5 days in Surat climate\n\nQuestions? Reach our nursery hotline at +91 9837652655.\n\nThe Paradise Garden Service Clinic`
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-[#DCE4DA] flex flex-col max-h-[90vh] overflow-hidden z-10">
        {/* Top Header */}
        <div className="p-6 border-b border-[#E7ECE4] bg-[#FAF9F6] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EA4335] text-white flex items-center justify-center shadow-sm">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-xl font-bold text-[#13241B]">
                  Gmail Integration Hub
                </h3>
                <span className="text-[10px] uppercase font-mono font-bold bg-[#EAEFE8] text-[#2D5A3F] px-2 py-0.5 rounded-full">
                  Official Google API
                </span>
              </div>
              <p className="text-xs text-[#55695C]">
                Send and view verified emails directly through your Google Workspace account.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-[#EAEFE8] border border-[#DCE4DA] flex items-center justify-center text-[#465A4F] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Auth State Card */}
          {!currentUser || !token ? (
            <div className="p-8 text-center space-y-5 bg-[#FAF9F6] rounded-2xl border border-[#E7ECE4]">
              <div className="w-14 h-14 rounded-2xl bg-white border border-[#DCE4DA] flex items-center justify-center mx-auto shadow-xs">
                <Mail className="w-7 h-7 text-[#EA4335]" />
              </div>
              <div>
                <h4 className="font-serif text-2xl font-bold text-[#13241B] mb-2">
                  Connect Your Google Account
                </h4>
                <p className="text-xs text-[#55695C] max-w-md mx-auto leading-relaxed">
                  Sign in with Google to send real botanical receipts, conservatory access passes, and clinic reports directly to <strong className="text-[#13241B]">majumderp937@gmail.com</strong> or any recipient via the Gmail API with your permission.
                </p>
              </div>

              {authError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2 max-w-md mx-auto">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              {/* Official "Sign in with Google" Button */}
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={handleSignIn}
                  disabled={isSigningIn}
                  className="gsi-material-button inline-flex items-center justify-center gap-3 px-6 py-3 bg-white border border-[#747775] hover:bg-[#F8FAFC] active:bg-[#EDF2F7] rounded-full text-sm font-semibold text-[#1F1F1F] shadow-sm transition-all cursor-pointer disabled:opacity-50"
                  style={{ minWidth: '240px' }}
                >
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    className="w-5 h-5 shrink-0"
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                  </svg>
                  <span>{isSigningIn ? 'Connecting to Google...' : 'Sign in with Google'}</span>
                </button>
              </div>

              <p className="text-[11px] text-[#788E81]">
                Uses verified Google Workspace OAuth scopes for Gmail sending and reading.
              </p>
            </div>
          ) : (
            <div>
              {/* Connected User Bar */}
              <div className="p-4 bg-[#EEF4ED] border border-[#C8DBC4] rounded-2xl flex items-center justify-between gap-4 mb-5">
                <div className="flex items-center gap-3">
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName || 'Google User'}
                      className="w-10 h-10 rounded-full border border-white shadow-xs"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#1A3828] text-white flex items-center justify-center font-bold">
                      {currentUser.email?.slice(0, 1).toUpperCase() || 'G'}
                    </div>
                  )}
                  <div>
                    <div className="text-xs font-bold text-[#13241B] flex items-center gap-1.5">
                      <span>{currentUser.displayName || 'Google Account Connected'}</span>
                      <CheckCircle className="w-3.5 h-3.5 text-[#2D5A3F]" />
                    </div>
                    <div className="text-[11px] font-mono text-[#465A4F]">
                      {currentUser.email || profile?.emailAddress || 'majumderp937@gmail.com'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {profile && (
                    <div className="hidden sm:block text-right text-[11px] font-mono text-[#55695C] pr-2">
                      <div>Mailbox Total: {profile.messagesTotal.toLocaleString()} emails</div>
                    </div>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="p-2 text-xs text-[#B91C1C] hover:bg-white rounded-lg transition-colors flex items-center gap-1 border border-transparent hover:border-[#DCE4DA]"
                    title="Disconnect Google Account"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Disconnect</span>
                  </button>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-2 border-b border-[#E7ECE4] pb-2 mb-5">
                <button
                  onClick={() => setActiveTab('compose')}
                  className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 ${
                    activeTab === 'compose'
                      ? 'bg-[#1A3828] text-white'
                      : 'text-[#55695C] hover:bg-[#F2F5F0]'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Real Email</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('inbox');
                    if (token) loadMessages(token, searchQuery);
                  }}
                  className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 ${
                    activeTab === 'inbox'
                      ? 'bg-[#1A3828] text-white'
                      : 'text-[#55695C] hover:bg-[#F2F5F0]'
                  }`}
                >
                  <Inbox className="w-3.5 h-3.5" />
                  <span>View Gmail Messages</span>
                </button>
              </div>

              {/* Compose Tab */}
              {activeTab === 'compose' && (
                <div className="space-y-4">
                  {/* Preset Template Chips */}
                  <div>
                    <label className="block text-xs font-semibold text-[#13241B] mb-1.5">
                      Quick Botanical Templates
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => applyTemplate('order')}
                        className="px-3 py-1 text-xs bg-[#FAF9F6] border border-[#DCE4DA] hover:bg-[#EAEFE8] rounded-lg text-[#13241B] transition-colors"
                      >
                        📦 Order Confirmation
                      </button>
                      <button
                        type="button"
                        onClick={() => applyTemplate('workshop')}
                        className="px-3 py-1 text-xs bg-[#FAF9F6] border border-[#DCE4DA] hover:bg-[#EAEFE8] rounded-lg text-[#13241B] transition-colors"
                      >
                        🏛️ Conservatory Pass
                      </button>
                      <button
                        type="button"
                        onClick={() => applyTemplate('clinic')}
                        className="px-3 py-1 text-xs bg-[#FAF9F6] border border-[#DCE4DA] hover:bg-[#EAEFE8] rounded-lg text-[#13241B] transition-colors"
                      >
                        🌿 Clinic Diagnostic
                      </button>
                    </div>
                  </div>

                  {/* To Field */}
                  <div>
                    <label className="block text-xs font-semibold text-[#13241B] mb-1">
                      Recipient Email (To:)
                    </label>
                    <input
                      type="email"
                      required
                      value={toEmail}
                      onChange={(e) => setToEmail(e.target.value)}
                      placeholder="e.g. majumderp937@gmail.com"
                      className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#DCE4DA] rounded-xl text-[#13241B] focus:outline-none focus:ring-1 focus:ring-[#2D5A3F]"
                    />
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label className="block text-xs font-semibold text-[#13241B] mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Email subject line"
                      className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#DCE4DA] rounded-xl text-[#13241B] focus:outline-none focus:ring-1 focus:ring-[#2D5A3F]"
                    />
                  </div>

                  {/* Body Field */}
                  <div>
                    <label className="block text-xs font-semibold text-[#13241B] mb-1">
                      Message Content (RFC 2822)
                    </label>
                    <textarea
                      rows={6}
                      required
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-mono bg-[#FAF9F6] border border-[#DCE4DA] rounded-xl text-[#13241B] focus:outline-none focus:ring-1 focus:ring-[#2D5A3F] leading-relaxed"
                    />
                  </div>

                  {/* Success Banner */}
                  {sendSuccessId && (
                    <div className="p-3 bg-[#EEF4ED] border border-[#C8DBC4] rounded-xl text-xs text-[#2D5A3F] flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 shrink-0" />
                      <span>
                        Success! Email dispatched to <strong>{toEmail}</strong> via Gmail API (Message ID: {sendSuccessId}).
                      </span>
                    </div>
                  )}

                  {authError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>{authError}</span>
                    </div>
                  )}

                  {/* Send Action Trigger */}
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-[#788E81]">
                      Requires user confirmation before sending.
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowSendConfirmModal(true)}
                      disabled={isSending || !toEmail || !subject}
                      className="px-6 py-2.5 text-xs font-semibold text-white bg-[#1A3828] hover:bg-[#254F39] rounded-xl transition-colors shadow-sm disabled:opacity-50 flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSending ? 'Sending via Gmail...' : 'Send Email via Gmail'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Inbox Tab */}
              {activeTab === 'inbox' && (
                <div className="space-y-4">
                  {/* Search Bar */}
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#788E81]" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search emails in your Gmail (e.g. Paradise, Order)..."
                        className="w-full pl-8 pr-3 py-2 text-xs bg-[#FAF9F6] border border-[#DCE4DA] rounded-xl text-[#13241B] focus:outline-none focus:ring-1 focus:ring-[#2D5A3F]"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && token) {
                            loadMessages(token, searchQuery);
                          }
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => token && loadMessages(token, searchQuery)}
                      disabled={isLoadingMessages}
                      className="px-4 py-2 text-xs font-semibold text-[#1A3828] bg-[#FAF9F6] border border-[#DCE4DA] hover:bg-[#EAEFE8] rounded-xl transition-colors flex items-center gap-1.5"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isLoadingMessages ? 'animate-spin' : ''}`} />
                      <span>Search / Refresh</span>
                    </button>
                  </div>

                  {/* Messages List */}
                  {isLoadingMessages ? (
                    <div className="py-12 text-center text-xs text-[#788E81] space-y-2">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#2D5A3F]" />
                      <div>Fetching messages from Gmail API...</div>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="py-12 text-center text-xs text-[#788E81]">
                      No messages found matching your query in Gmail.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          onClick={() => setSelectedMessage(selectedMessage?.id === msg.id ? null : msg)}
                          className="p-3.5 rounded-xl border border-[#E7ECE4] bg-[#FAF9F6] hover:border-[#C8D6C4] transition-all cursor-pointer space-y-1.5"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-[#13241B] truncate max-w-[280px]">
                              {msg.subject || '(No Subject)'}
                            </span>
                            <span className="text-[10px] text-[#788E81] font-mono shrink-0">
                              {msg.date ? new Date(msg.date).toLocaleDateString() : ''}
                            </span>
                          </div>
                          <div className="text-[11px] text-[#55695C] font-mono">
                            From: {msg.from || 'Unknown'}
                          </div>
                          <div className="text-xs text-[#6B7D72] line-clamp-2 font-sans">
                            {msg.snippet}
                          </div>

                          {selectedMessage?.id === msg.id && msg.body && (
                            <div className="mt-3 pt-3 border-t border-[#EEF2EB] text-xs font-mono bg-white p-3 rounded-lg whitespace-pre-line text-[#13241B]">
                              {msg.body}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E7ECE4] bg-[#FAF9F6] flex items-center justify-between text-xs text-[#788E81]">
          <span className="font-mono text-[11px]">
            Target Address: {toEmail}
          </span>
          <button
            onClick={onClose}
            className="text-xs font-semibold text-[#1A3828] hover:underline"
          >
            Close Gmail Hub
          </button>
        </div>
      </div>

      {/* Mandatory User Confirmation Dialog Before Sending Email (Destructive/Mutating Action Rule) */}
      {showSendConfirmModal && (
        <div className="fixed inset-0 z-60 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#DCE4DA] space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-[#13241B]">
                  Confirm Email Dispatch via Gmail
                </h4>
                <p className="text-xs text-[#55695C] leading-relaxed mt-1">
                  You are about to send a real email using your authenticated Google Workspace account:
                </p>
              </div>
            </div>

            <div className="p-3 bg-[#FAF9F6] rounded-xl border border-[#E7ECE4] text-xs font-mono space-y-1 text-[#33463B]">
              <div><strong>From:</strong> {currentUser?.email || 'majumderp937@gmail.com'}</div>
              <div><strong>To:</strong> {toEmail}</div>
              <div><strong>Subject:</strong> {subject}</div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSendConfirmModal(false)}
                className="px-4 py-2 text-xs font-semibold text-[#55695C] hover:bg-[#F2F5F0] rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteSend}
                className="px-5 py-2 text-xs font-semibold text-white bg-[#1A3828] hover:bg-[#254F39] rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Confirm & Send</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
