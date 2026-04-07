export type CmsClient = {
  provider: string;
};

export function getCmsClient(): CmsClient {
  return {
    provider: process.env.CMS_PROVIDER ?? 'unconfigured',
  };
}
