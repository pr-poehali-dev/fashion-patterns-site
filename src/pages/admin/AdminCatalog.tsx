import { useEffect, useRef, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { CATALOG_URL, adminHeaders, uploadImage, Pattern } from '@/lib/adminApi';
import { categories } from '@/data/catalog';

const emptyForm = {
  name: '', nameEn: '', category: categories[0].ru, categoryEn: categories[0].en,
  price: 0, difficulty: 'Легко', difficultyEn: 'Easy', image: '',
};

const DIFFICULTIES = [
  { ru: 'Легко', en: 'Easy' },
  { ru: 'Средне', en: 'Medium' },
  { ru: 'Сложно', en: 'Hard' },
];

const AdminCatalog = () => {
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Pattern | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = () => {
    setLoading(true);
    fetch(CATALOG_URL)
      .then((r) => r.json())
      .then((data) => setPatterns(data.patterns || []))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (p: Pattern) => {
    setEditing(p);
    setForm({
      name: p.name, nameEn: p.nameEn, category: p.category, categoryEn: p.categoryEn,
      price: p.price, difficulty: p.difficulty, difficultyEn: p.difficultyEn, image: p.image || '',
    });
    setDialogOpen(true);
  };

  const handleCategoryChange = (ru: string) => {
    const cat = categories.find((c) => c.ru === ru);
    setForm((f) => ({ ...f, category: ru, categoryEn: cat?.en || '' }));
  };

  const handleDifficultyChange = (ru: string) => {
    const d = DIFFICULTIES.find((x) => x.ru === ru);
    setForm((f) => ({ ...f, difficulty: ru, difficultyEn: d?.en || '' }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      setForm((f) => ({ ...f, image: url }));
    } catch {
      alert('Не удалось загрузить фото');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = { ...form, sortOrder: editing?.sortOrder ?? patterns.length + 1 };
      const url = editing ? `${CATALOG_URL}?id=${editing.id}` : CATALOG_URL;
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
    if (!confirm('Удалить эту позицию из каталога?')) return;
    const res = await fetch(`${CATALOG_URL}?id=${id}`, { method: 'DELETE', headers: adminHeaders() });
    if (res.ok) load();
    else alert('Не удалось удалить');
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-3xl">Каталог товаров</h2>
        <Button onClick={openCreate}><Icon name="Plus" size={16} className="mr-2" /> Добавить позицию</Button>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Загрузка...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {patterns.map((p) => (
            <div key={p.id} className="border border-border rounded-lg overflow-hidden bg-card">
              <div className="aspect-[3/4] bg-beige-soft">
                {p.image && <img src={p.image} alt={p.name} className="w-full h-full object-cover" />}
              </div>
              <div className="p-3">
                <p className="text-xs text-muted-foreground uppercase">{p.category}</p>
                <h3 className="font-medium text-sm leading-tight mt-0.5 mb-1">{p.name}</h3>
                <p className="text-sm mb-2">{p.price} ₽ · {p.difficulty}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => openEdit(p)}>
                    <Icon name="Pencil" size={14} className="mr-1" /> Изменить
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(p.id)}>
                    <Icon name="Trash2" size={14} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? 'Редактировать позицию' : 'Новая позиция'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="mb-1.5 block">Фото</Label>
              <div className="flex items-center gap-3">
                {form.image && (
                  <img src={form.image} alt="" className="w-16 h-20 object-cover rounded border border-border" />
                )}
                <Button type="button" variant="outline" onClick={() => fileRef.current?.click()} disabled={uploading}>
                  {uploading ? <Icon name="Loader2" size={14} className="mr-2 animate-spin" /> : <Icon name="Upload" size={14} className="mr-2" />}
                  Загрузить фото
                </Button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="mb-1.5 block">Название (рус)</Label>
                <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
              </div>
              <div>
                <Label className="mb-1.5 block">Название (eng)</Label>
                <Input value={form.nameEn} onChange={(e) => setForm((f) => ({ ...f, nameEn: e.target.value }))} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="mb-1.5 block">Категория</Label>
                <Select value={form.category} onValueChange={handleCategoryChange}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => <SelectItem key={c.ru} value={c.ru}>{c.ru}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-1.5 block">Сложность</Label>
                <Select value={form.difficulty} onValueChange={handleDifficultyChange}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {DIFFICULTIES.map((d) => <SelectItem key={d.ru} value={d.ru}>{d.ru}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="mb-1.5 block">Цена, ₽</Label>
              <Input type="number" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))} />
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

export default AdminCatalog;
