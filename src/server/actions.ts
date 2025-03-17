"use server";

import { and, eq } from "drizzle-orm";
import { db } from "./db";
import { files_table } from "./db/schema";
import { auth } from "@clerk/nextjs/server";

import { UTApi } from "uploadthing/server";
import { cookies } from "next/headers";

const utapi = new UTApi();

export async function deleteFile(fileId: number) {
  const session = await auth();
  if (!session.userId) {
    return { error: "Unauthorized" };
  }

  const [file] = await db
    .select()
    .from(files_table)
    .where(
      and(eq(files_table.id, fileId), eq(files_table.ownerId, session.userId)),
    );

  if (!file) {
    return { error: "File not found" };
  }
  const utapiResults = await utapi.deleteFiles(
    file.url.replace("https://5tqgntgon3.ufs.sh/f/", ""),
  );

  console.log(utapiResults);

  const dbDeleteResults = await db
    .delete(files_table)
    .where(eq(files_table.id, fileId));

  console.log(dbDeleteResults);

  const c = await cookies();
  c.set("force-refresh", JSON.stringify(Math.random()));

  return { success: true };
}
