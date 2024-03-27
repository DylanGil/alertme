import { NextResponse } from "next/server";
import webpush from "web-push";

export async function GET() {
  return NextResponse.json({
    hello: "World",
  });
}

export async function POST(req) {
  console.log("about to send notification");
  // console.log("req.formData()", req.formData());
  const pushSubscription = await req.json();

  const vapidKeys = {
    subject: "mailto:dylan.flame.libra@gmail.com",
    publicKey:
      "BLH_9dS1RAYnHmt1709qC0UmHN8AaAY44E5FBOFALxM-9uT-6qvO2uNJzZszziexOpQq-bubij4MWoFskX5Jlbo",
    privateKey: "OK0UaeFQAKQC3PENLpuVqxqAl5LJMsNH3C2QlSAj0xA",
  };
  webpush.setVapidDetails(
    vapidKeys.subject,
    vapidKeys.publicKey,
    vapidKeys.privateKey
  );

  console.log("vapidKeys", vapidKeys);
  console.log("pushSubscription", JSON.parse(pushSubscription));

  const result = await webpush.sendNotification(
    JSON.parse(pushSubscription),
    JSON.stringify({
      title: "Hello Web Push",
      message: "Your web push notification is here!",
    })
  );

  return NextResponse.json(result);
}
