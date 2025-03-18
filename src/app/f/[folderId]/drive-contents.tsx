"use client";
import { ChevronRight, FolderPlus } from "lucide-react";

import type { files_table, folders_table } from "~/server/db/schema";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { UploadButton } from "~/uploadthing";
import { useRouter } from "next/navigation";
import { FileRow, FolderRow } from "./file-row";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { createFolder } from "~/server/actions";
import { useActionState } from "react";

const initialState = {
  message: "",
  errors: {
    name: "",
    email: "",
  },
  success: false,
};

export default function DriveContents(props: {
  files: (typeof files_table.$inferSelect)[];
  folders: (typeof folders_table.$inferSelect)[];
  parents: (typeof folders_table.$inferSelect)[];
  currentFolderId: number;
}) {
  const navigate = useRouter();
  const [state, createFolderAction, pending] = useActionState(
    createFolder,
    initialState,
  );
  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link href={"/f/1"} className="mr-2 hover:text-white">
              My Drive
            </Link>
            {props.parents.map((folder, index) => (
              <div key={folder.id} className="flex items-center">
                <ChevronRight className="mx-2 text-gray-500" size={16} />
                <Link href={`/f/${folder.id}`} className="hover:text-white">
                  {folder.name}
                </Link>
              </div>
            ))}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="ml-4" variant="default">
                  <FolderPlus className="mr-2" size={16} />
                  Create Folder
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form action={createFolderAction} className="space-y-4">
                  <DialogHeader>
                    <DialogTitle>Create Folder</DialogTitle>
                    <DialogDescription>
                      Create a new folder to organize your files.
                    </DialogDescription>
                  </DialogHeader>
                  <>
                    <Input
                      type="text"
                      placeholder="Folder Name"
                      name="name"
                      autoComplete="off"
                    />
                    {state?.error &&
                      "name" in state.error &&
                      Array.isArray(state.error.name) &&
                      state.error.name.length > 0 && (
                        <p className="text-sm text-red-500">
                          {state.error.name[0]}
                        </p>
                      )}
                  </>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        name="parentFolderId"
                        value={props.currentFolderId}
                        type="submit"
                        disabled={pending}
                      >
                        Create
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
        <div className="rounded-lg bg-gray-800 shadow-xl">
          <div className="border-b border-gray-700 px-6 py-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
              <div className="col-span-6">Name</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-3">Size</div>
              <div className="col-span-1"></div>
            </div>
          </div>
          <ul>
            {props.folders.map((folder) => (
              <FolderRow key={folder.id} folder={folder} />
            ))}
            {props.files.map((file) => (
              <FileRow key={file.id} file={file} />
            ))}
          </ul>
        </div>
        <UploadButton
          endpoint="driveUploader"
          onClientUploadComplete={() => {
            navigate.refresh();
          }}
          input={{
            folderId: props.currentFolderId,
          }}
        />
      </div>
    </div>
  );
}
