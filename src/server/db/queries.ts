import "server-only";
import { and, eq, isNull } from "drizzle-orm";
import { db } from "~/server/db";
import {
  files_table as filesSchema,
  folders_table as foldersScehma,
} from "~/server/db/schema";

export const QUERIES = {
  getAllParentsForFolder: async function (folderId: number) {
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
  },

  getFiles: function (folderId: number) {
    return db
      .select()
      .from(filesSchema)
      .where(eq(filesSchema.parent, folderId))
      .orderBy(filesSchema.id);
  },

  getFolders: function (folderId: number) {
    return db
      .select()
      .from(foldersScehma)
      .where(eq(foldersScehma.parent, folderId))
      .orderBy(foldersScehma.id);
  },
  getFolderById: async function (folderId: number) {
    const folder = await db
      .select()
      .from(foldersScehma)
      .where(eq(foldersScehma.id, folderId));
    return folder[0];
  },
  getRootFolderForUser: async function (userId: string) {
    const folder = await db
      .select()
      .from(foldersScehma)
      .where(
        and(eq(foldersScehma.ownerId, userId), isNull(foldersScehma.parent)),
      );
    return folder[0];
  },
};

export const MUTATIONS = {
  createFile: async function (input: {
    file: {
      name: string;
      size: number;
      url: string;
      parent: number;
    };
    userId: string;
  }) {
    return await db
      .insert(filesSchema)
      .values({ ...input.file, ownerId: input.userId });
  },
};
