'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Small client island so the surrounding page can stay a Server Component.
// We can't use a confirm() dialog or DELETE fetch from the server, so this
// button isolates the only interactivity the row needs.
export default function DeletePostButton({ postId }: { postId: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleDelete() {
    if (!confirm('确定要删除这篇文章吗？')) return;
    setPending(true);
    try {
      const res = await fetch(`/api/admin/posts/${postId}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        alert(body.error ?? '删除失败');
        return;
      }
      // Server-side data fetch will re-run with the row gone. router.refresh
      // is preferred over a full reload so client state (filter inputs) stays.
      router.refresh();
    } catch {
      alert('删除失败');
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={pending}
      className="text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
    >
      {pending ? '删除中...' : '删除'}
    </button>
  );
}
