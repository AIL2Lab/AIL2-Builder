import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { updateTagSchema, validateBody } from '../../_lib/schemas';

// PUT /api/admin/tags/[id]
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const parsed = await validateBody(request, updateTagSchema);
  if (!parsed.ok) return parsed.response;
  const data = parsed.data;

  try {
    const existing = await prisma.tag.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: '标签不存在' }, { status: 404 });
    }

    if (data.slug && data.slug !== existing.slug) {
      const slugConflict = await prisma.tag.findUnique({
        where: { slug: data.slug },
      });
      if (slugConflict) {
        return NextResponse.json(
          { error: 'Slug 已被其他标签使用' },
          { status: 400 }
        );
      }
    }

    if (data.name && data.name !== existing.name) {
      const nameConflict = await prisma.tag.findUnique({
        where: { name: data.name },
      });
      if (nameConflict) {
        return NextResponse.json(
          { error: '标签名称已被使用' },
          { status: 400 }
        );
      }
    }

    const updatedTag = await prisma.tag.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
      },
    });
    return NextResponse.json(updatedTag);
  } catch (error) {
    console.error('更新标签失败:', error);
    return NextResponse.json(
      { error: '更新标签失败' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/tags/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const existing = await prisma.tag.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: '标签不存在' }, { status: 404 });
    }
    await prisma.tag.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('删除标签失败:', error);
    return NextResponse.json(
      { error: '删除标签失败' },
      { status: 500 }
    );
  }
}
