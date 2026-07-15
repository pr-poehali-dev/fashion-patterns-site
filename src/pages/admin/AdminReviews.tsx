import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import { CONTENT_URL, adminHeaders, Review } from '@/lib/adminApi';

const emptyForm = { name: '', stars: 5, textRu: '', textEn: '' };

const AdminReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Review | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    fetch(`${CONTENT_URL}?resource=reviews`)
      .then((r) => r.json())
      .then((data) => setReviews(data.reviews || []))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (r: Review) => {
    setEditing(r);
    setForm({ name: r.name, stars: r.stars, textRu: r.textRu, textEn: r.textEn });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = { ...form, sortOrder: editing?.sortOrder ?? reviews.length + 1 };
      const url = editing ? `${CONTENT_URL}?resource=reviews&id=${editing.id}` : `${CONTENT_URL}?resource=reviews`;
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
    if (!confirm('Удалить этот отзыв?')) return;
    const res = await fetch(`${CONTENT_URL}?resource=reviews&id=${id}`, { method: 'DELETE', headers: adminHeaders() });
    if (res.ok) load();
    else alert('Не удалось удалить');
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-3xl">Отзывы</h2>
        <Button onClick={openCreate}><Icon name="Plus" size={16} className="mr-2" /> Добавить отзыв</Button>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Загрузка...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((r) => (
            <div key={r.id} className="border border-border rounded-lg p-4 bg-card">
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Icon key={s} name="Star" size={14} className={s < r.stars ? 'fill-foreground' : 'opacity-20'} />
                ))}
              </div>
              <p className="text-sm mb-3 line-clamp-3">{r.textRu}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{r.name}</span>
                <div className="flex gap-1">
                  <Button size="sm" variant="outline" onClick={() => openEdit(r)}><Icon name="Pencil" size={14} /></Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(r.id)}><Icon name="Trash2" size={14} /></Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? 'Редактировать отзыв' : 'Новый отзыв'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="mb-1.5 block">Имя автора</Label>
                <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
              </div>
              <div>
                <Label className="mb-1.5 block">Рейтинг (1-5)</Label>
                <Input type="number" min={1} max={5} value={form.stars} onChange={(e) => setForm((f) => ({ ...f, stars: Number(e.target.value) }))} />
              </div>
            </div>
            <div>
              <Label className="mb-1.5 block">Текст (рус)</Label>
              <Textarea rows={3} value={form.textRu} onChange={(e) => setForm((f) => ({ ...f, textRu: e.target.value }))} />
            </div>
            <div>
              <Label className="mb-1.5 block">Текст (eng)</Label>
              <Textarea rows={3} value={form.textEn} onChange={(e) => setForm((f) => ({ ...f, textEn: e.target.value }))} />
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

export default AdminReviews;
