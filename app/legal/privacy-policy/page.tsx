import { buildMetadata } from '@/lib/seo';

import { LegalContent } from '../legal-content';

export const metadata = buildMetadata({
  title: 'Privacy Policy',
  description: 'How AusCham Cambodia handles personal data, communication preferences, and consent.',
  path: '/legal/privacy-policy',
});

export default function LegalPrivacyPolicyPage() {
  return (
    <LegalContent
      title="Privacy Policy"
      breadcrumbLabel="Privacy Policy"
      intro="This policy template outlines how data is collected, stored, and used. Final legal copy should be reviewed by counsel before publication."
      sections={[
        {
          heading: 'Data collection',
          body: 'We collect contact and inquiry information submitted through forms for member and partner communications.',
        },
        {
          heading: 'Use of data',
          body: 'Data is used to respond to enquiries, administer programs, and send relevant chamber updates where consent is provided.',
        },
        {
          heading: 'Retention',
          body: 'Retention periods and deletion workflows should align with final legal and operational policies.',
        },
      ]}
    />
  );
}
