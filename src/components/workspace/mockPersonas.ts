export type Persona = {
  id: string;
  name: string;
  loyaltyTier: string;
  region: string;
  language: string;
  preferredChannel: string;
  isRepeatBuyer: boolean;
  avatarUrl: string;
  session: {
    cartValue: number;
    items: number;
    category: string;
    checkoutAttempts: number;
    durationMins: number;
    couponApplied: boolean;
    lastViewed: string;
  };
  intent: {
    shippingConcern: number;
    couponIssue: number;
    returnHesitation: number;
    sustainability: number;
    urgency: number;
  };
  consent: {
    whatsapp: boolean;
    sms: boolean;
    promo: boolean;
    frequencyCapDeltas: number;
  };
  ai: {
    conversionProb: number;
    fatigueRisk: number;
    churnRisk: number;
    segment: string;
    bestChannel: string;
    bestTiming: string;
    tone: string;
    expectedUplift: number;
    confidence: number;
  };
  output: {
    platform: "WhatsApp" | "SMS" | "Instagram" | "Email";
    previewMessage: string[];
    replyRate: number;
  };
};

export const personas: Persona[] = [
  {
    id: "usr_8499k",
    name: "Elena Rodriguez",
    loyaltyTier: "Platinum VIP",
    region: "Europe (Spain)",
    language: "Spanish",
    preferredChannel: "WhatsApp",
    isRepeatBuyer: true,
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    session: {
      cartValue: 1250.00,
      items: 3,
      category: "Luxury Electronics",
      checkoutAttempts: 2,
      durationMins: 45,
      couponApplied: false,
      lastViewed: "Sony A7IV Body",
    },
    intent: {
      shippingConcern: 85,
      couponIssue: 10,
      returnHesitation: 40,
      sustainability: 15,
      urgency: 90,
    },
    consent: {
      whatsapp: true,
      sms: true,
      promo: true,
      frequencyCapDeltas: 2,
    },
    ai: {
      conversionProb: 94,
      fatigueRisk: 12,
      churnRisk: 8,
      segment: "High-Value Wavering",
      bestChannel: "WhatsApp",
      bestTiming: "Immediate (Real-time)",
      tone: "Premium Reassurance",
      expectedUplift: 18.5,
      confidence: 98,
    },
    output: {
      platform: "WhatsApp",
      previewMessage: [
        "Hi Elena, noticed you're looking at the A7IV.",
        "As a Platinum VIP, I've secured expedited 24h shipping for your cart to Madrid for free. Shall I apply it?"
      ],
      replyRate: 76,
    }
  },
  {
    id: "usr_1192x",
    name: "Marcus Johnson",
    loyaltyTier: "Silver",
    region: "North America (US)",
    language: "English",
    preferredChannel: "SMS",
    isRepeatBuyer: false,
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    session: {
      cartValue: 85.50,
      items: 1,
      category: "Athleisure",
      checkoutAttempts: 1,
      durationMins: 8,
      couponApplied: true,
      lastViewed: "Pace Running Shorts",
    },
    intent: {
      shippingConcern: 20,
      couponIssue: 95,
      returnHesitation: 60,
      sustainability: 30,
      urgency: 50,
    },
    consent: {
      whatsapp: false,
      sms: true,
      promo: true,
      frequencyCapDeltas: 0,
    },
    ai: {
      conversionProb: 65,
      fatigueRisk: 68,
      churnRisk: 42,
      segment: "Discount Seeker",
      bestChannel: "SMS",
      bestTiming: "Delay 2 Hours",
      tone: "Urgent/Incentivized",
      expectedUplift: 4.2,
      confidence: 88,
    },
    output: {
      platform: "SMS",
      previewMessage: [
        "Hey Marcus! Your 'WELCOME10' promo code expires in 2 hrs.",
        "Your Pace Running Shorts are held in your cart. Tap to complete: link.io/c23x"
      ],
      replyRate: 34,
    }
  },
  {
    id: "usr_9912z",
    name: "Chloe Chen",
    loyaltyTier: "Gold",
    region: "Asia (SG)",
    language: "English",
    preferredChannel: "Instagram DM",
    isRepeatBuyer: true,
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026703d",
    session: {
      cartValue: 340.00,
      items: 4,
      category: "Sustainable Fashion",
      checkoutAttempts: 0,
      durationMins: 120,
      couponApplied: false,
      lastViewed: "Organic Cotton Midi Dress",
    },
    intent: {
      shippingConcern: 0,
      couponIssue: 0,
      returnHesitation: 80,
      sustainability: 95,
      urgency: 10,
    },
    consent: {
      whatsapp: false,
      sms: false,
      promo: false,
      frequencyCapDeltas: -1,
    },
    ai: {
      conversionProb: 45,
      fatigueRisk: 85,
      churnRisk: 22,
      segment: "Browsing/Passive",
      bestChannel: "Instagram DM",
      bestTiming: "Hold (Wait for trigger)",
      tone: "Educational/Soft",
      expectedUplift: -1.2,
      confidence: 72,
    },
    output: {
      platform: "Instagram",
      previewMessage: [
        "Did you know our Cotton Midi dresses save 500 gallons of water?",
        "Read our sustainability report here and see why our returns are under 1% \uD83C\uDF3F"
      ],
      replyRate: 15,
    }
  }
];
