"use server";

import { and, eq } from "drizzle-orm";
import { db } from "./db";
import { files_table, folders_table } from "./db/schema";
import { auth } from "@clerk/nextjs/server";

import { UTApi } from "uploadthing/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { QUERIES } from "./db/queries";
import { z } from "zod";

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

const createFolderSchema = z.object({
  name: z.string().min(1, { message: "Folder name is required" }).max(50, {
    message: "Folder name must be less than 50 characters",
  }),
  parentFolderId: z.bigint({ message: "Parent folder is required" }),
});

export async function createFolder(prevState: unknown, formData: FormData) {
  console.log("createFolder");
  const session = await auth();
  if (!session.userId) {
    return { error: { message: "Unauthorized" } };
  }
  console.log("Authorized");
  const validatedFields = createFolderSchema.safeParse({
    name: formData.get("name"),
    parentFolderId: formData.get("parentFolderId")
      ? BigInt(formData.get("parentFolderId") as string)
      : undefined,
  });
  console.log(formData);
  if (!validatedFields.success) {
    console.log(
      "Validation failed",
      validatedFields.error.flatten().fieldErrors,
    );
    return { error: validatedFields.error.flatten().fieldErrors };
  }
  console.log("Validated");
  const parentFolderId = Number(validatedFields.data.parentFolderId);
  const parentFolder = await QUERIES.getFolderById(parentFolderId);

  if (!parentFolder) {
    return { error: { message: "Parent folder not found" } };
  }
  console.log("Parent folder found");
  if (parentFolder.ownerId !== session.userId) {
    return { error: { message: "Unauthorized" } };
  }
  console.log("Parent folder owner matches");
  const folderName = validatedFields.data.name;

  console.log(folderName, parentFolderId);

  const newFolder = await db.insert(folders_table).values({
    name: folderName,
    parent: parentFolderId,
    ownerId: session.userId,
  });

  console.log(newFolder);

  const c = await cookies();
  c.set("force-refresh", JSON.stringify(Math.random()));

  return { success: true };
}

export async function signInRedirect() {
  const session = await auth();
  if (!session.userId) {
    return redirect("/sign-in");
  }
  return redirect("/drive");
}
