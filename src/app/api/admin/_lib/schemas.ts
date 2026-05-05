// Shared Zod schemas for /api/admin/* routes. Centralizing them avoids
// drift between handlers (PUT used to silently accept fields POST refused)
// and gives every mutation one validation choke point ahead of its prisma
// query. Keep these aligned with the Prisma model in prisma/schema.prisma.

import { z } from 'zod';

const slug = z
  .string()
  .trim()
  .min(1)
  .max(200)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'slug must be kebab-case ASCII');

export const POST_STATUSES = ['DRAFT', 'PUBLISHED', 'ARCHIVED'] as const;

// Create-post body. Used by POST /api/admin/posts. Mirrors the fields the
// handler actually writes to the Post model; extra keys are dropped.
export const createPostSchema = z.object({
  title: z.string().trim().min(1).max(500),
  slug,
  content: z.string().max(1_000_000),
  excerpt: z.string().max(2000).optional().nullable(),
  coverImage: z.string().url().max(2048).optional().nullable(),
  metaTitle: z.string().max(200).optional().nullable(),
  metaDesc: z.string().max(500).optional().nullable(),
  keywords: z.array(z.string().max(100)).max(50).optional(),
  ogImage: z.string().url().max(2048).optional().nullable(),
  status: z.enum(POST_STATUSES).optional(),
  publishedAt: z.string().datetime().optional().nullable(),
  authorId: z.string().max(100).optional(),
  authorName: z.string().max(200).optional(),
  categoryId: z.string().max(100).optional().nullable(),
  tagIds: z.array(z.string().max(100)).max(50).optional(),
});

// Update-post body. PUT may set any subset of fields; required-on-create
// fields like title and slug are still validated when present so a partial
// update can't write empty strings or malformed slugs.
export const updatePostSchema = createPostSchema.partial();

// Create-category body. Used by POST /api/admin/categories.
export const createCategorySchema = z.object({
  name: z.string().trim().min(1).max(200),
  slug,
  description: z.string().max(2000).optional().nullable(),
  metaTitle: z.string().max(200).optional().nullable(),
  metaDesc: z.string().max(500).optional().nullable(),
});

export const updateCategorySchema = createCategorySchema.partial();

// Create-tag body. Used by POST /api/admin/tags.
export const createTagSchema = z.object({
  name: z.string().trim().min(1).max(200),
  slug,
});

export const updateTagSchema = createTagSchema.partial();

// validateBody is a small helper that turns the standard "parse JSON →
// validate → either return the typed value or short-circuit with a 400
// JSON response" boilerplate into one call. Returns either the typed data
// or the error Response the route should `return` directly.
import { NextResponse } from 'next/server';
import type { ZodSchema } from 'zod';

export type ValidationResult<T> =
  | { ok: true; data: T }
  | { ok: false; response: Response };

export async function validateBody<T>(
  request: Request,
  schema: ZodSchema<T>
): Promise<ValidationResult<T>> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return {
      ok: false,
      response: NextResponse.json({ error: '请求格式错误' }, { status: 400 }),
    };
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: '请求字段无效', issues: parsed.error.issues },
        { status: 400 }
      ),
    };
  }
  return { ok: true, data: parsed.data };
}
