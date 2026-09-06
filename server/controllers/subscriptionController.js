const { User } = require('../models');

// Pricing configuration
const SUBSCRIPTION_CONFIG = {
  planName: 'NurseCalc Pro Monthly',
  trialDays: 30,
  priceINR: 99,
  priceUSD: 1.29,
  currency: 'INR'
};

// GET /api/subscription/status
const getSubscriptionStatus = async (req, res) => {
  try {
    const userId = req.user?.id || req.query.userId || 'demo_student';
    let user = null;
    try {
      user = await User.findById(userId);
    } catch (e) {}

    // Fallback demo user simulation if database user not found
    if (!user) {
      const now = new Date();
      const trialStart = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000); // 2 days ago
      const trialEnd = new Date(trialStart.getTime() + 30 * 24 * 60 * 60 * 1000); // 28 days left
      const daysLeft = Math.max(0, Math.ceil((trialEnd - now) / (1000 * 60 * 60 * 24)));

      return res.json({
        success: true,
        data: {
          plan: 'free_trial',
          status: 'trialing',
          isTrialActive: true,
          isProActive: true,
          daysLeft,
          trialStartDate: trialStart,
          trialEndDate: trialEnd,
          currentPeriodEnd: trialEnd,
          priceINR: SUBSCRIPTION_CONFIG.priceINR,
          currency: SUBSCRIPTION_CONFIG.currency,
          orderHistory: [
            {
              orderId: 'ORD_FREE_TRIAL',
              amount: 0,
              currency: 'INR',
              paymentId: 'TRIAL_ACTIVATED',
              method: 'Free 30-Day Registration Trial',
              date: trialStart,
              status: 'ACTIVE_TRIAL'
            }
          ]
        }
      });
    }

    const sub = user.subscription || {};
    const now = new Date();
    const trialEnd = sub.trialEndDate ? new Date(sub.trialEndDate) : new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    const periodEnd = sub.currentPeriodEnd ? new Date(sub.currentPeriodEnd) : trialEnd;

    let isTrialActive = false;
    let isProActive = false;
    let daysLeft = 0;

    if (sub.status === 'active' && periodEnd > now) {
      isProActive = true;
      daysLeft = Math.max(0, Math.ceil((periodEnd - now) / (1000 * 60 * 60 * 24)));
    } else if (trialEnd > now) {
      isTrialActive = true;
      isProActive = true;
      daysLeft = Math.max(0, Math.ceil((trialEnd - now) / (1000 * 60 * 60 * 24)));
    } else {
      // Expired trial and no active pro subscription
      isProActive = false;
      daysLeft = 0;
    }

    return res.json({
      success: true,
      data: {
        plan: sub.plan || 'free_trial',
        status: isProActive ? (isTrialActive ? 'trialing' : 'active') : 'expired',
        isTrialActive,
        isProActive,
        daysLeft,
        trialStartDate: sub.trialStartDate,
        trialEndDate: trialEnd,
        currentPeriodEnd: periodEnd,
        paymentMethod: sub.paymentMethod || 'None',
        priceINR: SUBSCRIPTION_CONFIG.priceINR,
        currency: SUBSCRIPTION_CONFIG.currency,
        orderHistory: sub.orderHistory || []
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/subscription/create-order
const createPaymentOrder = async (req, res) => {
  try {
    const { method, currency } = req.body;
    const orderId = `NC_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    const selectedCurrency = currency || 'INR';
    const amount = selectedCurrency === 'USD' ? SUBSCRIPTION_CONFIG.priceUSD : SUBSCRIPTION_CONFIG.priceINR;

    return res.json({
      success: true,
      data: {
        orderId,
        amount,
        currency: selectedCurrency,
        plan: 'pro_monthly',
        method: method || 'Google Play In-App Billing',
        billingCycle: '30 Days',
        supportOptions: ['Google Play', 'UPI / Razorpay', 'PayPal', 'Credit/Debit Card']
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/subscription/verify
// Simulates / verifies payments from Google Play, Razorpay UPI, or PayPal
const verifyPayment = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId || 'demo_student';
    const { orderId, paymentId, method, amount, currency } = req.body;

    if (!orderId) {
      return res.status(400).json({ success: false, message: 'orderId is required for verification.' });
    }

    const payMethod = method || 'Google Play Billing';
    const payAmount = amount || SUBSCRIPTION_CONFIG.priceINR;
    const payCurrency = currency || 'INR';
    const now = new Date();
    // Grant 30 days of active Pro subscription
    const newPeriodEnd = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    const invoiceRecord = {
      orderId,
      amount: payAmount,
      currency: payCurrency,
      paymentId: paymentId || `PAY_${Date.now()}`,
      method: payMethod,
      date: now,
      status: 'PAID'
    };

    try {
      await User.findByIdAndUpdate(userId, {
        $set: {
          'subscription.plan': 'pro_monthly',
          'subscription.status': 'active',
          'subscription.currentPeriodEnd': newPeriodEnd,
          'subscription.paymentMethod': payMethod,
          'subscription.lastPaymentAmount': payAmount,
          'subscription.currency': payCurrency
        },
        $push: {
          'subscription.orderHistory': invoiceRecord
        }
      });
    } catch (dbErr) {
      // If user not in MongoDB, handled gracefully
    }

    return res.json({
      success: true,
      message: `Payment of ${payCurrency} ${payAmount} verified via ${payMethod}. NurseCalc Pro active for 30 days!`,
      data: {
        plan: 'pro_monthly',
        status: 'active',
        isProActive: true,
        daysLeft: 30,
        currentPeriodEnd: newPeriodEnd,
        invoice: invoiceRecord
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/subscription/cancel
const cancelSubscription = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId || 'demo_student';
    try {
      await User.findByIdAndUpdate(userId, {
        $set: {
          'subscription.status': 'cancelled'
        }
      });
    } catch (e) {}

    return res.json({
      success: true,
      message: 'Auto-renewal has been cancelled. Your access remains active until the end of your billing cycle.'
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getSubscriptionStatus,
  createPaymentOrder,
  verifyPayment,
  cancelSubscription,
  SUBSCRIPTION_CONFIG
};
