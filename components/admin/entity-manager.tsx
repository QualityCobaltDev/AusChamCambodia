import { saveEntity, removeEntity } from '@/app/admin/actions';
import { Button, Card, Input, Select, Textarea } from '@/components/ui/primitives';
import type { CmsEntity } from '@/lib/cms-db';

export function EntityManager({ title, collection, items }: { title: string; collection: string; items: CmsEntity[] }) {
  return (
    <div className="space-y-5">
      <Card>
        <h2 className="text-xl font-semibold text-brand-navy-900">{title}</h2>
        <form action={saveEntity} className="mt-4 grid gap-3 md:grid-cols-2">
          <input type="hidden" name="collection" value={collection} />
          <Input name="slug" placeholder="slug" required />
          <Input name="title" placeholder="Title" required />
          <Input name="subtitle" placeholder="Subtitle" />
          <Input name="excerpt" placeholder="Excerpt" />
          <Input name="category" placeholder="Category" />
          <Input name="location" placeholder="Location" />
          <Input name="startDate" type="datetime-local" placeholder="Start date" />
          <Input name="endDate" type="datetime-local" placeholder="End date" />
          <Input name="registrationUrl" placeholder="Registration URL" />
          <Input name="externalUrl" placeholder="External URL" />
          <Input name="price" type="number" placeholder="Price" />
          <Input name="inclusionCount" type="number" placeholder="Inclusion count" />
          <Input name="ctaLabel" placeholder="CTA label" />
          <Input name="ctaUrl" placeholder="CTA URL" />
          <Input name="recipientEmail" placeholder="Recipient email" />
          <Input name="audienceType" placeholder="Audience type" />
          <Input name="sortOrder" type="number" defaultValue={items.length + 1} placeholder="Sort order" />
          <Input name="tags" placeholder="Tags comma separated" />
          <Select name="status" defaultValue="draft">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </Select>
          <label className="flex items-center gap-2 text-sm text-brand-neutral-600">
            <input type="checkbox" name="featured" /> Featured
          </label>
          <Textarea className="md:col-span-2" name="benefits" placeholder="Benefits (one per line)" />
          <Textarea className="md:col-span-2" name="body" placeholder="Body content" />
          <Button type="submit" className="md:col-span-2">
            Save item
          </Button>
        </form>
      </Card>

      {items.map((item) => (
        <Card key={item.id}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-brand-navy-900">{item.title}</h3>
              <p className="text-sm text-brand-neutral-500">/{item.slug} · {item.status}</p>
              {item.excerpt ? <p className="mt-2 text-sm text-brand-neutral-600">{item.excerpt}</p> : null}
            </div>
            <form action={removeEntity}>
              <input type="hidden" name="collection" value={collection} />
              <input type="hidden" name="id" value={item.id} />
              <Button variant="secondary" type="submit">
                Delete
              </Button>
            </form>
          </div>
        </Card>
      ))}
    </div>
  );
}
