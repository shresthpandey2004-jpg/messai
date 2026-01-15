import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CreditCard, 
  Smartphone, 
  Building2, 
  ArrowLeft, 
  Shield, 
  CheckCircle2,
  Loader2
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
  
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: ""
  });

  const [upiId, setUpiId] = useState("");

  const handlePayment = async (method: string) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
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
                            onClick={() => setSelectedUPI(app.id)}
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
                          onChange={(e) => setUpiId(e.target.value)}
                        />
                      </div>

                      <Button
                        className="w-full"
                        size="lg"
                        onClick={() => handlePayment("UPI")}
                        disabled={isProcessing || (!selectedUPI && !upiId)}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          `Pay ₹${amount}`
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
                          onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input
                          id="cardName"
                          placeholder="Name on card"
                          value={cardDetails.name}
                          onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
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
                            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            type="password"
                            placeholder="123"
                            maxLength={3}
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                          />
                        </div>
                      </div>

                      <Button
                        className="w-full"
                        size="lg"
                        onClick={() => handlePayment("Card")}
                        disabled={isProcessing || !cardDetails.number || !cardDetails.name}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          `Pay ₹${amount}`
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
                          className="w-full p-4 rounded-lg border-2 border-border hover:border-primary transition-all text-left"
                          disabled={isProcessing}
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
              </CardContent>
            </Card>
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
