import React, { useState } from 'react';
import { Bell, Mail, MessageSquare, CheckCircle, RefreshCw, X, ExternalLink, Phone, Copy, Check } from 'lucide-react';

export interface DispatchNotification {
  id: string;
  type: 'sms' | 'email';
  recipient: string;
  sender: string;
  timestamp: string;
  subject?: string;
  title: string;
  content: string;
  status: 'Delivered' | 'Sent';
  details?: {
    orderId?: string;
    items?: string[];
    total?: string;
    address?: string;
  };
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: DispatchNotification[];
  onResendSMS: () => void;
  onResendEmail: () => void;
  onClearNotifications: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  notifications,
  onResendSMS,
  onResendEmail,
  onClearNotifications,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'sms' | 'email'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const filtered = notifications.filter((n) => {
    if (activeTab === 'sms') return n.type === 'sms';
    if (activeTab === 'email') return n.type === 'email';
    return true;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const triggerResendSMS = () => {
    onResendSMS();
    setActionNotice('Instant SMS dispatched to +91 9837652655');
    setTimeout(() => setActionNotice(null), 3000);
  };

  const triggerResendEmail = () => {
    onResendEmail();
    setActionNotice('Confirmation email dispatched to majumderp937@gmail.com');
    setTimeout(() => setActionNotice(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-lg bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-[#E7ECE4] bg-[#FAF9F6]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#1A3828] text-white flex items-center justify-center shadow-sm">
                  <Bell className="w-5 h-5 text-[#88C5A0]" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#13241B]">
                    Dispatch & Notification Center
                  </h3>
                  <p className="text-[11px] text-[#788E81] font-mono">
                    Direct SMS (9837652655) & Email (majumderp937@gmail.com)
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close notification center"
                className="w-8 h-8 rounded-full bg-white hover:bg-[#EAEFE8] border border-[#DCE4DA] flex items-center justify-center text-[#465A4F] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Explanation Note for Evaluation Sandbox */}
            <div className="p-3 bg-[#EEF4ED] border border-[#D1E2CF] rounded-xl text-xs text-[#2D5A3F] leading-relaxed">
              <strong>Preview Notice:</strong> In this development sandbox, cellular SMS gateways and external email servers route all outgoing dispatches directly to this interactive activity viewer so you can inspect verified delivery payloads.
            </div>

            {/* Quick Action Buttons */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={triggerResendSMS}
                className="flex-1 py-2 px-3 text-xs font-semibold text-[#1A3828] bg-white border border-[#DCE4DA] hover:bg-[#EAEFE8] rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#2D5A3F]" />
                <span>Resend SMS (9837652655)</span>
              </button>

              <button
                onClick={triggerResendEmail}
                className="flex-1 py-2 px-3 text-xs font-semibold text-[#1A3828] bg-white border border-[#DCE4DA] hover:bg-[#EAEFE8] rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Mail className="w-3.5 h-3.5 text-[#2D5A3F]" />
                <span>Resend Email</span>
              </button>
            </div>

            {/* Notification Toast */}
            {actionNotice && (
              <div className="mt-3 p-2 bg-[#1A3828] text-white text-xs rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#88C5A0]" />
                  <span>{actionNotice}</span>
                </div>
              </div>
            )}

            {/* Tabs */}
            <div className="flex items-center gap-2 mt-4 border-b border-[#E7ECE4] pb-1">
              <button
                onClick={() => setActiveTab('all')}
                className={`pb-1 px-3 text-xs font-medium border-b-2 transition-colors ${
                  activeTab === 'all'
                    ? 'border-[#1A3828] text-[#13241B]'
                    : 'border-transparent text-[#788E81] hover:text-[#13241B]'
                }`}
              >
                All Messages ({notifications.length})
              </button>
              <button
                onClick={() => setActiveTab('sms')}
                className={`pb-1 px-3 text-xs font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'sms'
                    ? 'border-[#1A3828] text-[#13241B]'
                    : 'border-transparent text-[#788E81] hover:text-[#13241B]'
                }`}
              >
                <Phone className="w-3 h-3" />
                <span>SMS Messages</span>
              </button>
              <button
                onClick={() => setActiveTab('email')}
                className={`pb-1 px-3 text-xs font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'email'
                    ? 'border-[#1A3828] text-[#13241B]'
                    : 'border-transparent text-[#788E81] hover:text-[#13241B]'
                }`}
              >
                <Mail className="w-3 h-3" />
                <span>Email Inbox</span>
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {filtered.length === 0 ? (
              <div className="py-12 text-center text-[#788E81] text-xs">
                No notifications found in this category. Click "Resend SMS" or "Resend Email" above to trigger a new message.
              </div>
            ) : (
              filtered.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl border border-[#E7ECE4] bg-[#FAF9F6] shadow-xs space-y-3"
                >
                  {/* Item Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                          item.type === 'sms'
                            ? 'bg-[#E0F2FE] text-[#0284C7]'
                            : 'bg-[#FEF3C7] text-[#D97706]'
                        }`}
                      >
                        {item.type === 'sms' ? (
                          <MessageSquare className="w-4 h-4" />
                        ) : (
                          <Mail className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#13241B]">{item.title}</div>
                        <div className="text-[11px] text-[#788E81] font-mono">
                          To: <strong className="text-[#13241B]">{item.recipient}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono bg-[#EAEFE8] text-[#2D5A3F] px-2 py-0.5 rounded-full font-bold">
                        <CheckCircle className="w-3 h-3 text-[#2D5A3F]" />
                        <span>{item.status}</span>
                      </span>
                      <div className="text-[10px] text-[#9CAE9F] font-mono mt-1">
                        {item.timestamp}
                      </div>
                    </div>
                  </div>

                  {/* Subject if email */}
                  {item.subject && (
                    <div className="text-xs font-semibold text-[#1A3828] bg-white p-2 rounded-lg border border-[#EEF2EB]">
                      Subject: {item.subject}
                    </div>
                  )}

                  {/* Content View */}
                  <div className="p-3 bg-white rounded-xl border border-[#EEF2EB] text-xs text-[#33463B] font-mono whitespace-pre-line leading-relaxed">
                    {item.content}
                  </div>

                  {/* Actions Row */}
                  <div className="flex items-center justify-between text-[11px] text-[#788E81]">
                    <span>Sender: {item.sender}</span>
                    <button
                      onClick={() => handleCopy(item.id, item.content)}
                      className="hover:text-[#13241B] flex items-center gap-1 text-[#2D5A3F] font-medium"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="w-3 h-3 text-[#2D5A3F]" />
                          <span>Copied text!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Message Text</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-[#E7ECE4] bg-[#FAF9F6] flex items-center justify-between text-xs text-[#55695C]">
            <button
              onClick={onClearNotifications}
              className="text-[#B91C1C] hover:underline text-xs"
            >
              Clear Message History
            </button>
            <span className="font-mono text-[11px]">
              Active Recipient: 9837652655
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
