/**
 * Automated Server-Side WhatsApp Dispatch Utility for DFMHUB
 * Sends automated WhatsApp notifications to DFMHUB Admin via CallMeBot / TextMeBot API.
 */

export interface WhatsAppInquiryPayload {
  productTitle: string;
  category?: string;
  companyName: string;
  contactPerson: string;
  phoneNumber: string;
  email: string;
  message?: string;
}

export async function sendAutomatedWhatsAppNotification(payload: WhatsAppInquiryPayload) {
  const adminPhone = process.env.WHATSAPP_ADMIN_PHONE || "919110334346";
  const apiKey = process.env.CALLMEBOT_API_KEY || "DsTyfJ5UpESV";

  const cleanPhone = adminPhone.trim();
  const phoneWithPlus = cleanPhone.startsWith("+") ? cleanPhone : `+${cleanPhone}`;

  const formattedMessage = `*AUTOMATED NEW PRODUCT INQUIRY — DFMHUB* ⚡\n\n*Product:* ${payload.productTitle}\n*Category:* ${payload.category || "N/A"}\n*Company:* ${payload.companyName}\n*Contact Person:* ${payload.contactPerson}\n*Customer Phone:* ${payload.phoneNumber}\n*Customer Email:* ${payload.email}\n${payload.message ? `*Requirements:* ${payload.message}\n` : ""}\n_Received at: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}_`;

  // 1. TextMeBot Direct Gateway
  try {
    const textmebotUrl = `https://api.textmebot.com/send.php?recipient=${encodeURIComponent(phoneWithPlus)}&phone=${encodeURIComponent(phoneWithPlus)}&apikey=${encodeURIComponent(apiKey)}&text=${encodeURIComponent(formattedMessage)}`;
    const res = await fetch(textmebotUrl);
    const resText = await res.text();
    console.log("TextMeBot API response:", res.status, resText);

    if (res.ok && !resText.toLowerCase().includes("error")) {
      return { sent: true, provider: "textmebot", status: res.status, responseText: resText };
    }
  } catch (err) {
    console.error("TextMeBot dispatch error:", err);
  }

  // 2. CallMeBot Fallback Gateway
  try {
    const callmebotUrl = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phoneWithPlus)}&text=${encodeURIComponent(formattedMessage)}&apikey=${encodeURIComponent(apiKey)}`;
    const res = await fetch(callmebotUrl);
    const resText = await res.text();
    console.log("CallMeBot API response:", res.status, resText);

    return { sent: res.ok, provider: "callmebot", status: res.status, responseText: resText };
  } catch (err) {
    console.error("CallMeBot dispatch error:", err);
    return { sent: false, error: err };
  }
}
