import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import { CONTENT_URL, adminHeaders, BlogPost } from '@/lib/adminApi';

const emptyForm = { title: '', titleEn: '', tag: '', tagEn: '', date: '' };

const AdminBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    fetch(`${CONTENT_URL}?resource=posts`)
      .then((r) => r.json())
      .then((data) => setPosts(data.posts || []))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...emptyForm, date: new Date().toISOString().slice(0, 10) });
    setDialogOpen(true);
  };

  const openEdit = (p: BlogPost) => {
    setEditing(p);
    setForm({ title: p.title, titleEn: p.titleEn, tag: p.tag, tagEn: p.tagEn, date: p.date.slice(0, 10) });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = { ...form, sortOrder: editing?.sortOrder ?? posts.length + 1 };
      const url = editing ? `${CONTENT_URL}?resource=posts&id=${editing.id}` : `${CONTENT_URL}?resource=posts`;
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: adminHeaders(), body: JSON.stringify(payload) });
      if (!res.ok) throw new Error();
      setDialogOpen(false);
      load();
    } catch {
      alert('Не удалось сохранить');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить эту статью?')) return;
    const res = await fetch(`${CONTENT_URL}?resource=posts&id=${id}`, { method: 'DELETE', headers: adminHeaders() });
    if (res.ok) load();
    else alert('Не удалось удалить');
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-3xl">Блог</h2>
        <Button onClick={openCreate}><Icon name="Plus" size={16} className="mr-2" /> Добавить статью</Button>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Загрузка...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((p) => (
            <div key={p.id} className="border border-border rounded-lg p-4 bg-card">
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                <span className="bg-beige-soft px-2 py-0.5 rounded-full">{p.tag}</span>
                <span>{p.date.slice(0, 10)}</span>
              </div>
              <h3 className="font-display text-lg leading-tight mb-3">{p.title}</h3>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1" onClick={() => openEdit(p)}>
                  <Icon name="Pencil" size={14} className="mr-1" /> Изменить
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(p.id)}>
                  <Icon name="Trash2" size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? 'Редактировать статью' : 'Новая статья'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="mb-1.5 block">Заголовок (рус)</Label>
                <Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
              </div>
              <div>
                <Label className="mb-1.5 block">Заголовок (eng)</Label>
                <Input value={form.titleEn} onChange={(e) => setForm((f) => ({ ...f, titleEn: e.target.value }))} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="mb-1.5 block">Тег (рус)</Label>
                <Input value={form.tag} onChange={(e) => setForm((f) => ({ ...f, tag: e.target.value }))} />
              </div>
              <div>
                <Label className="mb-1.5 block">Тег (eng)</Label>
                <Input value={form.tagEn} onChange={(e) => setForm((f) => ({ ...f, tagEn: e.target.value }))} />
              </div>
            </div>
            <div>
              <Label className="mb-1.5 block">Дата</Label>
              <Input type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Отмена</Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? <Icon name="Loader2" size={14} className="mr-2 animate-spin" /> : null}
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminBlog;
