import React, { useState } from 'react';
import { Plant } from '../data/plants';
import { X, Trash2, ShoppingBag, Truck, MapPin, CheckCircle, ArrowRight, MessageSquare, Mail, Bell } from 'lucide-react';

import { UserProfile } from './AuthModal';

export interface CartItem {
  plant: Plant;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (plantId: string, quantity: number) => void;
  onRemoveItem: (plantId: string) => void;
  onClearCart: () => void;
  user?: UserProfile;
  onOrderPlaced?: (order: {
    orderId: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    customerAddress: string;
    items: string[];
    total: number;
    fulfillment: string;
    date: string;
  }) => void;
  onOpenNotifications?: () => void;
  onOpenGmailHub?: (params?: { recipient?: string; subject?: string; body?: string }) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  user,
  onOrderPlaced,
  onOpenNotifications,
  onOpenGmailHub,
}) => {
  const [fulfillment, setFulfillment] = useState<'pickup' | 'delivery'>('pickup');
  const [pickupDate, setPickupDate] = useState<string>('2026-11-12');
  const [customerName, setCustomerName] = useState<string>(user?.name || 'Nitin Kushwaha');
  const [customerPhone, setCustomerPhone] = useState<string>(user?.phone || '9837652655');
  const [customerEmail, setCustomerEmail] = useState<string>(user?.email || 'majumderp937@gmail.com');
  const [customerAddress, setCustomerAddress] = useState<string>(user?.address || 'Mani Nagar, Pandesara, Surat');
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);

  // Sync state if user changes
  React.useEffect(() => {
    if (user?.name) setCustomerName(user.name);
    if (user?.phone) setCustomerPhone(user.phone);
    if (user?.address) setCustomerAddress(user.address);
    if (user?.email) setCustomerEmail(user.email);
  }, [user]);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.plant.price * item.quantity, 0);
  const deliveryFee = fulfillment === 'delivery' ? 149 : 0;
  const total = subtotal + deliveryFee;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail) return;
    const orderId = `PGS-ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    setConfirmedOrderId(orderId);

    if (onOrderPlaced) {
      onOrderPlaced({
        orderId,
        customerName,
        customerPhone,
        customerEmail,
        customerAddress,
        items: cart.map((i) => `${i.quantity}x ${i.plant.name}`),
        total,
        fulfillment: fulfillment === 'pickup' ? 'Surat Nursery Pickup' : 'Climate Courier',
        date: pickupDate,
      });
    }
  };

  const handleFinish = () => {
    setConfirmedOrderId(null);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-[#E7ECE4] flex items-center justify-between bg-[#FAF9F6]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#2D5A3F]" />
              <h3 className="font-serif text-xl font-bold text-[#13241B]">
                Your Plant Bag (₹ INR)
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white hover:bg-[#EAEFE8] border border-[#DCE4DA] flex items-center justify-center text-[#465A4F] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {confirmedOrderId ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#EAEFE8] text-[#2D5A3F] flex items-center justify-center mx-auto border border-[#C8D6C4]">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-[#13241B]">
                  Nursery Reservation Placed
                </h4>
                <p className="text-xs text-[#55695C] leading-relaxed max-w-xs mx-auto">
                  Thank you, <strong className="text-[#13241B]">{customerName}</strong>! Your order
                  has been routed to our Surat greenhouse staging team.
                </p>

                {/* Live Notification Dispatched Alert */}
                <div className="p-3.5 bg-[#EEF4ED] border border-[#C8DBC4] rounded-2xl text-left space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1A3828]">
                    <Bell className="w-4 h-4 text-[#2D5A3F]" />
                    <span>Dispatched Alerts (Live Sandbox Delivery)</span>
                  </div>
                  <div className="text-[11px] text-[#33463B] space-y-1 font-mono">
                    <div className="flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-[#0284C7]" />
                      <span>SMS Sent to: <strong>+91 {customerPhone}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#D97706]" />
                      <span>Email Sent to: <strong>{customerEmail}</strong></span>
                    </div>
                  </div>
                  <p className="text-[10px] text-[#55695C] leading-normal pt-1 border-t border-[#D9E6D5]">
                    Notice: External cellular SMS and real external email gateways are simulated in this browser sandbox. All delivered messages are logged in the Dispatch Center.
                  </p>
                  {onOpenNotifications && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenNotifications();
                      }}
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
                        onClose();
                        onOpenGmailHub({
                          recipient: customerEmail,
                          subject: `Order Receipt #${confirmedOrderId} - The Paradise Garden Service`,
                          body: `Dear ${customerName},\n\nYour heirloom botanical order ${confirmedOrderId} has been confirmed.\n\nORDER DETAILS:\n• Fulfillment: ${fulfillment === 'pickup' ? 'Surat Nursery Pickup' : 'Climate Courier'}\n• Scheduled Date: ${pickupDate}\n• Destination: ${customerAddress}\n• Total Paid: ₹${total.toLocaleString('en-IN')}\n\nWarm regards,\nThe Paradise Garden Service Team\nMani Nagar, Pandesara, Surat`,
                        });
                      }}
                      className="w-full py-2 px-3 bg-white border border-[#DCE4DA] text-[#13241B] text-xs font-semibold rounded-xl hover:bg-[#F2F5F0] transition-colors flex items-center justify-center gap-2 shadow-xs"
                    >
                      <div className="w-3.5 h-3.5 rounded-full bg-[#EA4335] text-white flex items-center justify-center text-[8px] font-bold">
                        M
                      </div>
                      <span>Send Real Email via Your Gmail Account</span>
                    </button>
                  )}
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#DCE4DA] text-left text-xs space-y-2 font-mono">
                  <div className="flex justify-between">
                    <span className="text-[#788E81]">Order Reference:</span>
                    <span className="font-bold text-[#1A3828]">{confirmedOrderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#788E81]">Recipient:</span>
                    <span className="text-[#13241B]">{customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#788E81]">Phone / Mobile:</span>
                    <span className="text-[#13241B]">+91 {customerPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#788E81]">Fulfillment:</span>
                    <span className="capitalize">{fulfillment === 'pickup' ? 'Surat Nursery Pickup' : 'Climate Courier'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#788E81]">Scheduled Date:</span>
                    <span>{pickupDate}</span>
                  </div>
                  <div className="flex justify-between border-t border-[#E7ECE4] pt-2 font-bold text-sm text-[#13241B]">
                    <span>Total Paid (INR):</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <p className="text-[11px] text-[#788E81] italic">
                  A comprehensive botanical care booklet and organic root inoculant are included with every specimen.
                </p>

                <button
                  onClick={handleFinish}
                  className="w-full py-3 text-xs font-semibold text-white bg-[#1A3828] hover:bg-[#254F39] rounded-xl transition-colors shadow-sm"
                >
                  Return to Sanctuary
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#F2F5F0] text-[#788E81] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <p className="font-serif text-lg text-[#13241B]">Your plant bag is empty</p>
                <p className="text-xs text-[#788E81]">
                  Explore our living botanicals and heirloom cultivars to select specimens.
                </p>
              </div>
            ) : (
              <>
                {/* Itemized List */}
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.plant.id}
                      className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E7ECE4] flex items-center gap-3"
                    >
                      <img
                        src={item.plant.image}
                        alt={item.plant.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-xl object-cover shrink-0 bg-[#E2EAE0]"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-[#13241B] truncate">
                          {item.plant.name}
                        </h4>
                        <div className="text-[11px] italic text-[#788E81] truncate">
                          {item.plant.botanicalName}
                        </div>
                        <div className="font-mono text-xs font-bold text-[#13241B] mt-1 tabular-nums">
                          ₹{item.plant.price.toLocaleString('en-IN')}
                        </div>
                      </div>

                      {/* Stepper */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => onUpdateQuantity(item.plant.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-md bg-white border border-[#DCE4DA] text-xs font-bold flex items-center justify-center hover:bg-[#EAEFE8]"
                        >
                          -
                        </button>
                        <span className="font-mono text-xs font-semibold w-5 text-center tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.plant.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-md bg-white border border-[#DCE4DA] text-xs font-bold flex items-center justify-center hover:bg-[#EAEFE8]"
                        >
                          +
                        </button>
                        <button
                          onClick={() => onRemoveItem(item.plant.id)}
                          className="ml-1 text-[#9CAE9F] hover:text-[#B91C1C] transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Fulfillment Selection */}
                <div className="pt-4 border-t border-[#EEF2EB] space-y-3">
                  <div className="text-xs font-semibold text-[#13241B] uppercase tracking-wider">
                    Fulfillment Method
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFulfillment('pickup')}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        fulfillment === 'pickup'
                          ? 'bg-[#EAEFE8] border-[#2D5A3F] text-[#1A3828]'
                          : 'bg-[#FAF9F6] border-[#DCE4DA] text-[#55695C]'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Nursery Pickup</span>
                      </div>
                      <div className="text-[10px] text-[#788E81] mt-0.5">Free from Surat Glasshouse</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFulfillment('delivery')}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        fulfillment === 'delivery'
                          ? 'bg-[#EAEFE8] border-[#2D5A3F] text-[#1A3828]'
                          : 'bg-[#FAF9F6] border-[#DCE4DA] text-[#55695C]'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold">
                        <Truck className="w-3.5 h-3.5" />
                        <span>Courier Transit</span>
                      </div>
                      <div className="text-[10px] text-[#788E81] mt-0.5">+₹149 Climate Box</div>
                    </button>
                  </div>
                </div>

                {/* Checkout Details Form */}
                <form id="cart-checkout-form" onSubmit={handleCheckout} className="space-y-3 pt-2">
                  <div className="text-xs font-semibold text-[#13241B] uppercase tracking-wider">
                    Recipient & Reservation Details
                  </div>

                  <input
                    type="text"
                    required
                    placeholder="Full Name (e.g. Nitin Kushwaha)"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#DCE4DA] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D5A3F] text-[#13241B]"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="tel"
                      required
                      placeholder="Phone (e.g. 9837652655)"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#DCE4DA] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D5A3F] text-[#13241B]"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email for dispatch updates"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#DCE4DA] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D5A3F] text-[#13241B]"
                    />
                  </div>

                  {fulfillment === 'delivery' ? (
                    <input
                      type="text"
                      required
                      placeholder="Delivery street address (e.g. Mani Nagar, Pandesara, Surat)"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#DCE4DA] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D5A3F] text-[#13241B]"
                    />
                  ) : (
                    <div>
                      <label className="text-[11px] text-[#788E81] block mb-1">
                        Scheduled Pickup Date:
                      </label>
                      <input
                        type="date"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#DCE4DA] rounded-lg text-[#13241B]"
                      />
                    </div>
                  )}
                </form>
              </>
            )}
          </div>

          {/* Footer Subtotal & Action */}
          {cart.length > 0 && !confirmedOrderId && (
            <div className="p-6 border-t border-[#E7ECE4] bg-[#FAF9F6] space-y-4">
              <div className="space-y-1.5 text-xs text-[#55695C] font-mono">
                <div className="flex justify-between">
                  <span>Specimens Subtotal:</span>
                  <span className="tabular-nums">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {fulfillment === 'delivery' && (
                  <div className="flex justify-between">
                    <span>Climate-Control Courier:</span>
                    <span className="tabular-nums">₹{deliveryFee.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-serif font-bold text-[#13241B] pt-2 border-t border-[#E7ECE4]">
                  <span>Total Due (INR):</span>
                  <span className="tabular-nums">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                type="submit"
                form="cart-checkout-form"
                className="w-full py-3.5 text-xs font-semibold text-white bg-[#1A3828] hover:bg-[#254F39] rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Confirm Specimen Reservation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
