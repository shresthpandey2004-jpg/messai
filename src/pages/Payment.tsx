import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  CreditCard, 
  Smartphone, 
  Building2, 
  ArrowLeft, 
  Shield, 
  CheckCircle2,
  Loader2,
  Lock,
  AlertTriangle,
  Eye,
  EyeOff
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { generateReceipt } from "@/utils/generateReceipt";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const amount = location.state?.amount || 3500;
  const billMonth = location.state?.billMonth || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const totalMeals = location.state?.totalMeals || 62;
  const mealRate = location.state?.mealRate || 56.45;
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [selectedUPI, setSelectedUPI] = useState<string>("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [sessionExpiry, setSessionExpiry] = useState<number>(600); // 10 minutes
  const [showCVV, setShowCVV] = useState(false);
  const [paymentAttempts, setPaymentAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: ""
  });

  const [upiId, setUpiId] = useState("");
  const [upiPin, setUpiPin] = useState("");

  // Session timeout countdown
  useEffect(() => {
    if (sessionExpiry > 0 && !paymentSuccess) {
      const timer = setTimeout(() => {
        setSessionExpiry(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (sessionExpiry === 0) {
      toast.error("Session expired! Redirecting...");
      setTimeout(() => navigate("/account"), 2000);
    }
  }, [sessionExpiry, paymentSuccess, navigate]);

  // Validate card number using Luhn algorithm
  const validateCardNumber = (number: string): boolean => {
    const cleaned = number.replace(/\s/g, '');
    if (!/^\d{13,19}$/.test(cleaned)) return false;
    
    let sum = 0;
    let isEven = false;
    
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned[i]);
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    return sum % 10 === 0;
  };

  // Validate expiry date
  const validateExpiry = (expiry: string): boolean => {
    const [month, year] = expiry.split('/');
    if (!month || !year) return false;
    
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    const expiryMonth = parseInt(month);
    const expiryYear = parseInt(year);
    
    if (expiryMonth < 1 || expiryMonth > 12) return false;
    if (expiryYear < currentYear) return false;
    if (expiryYear === currentYear && expiryMonth < currentMonth) return false;
    
    return true;
  };

  // Validate UPI ID format
  const validateUPI = (upiId: string): boolean => {
    const upiRegex = /^[\w.-]+@[\w.-]+$/;
    return upiRegex.test(upiId);
  };

  // Generate OTP
  const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOTP(otp);
    setShowOTP(true);
    
    toast.info(`OTP sent to your registered mobile`, {
      description: `Demo OTP: ${otp} (for testing only)`,
      duration: 10000,
    });
  };

  // Verify OTP
  const verifyOTP = () => {
    if (otp === generatedOTP) {
      setOtpVerified(true);
      setShowOTP(false);
      toast.success("OTP verified successfully! ✓");
      return true;
    } else {
      toast.error("Invalid OTP! Please try again.");
      setPaymentAttempts(prev => prev + 1);
      
      if (paymentAttempts >= 2) {
        setIsBlocked(true);
        toast.error("Too many failed attempts! Payment blocked for security.");
        setTimeout(() => navigate("/account"), 3000);
      }
      return false;
    }
  };

  // Validate payment method before processing
  const validatePaymentMethod = (method: string): boolean => {
    if (!termsAccepted) {
      toast.error("Please accept terms and conditions");
      return false;
    }

    if (isBlocked) {
      toast.error("Payment blocked due to multiple failed attempts");
      return false;
    }

    if (method === "Card") {
      if (!validateCardNumber(cardDetails.number)) {
        toast.error("Invalid card number");
        return false;
      }
      if (!cardDetails.name || cardDetails.name.length < 3) {
        toast.error("Please enter valid cardholder name");
        return false;
      }
      if (!validateExpiry(cardDetails.expiry)) {
        toast.error("Invalid or expired card");
        return false;
      }
      if (cardDetails.cvv.length !== 3) {
        toast.error("Invalid CVV");
        return false;
      }
    }

    if (method === "UPI") {
      if (selectedUPI) {
        if (!upiPin || upiPin.length !== 4) {
          toast.error("Please enter 4-digit UPI PIN");
          return false;
        }
      } else if (upiId) {
        if (!validateUPI(upiId)) {
          toast.error("Invalid UPI ID format");
          return false;
        }
        if (!upiPin || upiPin.length !== 4) {
          toast.error("Please enter 4-digit UPI PIN");
          return false;
        }
      } else {
        toast.error("Please select UPI app or enter UPI ID");
        return false;
      }
    }

    return true;
  };

  const handlePayment = async (method: string) => {
    // Validate payment method
    if (!validatePaymentMethod(method)) {
      return;
    }

    // Generate and verify OTP for security
    if (!otpVerified) {
      generateOTP();
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing with security checks
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Random payment failure simulation (5% chance for realism)
    const paymentFailed = Math.random() < 0.05;
    
    if (paymentFailed) {
      setIsProcessing(false);
      setOtpVerified(false);
      setPaymentAttempts(prev => prev + 1);
      
      toast.error("Payment failed!", {
        description: "Please check your payment details and try again."
      });
      
      if (paymentAttempts >= 2) {
        setIsBlocked(true);
        toast.error("Multiple failed attempts detected. Please contact support.");
        setTimeout(() => navigate("/account"), 3000);
      }
      return;
    }
    
    const txnId = `TXN${Date.now().toString().slice(-8)}`;
    setTransactionId(txnId);
    setIsProcessing(false);
    setPaymentSuccess(true);
    
    toast.success("Payment Successful! 🎉", {
      description: `₹${amount} paid successfully via ${method}`
    });
    
    // Generate receipt after successful payment
    setTimeout(() => {
      generateReceipt({
        userName: user?.name || "User",
        userEmail: user?.email || "email@example.com",
        roomNumber: user?.roomNumber || "N/A",
        totalMeals: totalMeals,
        mealRate: mealRate,
        totalAmount: amount,
        billMonth: billMonth,
        transactionId: txnId,
        paymentDate: new Date().toLocaleDateString('en-IN', { 
          dateStyle: 'long',
          timeZone: 'Asia/Kolkata'
        }),
      });
    }, 500);
    
    // Redirect after 3 seconds
    setTimeout(() => {
      navigate("/account");
    }, 3000);
  };

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted;
  };

  // Format expiry date
  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  // Format session time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-12 pb-8">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Payment Successful!</h2>
            <p className="text-muted-foreground mb-6">
              Your payment of ₹{amount} has been processed successfully
            </p>
            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Transaction ID</span>
                <span className="font-mono font-semibold">{transactionId}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Amount Paid</span>
                <span className="font-semibold text-green-600">₹{amount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Bill Month</span>
                <span className="font-semibold">{billMonth}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-2">
              Receipt is being generated...
            </p>
            <p className="text-xs text-muted-foreground">
              Redirecting to account page...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/account")}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Payment Gateway</h1>
                <p className="text-sm text-muted-foreground">Secure payment powered by MessAI</p>
              </div>
            </div>
            
            {/* Session Timer */}
            <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-lg">
              <Lock className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">
                Session: {formatTime(sessionExpiry)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto grid lg:grid-cols-3 gap-6">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Choose Payment Method</CardTitle>
                <CardDescription>Select your preferred payment option</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="upi" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="upi" className="gap-2">
                      <Smartphone className="w-4 h-4" />
                      UPI
                    </TabsTrigger>
                    <TabsTrigger value="card" className="gap-2">
                      <CreditCard className="w-4 h-4" />
                      Card
                    </TabsTrigger>
                    <TabsTrigger value="netbanking" className="gap-2">
                      <Building2 className="w-4 h-4" />
                      Net Banking
                    </TabsTrigger>
                  </TabsList>

                  {/* UPI Payment */}
                  <TabsContent value="upi" className="space-y-4 mt-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { name: "Google Pay", icon: "🟢", id: "gpay" },
                          { name: "PhonePe", icon: "🟣", id: "phonepe" },
                          { name: "Paytm", icon: "🔵", id: "paytm" },
                          { name: "BHIM UPI", icon: "🟠", id: "bhim" }
                        ].map((app) => (
                          <button
                            key={app.id}
                            onClick={() => {
                              setSelectedUPI(app.id);
                              setUpiId("");
                            }}
                            className={cn(
                              "p-4 rounded-lg border-2 transition-all hover:border-primary",
                              selectedUPI === app.id ? "border-primary bg-primary/5" : "border-border"
                            )}
                          >
                            <div className="text-3xl mb-2">{app.icon}</div>
                            <div className="font-medium text-sm">{app.name}</div>
                          </button>
                        ))}
                      </div>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">Or enter UPI ID</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="upi">UPI ID</Label>
                        <Input
                          id="upi"
                          placeholder="yourname@upi"
                          value={upiId}
                          onChange={(e) => {
                            setUpiId(e.target.value);
                            setSelectedUPI("");
                          }}
                        />
                      </div>

                      {(selectedUPI || upiId) && (
                        <div className="space-y-2">
                          <Label htmlFor="upiPin">UPI PIN</Label>
                          <Input
                            id="upiPin"
                            type="password"
                            placeholder="Enter 4-digit PIN"
                            maxLength={4}
                            value={upiPin}
                            onChange={(e) => setUpiPin(e.target.value.replace(/\D/g, ''))}
                          />
                        </div>
                      )}

                      <Button
                        className="w-full"
                        size="lg"
                        onClick={() => handlePayment("UPI")}
                        disabled={isProcessing || isBlocked || (!selectedUPI && !upiId)}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : otpVerified ? (
                          `Pay ₹${amount}`
                        ) : (
                          `Verify & Pay ₹${amount}`
                        )}
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Card Payment */}
                  <TabsContent value="card" className="space-y-4 mt-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          value={cardDetails.number}
                          onChange={(e) => {
                            const formatted = formatCardNumber(e.target.value);
                            setCardDetails({ ...cardDetails, number: formatted });
                          }}
                        />
                        {cardDetails.number && !validateCardNumber(cardDetails.number) && (
                          <p className="text-xs text-destructive flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            Invalid card number
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input
                          id="cardName"
                          placeholder="Name on card"
                          value={cardDetails.name}
                          onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value.toUpperCase() })}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            maxLength={5}
                            value={cardDetails.expiry}
                            onChange={(e) => {
                              const formatted = formatExpiry(e.target.value);
                              setCardDetails({ ...cardDetails, expiry: formatted });
                            }}
                          />
                          {cardDetails.expiry.length === 5 && !validateExpiry(cardDetails.expiry) && (
                            <p className="text-xs text-destructive flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              Invalid/Expired
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <div className="relative">
                            <Input
                              id="cvv"
                              type={showCVV ? "text" : "password"}
                              placeholder="123"
                              maxLength={3}
                              value={cardDetails.cvv}
                              onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, '') })}
                            />
                            <button
                              type="button"
                              onClick={() => setShowCVV(!showCVV)}
                              className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                              {showCVV ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      </div>

                      <Button
                        className="w-full"
                        size="lg"
                        onClick={() => handlePayment("Card")}
                        disabled={isProcessing || isBlocked || !cardDetails.number || !cardDetails.name}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : otpVerified ? (
                          `Pay ₹${amount}`
                        ) : (
                          `Verify & Pay ₹${amount}`
                        )}
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Net Banking */}
                  <TabsContent value="netbanking" className="space-y-4 mt-6">
                    <div className="space-y-3">
                      {[
                        "State Bank of India",
                        "HDFC Bank",
                        "ICICI Bank",
                        "Axis Bank",
                        "Punjab National Bank",
                        "Bank of Baroda"
                      ].map((bank) => (
                        <button
                          key={bank}
                          onClick={() => handlePayment("Net Banking")}
                          className="w-full p-4 rounded-lg border-2 border-border hover:border-primary transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={isProcessing || isBlocked}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{bank}</span>
                            <Building2 className="w-5 h-5 text-muted-foreground" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Terms and Conditions */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="terms"
                      checked={termsAccepted}
                      onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                    />
                    <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                      I agree to the terms and conditions and authorize MessAI to debit ₹{amount} from my account
                    </label>
                  </div>
                </div>

                {/* Security Info */}
                <div className="mt-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                        Secure Payment
                      </p>
                      <p className="text-blue-700 dark:text-blue-300 text-xs">
                        Your payment is protected with 256-bit SSL encryption. We never store your card details.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* OTP Verification Modal */}
            {showOTP && (
              <Card className="mt-6 border-2 border-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-primary" />
                    OTP Verification
                  </CardTitle>
                  <CardDescription>
                    Enter the 6-digit OTP sent to your registered mobile number
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="otp">Enter OTP</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="000000"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      className="text-center text-2xl tracking-widest"
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setShowOTP(false);
                        setOtp("");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={verifyOTP}
                      disabled={otp.length !== 6}
                    >
                      Verify OTP
                    </Button>
                  </div>
                  
                  <button
                    onClick={generateOTP}
                    className="text-sm text-primary hover:underline w-full text-center"
                  >
                    Resend OTP
                  </button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Bill Month</span>
                    <span className="font-medium">{billMonth}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Meals Consumed</span>
                    <span className="font-medium">{totalMeals} meals</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Rate per meal</span>
                    <span className="font-medium">₹{mealRate.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-foreground">Total Amount</span>
                      <span className="text-2xl font-bold gradient-text">₹{amount}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Secure Payment</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your payment information is encrypted and secure
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
