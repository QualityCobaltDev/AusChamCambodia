'use server';

import { revalidatePath } from 'next/cache';
import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { touchAudit, upsertEntity, writeDb, deleteEntity, type CmsEntity } from '@/lib/cms-db';
type EntityCollectionKey = 'pageContent' | 'membershipTiers' | 'events' | 'resources' | 'sponsorshipPackages' | 'aboutSections' | 'contactSettings';

function toBool(input: FormDataEntryValue | null) {
  return input === 'on' || input === 'true';
}

function revalidateAll() {
  ['/', '/membership', '/events', '/resources', '/sponsorship', '/about', '/contact'].forEach((route) => revalidatePath(route));
}

export async function updateSiteSettings(formData: FormData) {
  writeDb((db) => {
    db.siteSettings = {
      ...db.siteSettings,
      siteName: String(formData.get('siteName') ?? db.siteSettings.siteName),
      siteUrl: String(formData.get('siteUrl') ?? db.siteSettings.siteUrl),
      contactEmail: String(formData.get('contactEmail') ?? db.siteSettings.contactEmail),
      contactPhone: String(formData.get('contactPhone') ?? db.siteSettings.contactPhone),
      footerText: String(formData.get('footerText') ?? db.siteSettings.footerText),
      globalCtaLabel: String(formData.get('globalCtaLabel') ?? db.siteSettings.globalCtaLabel),
      globalCtaHref: String(formData.get('globalCtaHref') ?? db.siteSettings.globalCtaHref),
      defaultMetaTitle: String(formData.get('defaultMetaTitle') ?? db.siteSettings.defaultMetaTitle),
      defaultMetaDescription: String(formData.get('defaultMetaDescription') ?? db.siteSettings.defaultMetaDescription),
      analyticsHead: String(formData.get('analyticsHead') ?? db.siteSettings.analyticsHead ?? ''),
      updatedAt: new Date().toISOString(),
    };
    touchAudit(db, 'update', 'siteSettings', 'global');
    return db;
  });
  revalidateAll();
}

export async function updateNavigation(formData: FormData) {
  writeDb((db) => {
    const parseSide = (side: 'left' | 'right') => {
      const raw = String(formData.get(`${side}Json`) ?? '[]');
      try {
        const parsed = JSON.parse(raw) as Array<{ id?: string; slug: string; title: string; href: string; sortOrder?: number; visible?: boolean }>;
        return parsed.map((item, index) => ({
          id: item.id ?? `${side}-${item.slug}-${index}`,
          slug: item.slug,
          title: item.title,
          status: 'published',
          sortOrder: item.sortOrder ?? index + 1,
          href: item.href,
          visible: item.visible ?? true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          publishedAt: new Date().toISOString(),
        } as CmsEntity));
      } catch {
        return db.navigation[side];
      }
    };

    db.navigation.left = parseSide('left');
    db.navigation.right = parseSide('right');
    db.navigation.adminLabel = String(formData.get('adminLabel') ?? db.navigation.adminLabel);
    db.navigation.updatedAt = new Date().toISOString();
    touchAudit(db, 'update', 'navigation', 'main');
    return db;
  });
  revalidateAll();
}

