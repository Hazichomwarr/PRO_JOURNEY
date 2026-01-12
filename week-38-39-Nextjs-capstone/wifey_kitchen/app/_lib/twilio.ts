//app/_lib/twilio.ts

"use server";

import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const twilioFromPhone = process.env.TWILIO_FROM_PHONE;

export async function sendSMS(to: string, body: string) {
  try {
    const message = await client.messages.create({
      body: body,
      from: twilioFromPhone,
      to: to,
    });
    console.log(`Message-SID: ${message.sid}`);
    return message;
  } catch (error) {
    console.error("Error sending SMS:", error);
    throw error;
  }
}
