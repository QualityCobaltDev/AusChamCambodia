import type { Metadata } from 'next';

const BASE_URL = 'https://missioncontrol.quest';

export function buildMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}${path}`,
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}${path}`,
      siteName: 'AusCham Cambodia',
      type: 'website',
    },
  };
}
