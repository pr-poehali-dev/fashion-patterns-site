export const CATALOG_URL = 'https://functions.poehali.dev/99ef9f09-374e-48f9-8fee-d74de49eb992';
export const CONTENT_URL = 'https://functions.poehali.dev/fe8ff449-38af-405e-93aa-dc7841dfd63d';
export const UPLOAD_IMAGE_URL = 'https://functions.poehali.dev/02292f2b-6efb-4467-9164-3ab7817e1b8b';

export const ADMIN_SESSION_KEY = 'mvs_admin_session';

export const adminHeaders = (): Record<string, string> => {
  const sid = localStorage.getItem(ADMIN_SESSION_KEY);
  return {
    'Content-Type': 'application/json',
    ...(sid ? { 'X-Admin-Session': sid } : {}),
  };
};

export interface Pattern {
  id: number;
  name: string;
  nameEn: string;
  category: string;
  categoryEn: string;
  price: number;
  difficulty: string;
  difficultyEn: string;
  image?: string;
  sortOrder: number;
}

export interface Review {
  id: number;
  name: string;
  stars: number;
  textRu: string;
  textEn: string;
  sortOrder: number;
}

export interface BlogPost {
  id: number;
  title: string;
  titleEn: string;
  tag: string;
  tagEn: string;
  date: string;
  sortOrder: number;
}

export interface SiteText {
  key: string;
  valueRu: string | null;
  valueEn: string | null;
}

export const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export const uploadImage = async (file: File): Promise<string> => {
  const base64 = await fileToBase64(file);
  const res = await fetch(UPLOAD_IMAGE_URL, {
    method: 'POST',
    headers: adminHeaders(),
    body: JSON.stringify({ image: base64, contentType: file.type }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Upload failed');
  return data.url;
};
