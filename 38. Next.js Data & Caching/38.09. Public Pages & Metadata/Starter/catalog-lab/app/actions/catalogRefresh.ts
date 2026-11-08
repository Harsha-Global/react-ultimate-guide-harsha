'use server';
import { revalidateTag, revalidatePath } from 'next/cache';
import { catalogTag } from '@/lib/catalogCache';
import { hasLocalWriteAccess } from '@/lib/demoWriteAccess';
export async function markCatalogStale() {
 if (!await hasLocalWriteAccess()) throw new Error('Local sample writes are disabled');
 revalidateTag(catalogTag,'max');
}
export async function refreshWorkshopPath() {
 if (!await hasLocalWriteAccess()) throw new Error('Local sample writes are disabled');
 revalidatePath('/data-lab');
}
