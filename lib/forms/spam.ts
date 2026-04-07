/**
 * Placeholder for captcha verification.
 * Integrate Google reCAPTCHA Enterprise or hCaptcha by validating token server-side.
 */
export async function verifySpamProtection(captchaToken?: string) {
  // Hook: call provider verification endpoint with secret from env when enabled.
  if (!process.env.FORM_CAPTCHA_ENABLED) return { ok: true };

  if (!captchaToken) return { ok: false, reason: 'Captcha token missing.' };

  // TODO: Replace with actual provider API call and score threshold checks.
  return { ok: true };
}
