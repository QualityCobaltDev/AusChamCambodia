import { buildMetadata } from '@/lib/seo';

import { LegalContent } from '../legal-content';

export const metadata = buildMetadata({
  title: 'Terms of Use',
  description: 'Website usage terms and service conditions for AusCham Cambodia digital platforms.',
  path: '/legal/terms-of-use',
});

export default function LegalTermsOfUsePage() {
  return (
    <LegalContent
      title="Terms of use"
      breadcrumbLabel="Terms of Use"
      intro="This template provides structure for legal terms. Replace with approved legal language prior to production publication."
      sections={[
        {
          heading: 'Acceptable use',
          body: 'Users agree to lawful, respectful use of the platform and its published resources.',
        },
        {
          heading: 'Intellectual property',
          body: 'Chamber publications and marks remain protected and may not be reused without permission.',
        },
        {
          heading: 'Limitation',
          body: 'Editorial content is provided for informational purposes and should be reviewed with professional advice where needed.',
        },
      ]}
    />
  );
}
