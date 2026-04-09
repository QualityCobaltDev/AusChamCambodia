import { notFound } from 'next/navigation';
import { assignBrandAsset, updateNavigation, updateSiteSettings, uploadMedia } from '@/app/admin/actions';
import { EntityManager } from '@/components/admin/entity-manager';
import { Button, Card, Input, Select, Textarea } from '@/components/ui/primitives';
import { readDb } from '@/lib/cms-db';
import { getBranding } from '@/lib/cms-service';

const COLLECTIONS = new Set(['pages', 'membership', 'events', 'resources', 'sponsorship', 'about', 'contact', 'seo']);

export default async function AdminSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const db = readDb();

  if (section === 'site') {
    return (
      <Card>
        <h1 className="text-2xl font-semibold text-brand-navy-900">Site settings</h1>
        <form action={updateSiteSettings} className="mt-4 grid gap-3 md:grid-cols-2">
          <Input name="siteName" defaultValue={db.siteSettings.siteName} />
          <Input name="siteUrl" defaultValue={db.siteSettings.siteUrl} />
          <Input name="contactEmail" defaultValue={db.siteSettings.contactEmail} />
          <Input name="contactPhone" defaultValue={db.siteSettings.contactPhone} />
          <Input name="globalCtaLabel" defaultValue={db.siteSettings.globalCtaLabel} />
          <Input name="globalCtaHref" defaultValue={db.siteSettings.globalCtaHref} />
          <Input name="defaultMetaTitle" defaultValue={db.siteSettings.defaultMetaTitle} />
          <Input name="defaultMetaDescription" defaultValue={db.siteSettings.defaultMetaDescription} />
          <Textarea className="md:col-span-2" name="footerText" defaultValue={db.siteSettings.footerText} />
          <Textarea className="md:col-span-2" name="analyticsHead" defaultValue={db.siteSettings.analyticsHead} />
          <Button type="submit" className="md:col-span-2">Save settings</Button>
        </form>
      </Card>
    );
  }

  if (section === 'branding') {
    const branding = getBranding();
    return (
      <div className="space-y-6">
        <Card>
          <h1 className="text-2xl font-semibold text-brand-navy-900">Branding manager</h1>
          <p className="mt-2 text-sm text-brand-neutral-500">Upload logo, favicon, and social image assets.</p>
          <form action={uploadMedia} className="mt-4 grid gap-3 md:grid-cols-2">
            <Input name="title" placeholder="Asset title" required />
            <Input name="altText" placeholder="Alt text" />
            <Select name="mediaType" defaultValue="image">
              <option value="logo">Logo</option>
              <option value="favicon">Favicon</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="file">File</option>
            </Select>
            <Select name="assignTo" defaultValue="logo">
              <option value="logo">Assign as logo</option>
              <option value="favicon">Assign as favicon</option>
              <option value="og">Assign as OG image</option>
              <option value="">No assignment</option>
            </Select>
            <Input className="md:col-span-2" name="file" type="file" required />
            <Button type="submit" className="md:col-span-2">Upload asset</Button>
          </form>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold">Active brand assets</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-3 text-sm">
            <div>Logo: {branding.logo?.title ?? 'Not set'}</div>
            <div>Favicon: {branding.favicon?.title ?? 'Not set'}</div>
            <div>OG image: {branding.ogImage?.title ?? 'Not set'}</div>
          </div>
          <div className="mt-4 space-y-2">
            {db.mediaAssets.map((asset) => (
              <div key={asset.id} className="flex items-center justify-between rounded-lg border border-brand-neutral-200 px-3 py-2 text-sm">
                <span>{asset.title} ({asset.type})</span>
                <form action={assignBrandAsset} className="flex items-center gap-2">
                  <input type="hidden" name="assetId" value={asset.id} />
                  <Select name="target" defaultValue="logo">
                    <option value="logo">Logo</option>
                    <option value="favicon">Favicon</option>
                    <option value="og">OG image</option>
                  </Select>
                  <Button type="submit" size="sm">Assign</Button>
                </form>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  if (section === 'navigation') {
    return (
      <Card>
        <h1 className="text-2xl font-semibold text-brand-navy-900">Navigation manager</h1>
        <p className="mt-2 text-sm text-brand-neutral-500">Edit nav JSON arrays. Keep left/right balanced around centered logo.</p>
        <form action={updateNavigation} className="mt-4 grid gap-3">
          <Input name="adminLabel" defaultValue={db.navigation.adminLabel} />
          <label className="text-sm font-medium text-brand-neutral-600">Left nav JSON</label>
          <Textarea name="leftJson" defaultValue={JSON.stringify(db.navigation.left.map((item) => ({ id: item.id, slug: item.slug, title: item.title, href: String(item.href ?? '/'), sortOrder: item.sortOrder, visible: item.visible !== false })), null, 2)} className="min-h-56 font-mono text-xs" />
          <label className="text-sm font-medium text-brand-neutral-600">Right nav JSON</label>
          <Textarea name="rightJson" defaultValue={JSON.stringify(db.navigation.right.map((item) => ({ id: item.id, slug: item.slug, title: item.title, href: String(item.href ?? '/'), sortOrder: item.sortOrder, visible: item.visible !== false })), null, 2)} className="min-h-56 font-mono text-xs" />
          <Button type="submit">Save navigation</Button>
        </form>
      </Card>
    );
  }

  if (section === 'media') {
    return (
      <Card>
        <h1 className="text-2xl font-semibold text-brand-navy-900">Media library</h1>
        <p className="mt-2 text-sm text-brand-neutral-500">Manage uploaded files and brand assets.</p>
        <div className="mt-4 space-y-2">
          {db.mediaAssets.map((asset) => (
            <div key={asset.id} className="rounded-xl border border-brand-neutral-200 p-3 text-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-brand-neutral-700">{asset.title}</p>
                  <p className="text-brand-neutral-500">{asset.storagePath} · {Math.round(asset.fileSize / 1024)} KB</p>
                </div>
                {asset.mimeType.startsWith('image/') ? <img src={asset.storagePath} alt={asset.altText || asset.title} className="h-14 w-14 rounded object-cover" /> : null}
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (!COLLECTIONS.has(section)) notFound();

  const map = {
    pages: db.pageContent,
    membership: db.membershipTiers,
    events: db.events,
    resources: db.resources,
    sponsorship: db.sponsorshipPackages,
    about: db.aboutSections,
    contact: db.contactSettings,
    seo: db.pageContent,
  } as const;

  const collectionMap = {
    pages: 'pageContent',
    membership: 'membershipTiers',
    events: 'events',
    resources: 'resources',
    sponsorship: 'sponsorshipPackages',
    about: 'aboutSections',
    contact: 'contactSettings',
    seo: 'pageContent',
  } as const;

  const sectionKey = section as keyof typeof map;
  return <EntityManager title={`${section[0].toUpperCase()}${section.slice(1)} manager`} collection={collectionMap[sectionKey]} items={[...map[sectionKey]].sort((a, b) => a.sortOrder - b.sortOrder)} />;
}
