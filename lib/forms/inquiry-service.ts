export async function persistInquiry(type: string, payload: unknown) {
  // TODO: Replace console logging with durable store (Postgres/CMS/queue).
  console.info(`[forms] ${type}`, payload);
}

export async function sendNotificationEmail(type: string, payload: unknown) {
  // TODO: Plug in production email provider (SES/Postmark/SendGrid) and templates.
  if (!process.env.FORM_NOTIFICATION_TO) return;
  console.info(`[forms-email] to=${process.env.FORM_NOTIFICATION_TO} type=${type}`, payload);
}

export async function pushToCrm(type: string, payload: unknown) {
  // TODO: Integrate HubSpot/Salesforce via API client; keep normalized payload contract.
  void type;
  void payload;
}

export async function handleInquiry(type: string, payload: unknown) {
  await Promise.all([persistInquiry(type, payload), sendNotificationEmail(type, payload), pushToCrm(type, payload)]);
}
