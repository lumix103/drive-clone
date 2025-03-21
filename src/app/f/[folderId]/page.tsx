import { QUERIES } from "~/server/db/queries";
import DriveContents from "./drive-contents";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;

  const parsedFolderId = parseInt(params.folderId);

  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder ID</div>;
  }

  const session = await auth();

  if (!session.userId) {
    return redirect("/sign-in");
  }

  const parentFolder = await QUERIES.getFolderById(parsedFolderId);

  if (!parentFolder) {
    return <div>Invalid folder ID</div>;
  }

  if (parentFolder.ownerId !== session.userId) {
    return <div>Unauthorized</div>;
  }

  const [folders, files, parents] = await Promise.all([
    QUERIES.getFolders(parsedFolderId),
    QUERIES.getFiles(parsedFolderId),
    QUERIES.getAllParentsForFolder(parsedFolderId),
  ]);

  return (
    <DriveContents
      files={files}
      folders={folders}
      parents={parents}
      currentFolderId={parsedFolderId}
    />
  );
}
