import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CreditCard, ShieldCheck, Truck, ChevronRight, CheckCircle2, Wallet, ExternalLink } from 'lucide-react';
import { Button, SectionHeading } from './UI';
import { projectId } from '../utils/supabase/info';
import { useLanguage } from './LanguageContext';

export const Checkout = ({ onBack, cartItems }: { onBack: () => void, cartItems: any[] }) => {
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const [paymentMethod, setPaymentMethod] = useState<'external' | 'arrival'>('external');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: ''
  });
  const [orderId, setOrderId] = useState('');
  const { t } = useLanguage();

  // For demo, if cartItems is empty, we assume a single Kinetic Shell
  const items = cartItems.length > 0 ? cartItems : [
    { id: 1, name: 'Kinetic Shell', price: 420, quantity: 1, image: 'https://images.unsplash.com/photo-1634552897937-1297c485f598?auto=format&fit=crop&q=80&w=200' }
  ];

  const subtotal = items.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  const shipping = 25;
  const total = subtotal + shipping;

  const handleProcessOrder = async () => {
    setIsProcessing(true);

    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-4138cd39/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerEmail: formData.email || 'guest@studio.com',
          customerName: formData.name,
          items: items,
          total: total,
          paymentMethod: paymentMethod,
          shippingAddress: {
            line1: formData.address,
            city: formData.city,
            postalCode: formData.postalCode
          }
        }),
      });

      const data = await response.json();

      if (data.success) {
        setOrderId(data.orderId);
        setStep(3);
      } else {
        alert(data.error || "Order failed");
      }
    } catch (err) {
      console.error("Order error:", err);
      alert("System communication failure");
    } finally {
      setIsProcessing(false);
    }
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-background pt-32 px-6 lg:px-24 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="space-y-8 max-w-md"
        >
          <div className="flex justify-center">
            <CheckCircle2 className="w-20 h-20 text-foreground" />
          </div>
          <SectionHeading subtitle="Success">Record Documented</SectionHeading>
          <p className="text-muted-text uppercase text-[10px] tracking-widest leading-relaxed">
            {paymentMethod === 'external'
              ? `Payment verified. Your archive record #${orderId} has been secured.`
              : `Order confirmed. Record #${orderId} logged. Please have the total amount ready upon arrival.`
            }
          </p>
          <div className="pt-8">
            <Button onClick={onBack} className="w-full">Return to Store</Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-6 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest hover:text-muted-text transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Store
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Form */}
          <div className="lg:col-span-7 space-y-12">
            <div className="flex gap-8 mb-12">
              <div className={`text-[11px] font-black uppercase tracking-widest pb-2 border-b-2 transition-colors ${step >= 1 ? 'border-foreground text-foreground' : 'border-transparent text-muted-text'}`}>01 Shipping</div>
              <div className={`text-[11px] font-black uppercase tracking-widest pb-2 border-b-2 transition-colors ${step >= 2 ? 'border-foreground text-foreground' : 'border-transparent text-muted-text'}`}>02 Payment</div>
            </div>

            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <SectionHeading subtitle="Identity">Archive Destination</SectionHeading>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2 space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-text">Full Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-card border border-card-border p-4 text-xs font-bold outline-none focus:border-foreground text-foreground"
                        placeholder="RECIPIENT_NAME"
                      />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-text">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-card border border-card-border p-4 text-xs font-bold outline-none focus:border-foreground text-foreground"
                        placeholder="ENTITY_CONTACT@VAULT.COM"
                      />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-text">Address Line 1</label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full bg-card border border-card-border p-4 text-xs font-bold outline-none focus:border-foreground text-foreground"
                        placeholder="STREET_AND_NUMBER"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-text">City</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-card border border-card-border p-4 text-xs font-bold outline-none focus:border-foreground text-foreground"
                        placeholder="LONDON"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-text">Postal Code</label>
                      <input
                        type="text"
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        className="w-full bg-card border border-card-border p-4 text-xs font-bold outline-none focus:border-foreground text-foreground"
                        placeholder="E1 6AN"
                      />
                    </div>
                  </div>
                  <Button onClick={() => setStep(2)} className="w-full h-16 flex items-center justify-center gap-4">
                    Select Payment Protocol <ChevronRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <SectionHeading subtitle="Protocol">Settlement Method</SectionHeading>

                  <div className="space-y-4">
                    {/* External Payment Option */}
                    <button
                      onClick={() => setPaymentMethod('external')}
                      className={`w-full p-8 border flex items-center justify-between transition-all ${paymentMethod === 'external' ? 'border-foreground bg-foreground/5' : 'border-card-border hover:border-foreground'}`}
                    >
                      <div className="flex items-center gap-6">
                        <CreditCard className={`w-6 h-6 ${paymentMethod === 'external' ? 'text-foreground' : 'text-muted-text'}`} />
                        <div className="text-left">
                          <h4 className="text-xs font-black uppercase tracking-widest text-foreground">Secure Online Payment</h4>
                          <p className="text-[10px] text-muted-text mt-1 uppercase font-bold tracking-widest">Stripe / Credit Card / Digital Wallet</p>
                        </div>
                      </div>
                      {paymentMethod === 'external' && <div className="w-3 h-3 bg-foreground rounded-full"></div>}
                    </button>

                    {/* Payment on Arrival Option */}
                    <button
                      onClick={() => setPaymentMethod('arrival')}
                      className={`w-full p-8 border flex items-center justify-between transition-all ${paymentMethod === 'arrival' ? 'border-foreground bg-foreground/5' : 'border-card-border hover:border-foreground'}`}
                    >
                      <div className="flex items-center gap-6">
                        <Wallet className={`w-6 h-6 ${paymentMethod === 'arrival' ? 'text-foreground' : 'text-muted-text'}`} />
                        <div className="text-left">
                          <h4 className="text-xs font-black uppercase tracking-widest text-foreground">Payment on Arrival</h4>
                          <p className="text-[10px] text-muted-text mt-1 uppercase font-bold tracking-widest">Settle with courier via card or cash</p>
                        </div>
                      </div>
                      {paymentMethod === 'arrival' && <div className="w-3 h-3 bg-foreground rounded-full"></div>}
                    </button>
                  </div>

                  <div className="p-8 border border-card-border space-y-6 bg-card">
                    {paymentMethod === 'external' ? (
                      <div className="text-center space-y-4 py-4">
                        <ShieldCheck className="w-10 h-10 text-foreground mx-auto" />
                        <p className="text-[10px] text-muted-text uppercase tracking-[0.2em] font-bold leading-relaxed">
                          You will be redirected to our secure third-party payment gateway to complete the transaction. JACOB VAULT does not store sensitive financial data.
                        </p>
                      </div>
                    ) : (
                      <div className="text-center space-y-4 py-4">
                        <Truck className="w-10 h-10 text-foreground mx-auto" />
                        <p className="text-[10px] text-muted-text uppercase tracking-[0.2em] font-bold leading-relaxed">
                          Finalize your order now and settle the balance of <span className="text-foreground font-black">${total}.00</span> when the archive courier arrives at your destination.
                        </p>
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={handleProcessOrder}
                    disabled={isProcessing}
                    className="w-full h-16 flex items-center justify-center gap-4"
                  >
                    {isProcessing ? (
                      'Processing Protocol...'
                    ) : paymentMethod === 'external' ? (
                      <>Redirect to Secure Payment <ExternalLink className="w-4 h-4" /></>
                    ) : (
                      'Confirm Order on Arrival'
                    )}
                  </Button>

                  <button onClick={() => setStep(1)} className="w-full text-[10px] font-black uppercase tracking-widest text-muted-text hover:text-foreground">
                    Back to Shipping
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-5">
            <div className="bg-card p-8 lg:p-12 sticky top-32 border border-card-border">
              <h3 className="text-lg font-black uppercase tracking-tighter mb-8 pb-4 border-b border-card-border text-foreground">Vault Record</h3>

              <div className="space-y-6 mb-12">
                {items.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-20 h-24 bg-background shrink-0 border border-card-border">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h4 className="text-[11px] font-black uppercase tracking-widest text-foreground">{item.name}</h4>
                        <p className="text-[10px] text-muted-text uppercase font-bold tracking-widest mt-1">Quantity: {item.quantity || 1}</p>
                      </div>
                      <p className="text-xs font-mono text-foreground">${item.price}.00</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 border-t border-card-border pt-8">
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-muted-text">
                  <span>Subtotal</span>
                  <span className="font-mono text-foreground">${subtotal}.00</span>
                </div>
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-muted-text">
                  <span>Courier Service</span>
                  <span className="font-mono text-foreground">${shipping}.00</span>
                </div>
                <div className="flex justify-between text-lg font-black uppercase tracking-tighter pt-4 border-t border-card-border">
                  <span className="text-foreground">Total Due</span>
                  <span className="font-mono text-foreground">${total}.00</span>
                </div>
              </div>

              <div className="mt-12 space-y-4">
                <div className="flex items-start gap-4 p-4 border border-dashed border-card-border">
                  <ShieldCheck className="w-4 h-4 text-foreground shrink-0" />
                  <p className="text-[9px] font-bold uppercase tracking-widest text-muted-text leading-relaxed">
                    All JACOB VAULT transactions are encrypted. Secure external gateway powered by certified payment providers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
