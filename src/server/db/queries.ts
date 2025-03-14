import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import {
  files_table as filesSchema,
  folders_table as foldersScehma,
} from "~/server/db/schema";

export async function getAllParentsForFolder(folderId: number) {
  const parents = [];
  let currentId: number | null = folderId;
  while (currentId !== null) {
    const folder = await db
      .selectDistinct()
      .from(foldersScehma)
      .where(eq(foldersScehma.id, currentId));
    if (!folder[0]) {
      throw new Error("Parent not found");
    }
    parents.unshift(folder[0]);
    currentId = folder[0]?.parent;
  }
  return parents;
}

export function getFiles(folderId: number) {
  return db.select().from(filesSchema).where(eq(filesSchema.parent, folderId));
}

export function getFolders(folderId: number) {
  return db
    .select()
    .from(foldersScehma)
    .where(eq(foldersScehma.parent, folderId));
}