export async function saveEntity(formData: FormData) {
  const collection = String(formData.get('collection') ?? '') as EntityCollectionKey;
  const payload: Partial<CmsEntity> & { slug: string; title: string } = {
    id: String(formData.get('id') ?? '') || undefined,
    slug: String(formData.get('slug') ?? '').trim(),
    title: String(formData.get('title') ?? '').trim(),
    subtitle: String(formData.get('subtitle') ?? '').trim(),
    excerpt: String(formData.get('excerpt') ?? '').trim(),
    body: String(formData.get('body') ?? '').trim(),
    status: (String(formData.get('status') ?? 'draft') as CmsEntity['status']) ?? 'draft',
    featured: toBool(formData.get('featured')),
    sortOrder: Number(formData.get('sortOrder') ?? 1),
    tags: String(formData.get('tags') ?? '')
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean),
  };

  writeDb((db) => {
    const target = db[collection] as CmsEntity[];
    upsertEntity(target, {
      ...payload,
      ctaLabel: String(formData.get('ctaLabel') ?? ''),
      ctaUrl: String(formData.get('ctaUrl') ?? ''),
      price: Number(formData.get('price') ?? 0),
      category: String(formData.get('category') ?? ''),
      location: String(formData.get('location') ?? ''),
      startDate: String(formData.get('startDate') ?? ''),
      endDate: String(formData.get('endDate') ?? ''),
      registrationUrl: String(formData.get('registrationUrl') ?? ''),
      externalUrl: String(formData.get('externalUrl') ?? ''),
      recipientEmail: String(formData.get('recipientEmail') ?? ''),
      audienceType: String(formData.get('audienceType') ?? ''),
      inclusionCount: Number(formData.get('inclusionCount') ?? 0),
      benefits: String(formData.get('benefits') ?? '')
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      sections: String(formData.get('sections') ?? ''),
    });
    touchAudit(db, 'upsert', String(collection), payload.id ?? payload.slug);
    return db;
  });
  revalidateAll();
  revalidatePath('/admin');
}

export async function removeEntity(formData: FormData) {
  const collection = String(formData.get('collection') ?? '') as EntityCollectionKey;
  const id = String(formData.get('id') ?? '');

  writeDb((db) => {
    const target = db[collection] as CmsEntity[];
    db[collection] = deleteEntity(target, id) as never;
    touchAudit(db, 'delete', String(collection), id);
    return db;
  });
  revalidateAll();
  revalidatePath('/admin');
}

export async function uploadMedia(formData: FormData) {
  const file = formData.get('file');
  if (!(file instanceof File)) return;
  const bytes = Buffer.from(await file.arrayBuffer());
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const sanitized = file.name.replace(/[^a-zA-Z0-9_.-]/g, '-').toLowerCase();
  const unique = `${Date.now()}-${sanitized}`;
  const outputPath = path.join(uploadDir, unique);
  fs.writeFileSync(outputPath, bytes);

  const type = file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'file';

  writeDb((db) => {
    const now = new Date().toISOString();
    const assetId = randomUUID();
    db.mediaAssets.unshift({
      id: assetId,
      slug: sanitized,
      title: String(formData.get('title') ?? file.name),
      type: String(formData.get('mediaType') ?? type) as 'image' | 'video' | 'file' | 'logo' | 'favicon',
      mimeType: file.type,
      storagePath: `/uploads/${unique}`,
      altText: String(formData.get('altText') ?? ''),
      fileSize: bytes.length,
      status: 'published',
      createdAt: now,
      updatedAt: now,
    });

    const assignTo = String(formData.get('assignTo') ?? '');
    if (assignTo === 'logo') db.branding.logoAssetId = assetId;
    if (assignTo === 'favicon') db.branding.faviconAssetId = assetId;
    if (assignTo === 'og') db.branding.ogImageAssetId = assetId;

    db.branding.updatedAt = now;
    touchAudit(db, 'upload', 'mediaAssets', assetId);
    return db;
  });
  revalidateAll();
  revalidatePath('/admin/media');
}

export async function assignBrandAsset(formData: FormData) {
  const target = String(formData.get('target') ?? 'logo');
  const assetId = String(formData.get('assetId') ?? '');
  writeDb((db) => {
    if (target === 'logo') db.branding.logoAssetId = assetId;
    if (target === 'favicon') db.branding.faviconAssetId = assetId;
    if (target === 'og') db.branding.ogImageAssetId = assetId;
    db.branding.updatedAt = new Date().toISOString();
    touchAudit(db, 'assign', 'branding', `${target}:${assetId}`);
    return db;
  });
  revalidateAll();
}
