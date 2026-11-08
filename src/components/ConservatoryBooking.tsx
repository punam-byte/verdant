import React, { useState } from 'react';
import { CONSERVATORY_EVENTS, ConservatoryEvent } from '../data/workshops';
import { Calendar, Clock, Users, Award, Check, X, Ticket, Bell, MessageSquare, Mail } from 'lucide-react';

interface ConservatoryBookingProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedEventId?: string;
  onBookingConfirmed?: (booking: {
    passCode: string;
    eventTitle: string;
    date: string;
    time: string;
    attendees: number;
    total: number;
    name: string;
    email: string;
  }) => void;
  onOpenNotifications?: () => void;
  onOpenGmailHub?: (params?: { recipient?: string; subject?: string; body?: string }) => void;
}

export const ConservatoryBooking: React.FC<ConservatoryBookingProps> = ({
  isOpen,
  onClose,
  preselectedEventId,
  onBookingConfirmed,
  onOpenNotifications,
  onOpenGmailHub,
}) => {
  const [selectedEventId, setSelectedEventId] = useState<string>(
    preselectedEventId || CONSERVATORY_EVENTS[0].id
  );
  const [attendeeCount, setAttendeeCount] = useState<number>(2);
  const [visitDate, setVisitDate] = useState<string>('2026-11-14');
  const [timeSlot, setTimeSlot] = useState<string>('10:30 AM');
  const [guestName, setGuestName] = useState<string>('Nitin Kushwaha');
  const [guestEmail, setGuestEmail] = useState<string>('majumderp937@gmail.com');
  const [confirmationPass, setConfirmationPass] = useState<{
    code: string;
    event: ConservatoryEvent;
    attendees: number;
    date: string;
    slot: string;
    name: string;
    total: number;
  } | null>(null);

  const activeEvent =
    CONSERVATORY_EVENTS.find((e) => e.id === selectedEventId) || CONSERVATORY_EVENTS[0];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail) return;

    const passCode = `PGS-${Math.floor(100000 + Math.random() * 900000)}`;
    const total = activeEvent.pricePerPerson * attendeeCount;
    setConfirmationPass({
      code: passCode,
      event: activeEvent,
      attendees: attendeeCount,
      date: visitDate,
      slot: timeSlot,
      name: guestName,
      total,
    });

    if (onBookingConfirmed) {
      onBookingConfirmed({
        passCode,
        eventTitle: activeEvent.title,
        date: visitDate,
        time: timeSlot,
        attendees: attendeeCount,
        total,
        name: guestName,
        email: guestEmail,
      });
    }
  };

  const resetAndClose = () => {
    setConfirmationPass(null);
    onClose();
  };

  return (
    <section id="workshops" className="py-16 md:py-24 bg-[#FAF9F6] border-b border-[#E7ECE4]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#465A4F] font-semibold mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#2D5A3F]" />
              <span>Conservatory Experiences & Hands-on Masterclasses</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#13241B]">
              Conservatory Tours & Masterclasses
            </h2>
          </div>
          <p className="text-sm text-[#5D7065] max-w-md font-light leading-relaxed">
            Step under the grand iron vaults of our 1894 conservatory. Learn propagation chemistry,
            botanical illustration, and miniature biosphere crafting with resident botanists.
          </p>
        </div>

        {/* Workshop Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CONSERVATORY_EVENTS.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E7ECE4] shadow-sm flex flex-col justify-between hover:border-[#C8D6C4] transition-all hover:-translate-y-1"
            >
              <div>
                <div className="text-[11px] font-mono text-[#788E81] uppercase tracking-wider mb-1">
                  {event.subtitle}
                </div>
                <h3 className="font-serif text-xl font-bold text-[#13241B] mb-2 leading-snug">
                  {event.title}
                </h3>
                <p className="text-xs text-[#55695C] leading-relaxed mb-5 font-light">
                  {event.description}
                </p>

                {/* Key Highlights */}
                <div className="space-y-2 mb-6 text-xs text-[#465A4F]">
                  {event.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-[#2D5A3F] font-bold">✓</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#EEF2EB] text-xs text-[#6B7D72] space-y-1 font-mono">
                  <div>Instructor: <span className="text-[#13241B] font-sans font-medium">{event.instructor}</span></div>
                  <div>Duration: <span className="text-[#13241B]">{event.duration}</span></div>
                </div>
              </div>

              {/* Price & Booking Trigger */}
              <div className="mt-6 pt-4 border-t border-[#EEF2EB] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#788E81] block">Per Participant</span>
                  <span className="font-mono text-xl font-bold text-[#13241B] tabular-nums">
                    ₹{event.pricePerPerson.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setSelectedEventId(event.id);
                    // trigger booking modal
                    const modal = document.getElementById('booking-modal-anchor');
                    if (modal) modal.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#1A3828] hover:bg-[#254F39] rounded-xl transition-colors shadow-sm"
                >
                  Reserve Date
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Anchor point for booking section */}
        <div id="booking-modal-anchor" />

        {/* Embedded Booking Panel */}
        <div className="mt-12 bg-white rounded-3xl border border-[#E7ECE4] p-6 sm:p-10 shadow-sm max-w-4xl mx-auto">
          {confirmationPass ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-[#EAEFE8] text-[#2D5A3F] flex items-center justify-center mx-auto mb-4 border border-[#C8D6C4]">
                <Ticket className="w-8 h-8" />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#788E81]">
                Reservation Confirmed
              </span>
              <h3 className="font-serif text-3xl font-bold text-[#13241B] mt-1 mb-2">
                Your Conservatory Pass is Issued
              </h3>
              <p className="text-sm text-[#55695C] max-w-md mx-auto mb-6">
                Please present this reservation confirmation at the Victorian Glasshouse entrance
                pavilion upon arrival.
              </p>

              {/* Pass Card */}
              <div className="bg-[#FAF9F6] p-6 rounded-2xl border border-[#DCE4DA] max-w-md mx-auto text-left mb-6 shadow-sm">
                <div className="flex justify-between items-center border-b border-[#E7ECE4] pb-3 mb-3">
                  <div>
                    <span className="text-[11px] text-[#788E81] block">Pass Reference</span>
                    <span className="font-mono text-sm font-bold text-[#1A3828]">
                      {confirmationPass.code}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-[#788E81] block">Reserved For</span>
                    <span className="text-xs font-semibold text-[#13241B]">
                      {confirmationPass.name}
                    </span>
                  </div>
                </div>

                <div className="text-sm font-serif font-bold text-[#13241B] mb-2">
                  {confirmationPass.event.title}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-[#55695C] mb-4 font-mono">
                  <div>Date: {confirmationPass.date}</div>
                  <div>Time: {confirmationPass.slot}</div>
                  <div>Guests: {confirmationPass.attendees} persons</div>
                  <div>Total: ₹{confirmationPass.total.toLocaleString('en-IN')}</div>
                </div>

                <div className="text-[11px] text-[#788E81] italic">
                  Includes full access to the Conservatory Canopies, botanical refreshments, and specimen takeaway.
                </div>
              </div>

              {/* Live Dispatches Alert */}
              <div className="bg-[#EEF4ED] p-4 rounded-2xl border border-[#C8DBC4] max-w-md mx-auto text-left mb-6 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1A3828]">
                  <Bell className="w-4 h-4 text-[#2D5A3F]" />
                  <span>Pass Dispatched to SMS & Email (Sandbox Delivery)</span>
                </div>
                <div className="text-[11px] text-[#33463B] font-mono space-y-1">
                  <div className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-[#0284C7]" />
                    <span>SMS Pass sent to: <strong>+91 9837652655</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>Email Ticket sent to: <strong>{guestEmail}</strong></span>
                  </div>
                </div>
                <p className="text-[10px] text-[#55695C] leading-normal pt-1 border-t border-[#D9E6D5]">
                  In this evaluation sandbox environment, live SMS and Gmail deliveries are logged directly inside your interactive Notification Center.
                </p>
                {onOpenNotifications && (
                  <button
                    type="button"
                    onClick={onOpenNotifications}
                    className="w-full py-2 px-3 bg-[#1A3828] text-white text-xs font-semibold rounded-xl hover:bg-[#254F39] transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Bell className="w-3.5 h-3.5" />
                    <span>Open Notification Center & View Dispatches</span>
                  </button>
                )}
                {onOpenGmailHub && (
                  <button
                    type="button"
                    onClick={() => {
                      onOpenGmailHub({
                        recipient: guestEmail,
                        subject: `Conservatory Pass: ${confirmationPass.code} - ${confirmationPass.event.title}`,
                        body: `Dear ${guestName},\n\nYour conservatory access pass is confirmed.\n\nPASS DETAILS:\n• Reference: ${confirmationPass.code}\n• Masterclass: ${confirmationPass.event.title}\n• Scheduled: ${confirmationPass.date} at ${confirmationPass.slot}\n• Attendees: ${confirmationPass.attendees} persons\n• Total: ₹${confirmationPass.total.toLocaleString('en-IN')}\n\nLocation: The Victorian Glasshouse Pavilion, The Paradise Garden Service, Pandesara, Surat.\n\nWarm regards,\nThe Paradise Garden Service`,
                      });
                    }}
                    className="w-full py-2 px-3 bg-white border border-[#DCE4DA] text-[#13241B] text-xs font-semibold rounded-xl hover:bg-[#F2F5F0] transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <div className="w-3.5 h-3.5 rounded-full bg-[#EA4335] text-white flex items-center justify-center text-[8px] font-bold">
                      M
                    </div>
                    <span>Send Real Pass via Your Gmail</span>
                  </button>
                )}
              </div>

              <button
                onClick={() => setConfirmationPass(null)}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-[#1A3828] hover:bg-[#254F39] rounded-xl transition-colors"
              >
                Book Another Experience
              </button>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <h3 className="font-serif text-2xl font-bold text-[#13241B]">
                  Schedule Your Conservatory Visit (2026 Season)
                </h3>
                <p className="text-xs text-[#55695C] mt-1">
                  Select your preferred workshop, scheduled arrival time, and attendee count. Priced in Indian Rupees (₹).
                </p>
              </div>

              <form onSubmit={handleBooking} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Event Select */}
                  <div>
                    <label className="block text-xs font-semibold text-[#13241B] mb-1.5">
                      Selected Experience
                    </label>
                    <select
                      value={selectedEventId}
                      onChange={(e) => setSelectedEventId(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs bg-[#FAF9F6] border border-[#DCE4DA] rounded-xl text-[#13241B] focus:outline-none focus:ring-1 focus:ring-[#2D5A3F]"
                    >
                      {CONSERVATORY_EVENTS.map((evt) => (
                        <option key={evt.id} value={evt.id}>
                          {evt.title} (₹{evt.pricePerPerson.toLocaleString('en-IN')}/person)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date Select */}
                  <div>
                    <label className="block text-xs font-semibold text-[#13241B] mb-1.5">
                      Visit Date
                    </label>
                    <input
                      type="date"
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs bg-[#FAF9F6] border border-[#DCE4DA] rounded-xl text-[#13241B] focus:outline-none focus:ring-1 focus:ring-[#2D5A3F]"
                    />
                  </div>

                  {/* Time Slot */}
                  <div>
                    <label className="block text-xs font-semibold text-[#13241B] mb-1.5">
                      Session Time
                    </label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs bg-[#FAF9F6] border border-[#DCE4DA] rounded-xl text-[#13241B] focus:outline-none focus:ring-1 focus:ring-[#2D5A3F]"
                    >
                      <option value="10:00 AM">10:00 AM (Morning Canopy Light)</option>
                      <option value="1:00 PM">1:00 PM (Afternoon Botanical Session)</option>
                      <option value="3:30 PM">3:30 PM (Golden Hour Mist Walk)</option>
                    </select>
                  </div>

                  {/* Attendee Stepper */}
                  <div>
                    <label className="block text-xs font-semibold text-[#13241B] mb-1.5">
                      Number of Attendees
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setAttendeeCount(Math.max(1, attendeeCount - 1))}
                        className="w-9 h-9 rounded-xl border border-[#DCE4DA] bg-[#FAF9F6] hover:bg-[#EAEFE8] font-bold text-sm text-[#13241B]"
                      >
                        -
                      </button>
                      <span className="font-mono text-sm font-bold text-[#13241B] w-8 text-center tabular-nums">
                        {attendeeCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => setAttendeeCount(Math.min(8, attendeeCount + 1))}
                        className="w-9 h-9 rounded-xl border border-[#DCE4DA] bg-[#FAF9F6] hover:bg-[#EAEFE8] font-bold text-sm text-[#13241B]"
                      >
                        +
                      </button>
                      <span className="text-xs text-[#788E81] ml-2">
                        (₹{(activeEvent.pricePerPerson * attendeeCount).toLocaleString('en-IN')} total)
                      </span>
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-[#13241B] mb-1.5">
                      Lead Guest Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eleanor Vance"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs bg-[#FAF9F6] border border-[#DCE4DA] rounded-xl text-[#13241B] focus:outline-none focus:ring-1 focus:ring-[#2D5A3F]"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-[#13241B] mb-1.5">
                      Confirmation Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. eleanor@botanica.org"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs bg-[#FAF9F6] border border-[#DCE4DA] rounded-xl text-[#13241B] focus:outline-none focus:ring-1 focus:ring-[#2D5A3F]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#EEF2EB] flex items-center justify-between">
                  <div className="text-xs text-[#55695C]">
                    Complimentary rescheduling permitted up to 24 hours prior to visit.
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 text-xs font-semibold text-white bg-[#1A3828] hover:bg-[#254F39] rounded-xl transition-all shadow-md active:scale-95"
                  >
                    Confirm & Reserve Experience
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
