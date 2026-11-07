import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { StoredDocumentMeta, StoredDocumentPayload } from '../types/document';

interface GrantlyDB extends DBSchema {
  documents: {
    key: string;
    value: StoredDocumentPayload;
  };
}

const DB_NAME = 'grantly-doc-vault';
const DB_VERSION = 1;
const STORE_NAME = 'documents';

let dbPromise: Promise<IDBPDatabase<GrantlyDB>> | null = null;

function getDb(): Promise<IDBPDatabase<GrantlyDB>> {
  if (!dbPromise) {
    dbPromise = openDB<GrantlyDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      },
    });
  }
  return dbPromise;
}

export async function saveDocumentFile(doc: StoredDocumentPayload): Promise<void> {
  const db = await getDb();
  await db.put(STORE_NAME, doc);
}

export async function getDocumentFile(id: string): Promise<StoredDocumentPayload | undefined> {
  const db = await getDb();
  return await db.get(STORE_NAME, id);
}

export async function getAllDocumentMetas(): Promise<StoredDocumentMeta[]> {
  const db = await getDb();
  const allDocs = await db.getAll(STORE_NAME);
  return allDocs.map(({ id, name, category, size, mimeType, uploadedAt, linkedApplicationIds, notes }) => ({
    id,
    name,
    category,
    size,
    mimeType,
    uploadedAt,
    linkedApplicationIds: linkedApplicationIds || [],
    notes,
  }));
}

export async function deleteDocumentFile(id: string): Promise<void> {
  const db = await getDb();
  await db.delete(STORE_NAME, id);
}

export async function renameDocumentFile(id: string, newName: string): Promise<void> {
  const db = await getDb();
  const doc = await db.get(STORE_NAME, id);
  if (doc) {
    doc.name = newName;
    await db.put(STORE_NAME, doc);
  }
}

export async function clearAllDocuments(): Promise<void> {
  const db = await getDb();
  await db.clear(STORE_NAME);
}
