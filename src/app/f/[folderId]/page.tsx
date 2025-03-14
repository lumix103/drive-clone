import { eq } from "drizzle-orm";
import DriveContents from "~/app/drive-contents";
import { db } from "~/server/db";
import {
  files as filesSchema,
  folders as foldersScehma,
} from "~/server/db/schema";

export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;

  const parsedFolderId = parseInt(params.folderId);

  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder ID</div>;
  }

  const files = await db
    .select()
    .from(filesSchema)
    .where(eq(filesSchema.parent, parsedFolderId));
  const folders = await db
    .select()
    .from(foldersScehma)
    .where(eq(foldersScehma.parent, parsedFolderId));
  return <DriveContents files={files} folders={folders} />;
}
