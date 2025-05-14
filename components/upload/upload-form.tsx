"use client";

import { z } from "zod";
import { UploadFormInput } from "./upload-form-input";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { generatePdfSummary } from "@/actions/upload-actions";
import type { ourFileRouter } from '@/app/api/uploadthing/core';
import { ClientUploadedFileData } from "uploadthing/types";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid File" })
    .refine((file) => file.size <= 20 * 1024 * 1024, "File must be < 20MB")
    .refine((file) => file.type === "application/pdf", "File must be a PDF"),
});

const UploadForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      toast.success("Uploaded successfully!");
    },
    onUploadError: (err) => {
      console.error("Upload error", err);
      toast.error("Upload failed", {
        description: err.message,
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading((prev: boolean) => !prev);

    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    const validation = schema.safeParse({ file });
    if (!validation.success) {
      toast.error("Invalid file", {
        description:
          validation.error.flatten().fieldErrors.file?.[0] ?? "Invalid file",
      });
      return;
    }

    toast("Uploading PDF...", {
      description: "Please wait while we upload your file.",
    });

    const uploadResponse = await startUpload([file]);
    if (!uploadResponse) {
      toast.error("Upload failed", {
        description: "Please try again with a different file.",
      });
      return;
    }

    toast("Processing PDF...", {
      description: "Hang tight! We are analyzing your document.",
    });

    const result = await generatePdfSummary(
      uploadResponse as unknown as ClientUploadedFileData<typeof ourFileRouter>[]
    );

    const { success, data, message } = result;

    if (success && data) {
      toast.success("✨ Summary generated!", {
        description: "Your PDF has been successfully summarized and saved",
      });
      // You might want to do something with the data here, e.g., navigate or display it
    } else {
      toast.error(message ?? "Failed to generate summary");
    }

    setLoading(false);
  };

  return (
  <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
    <form ref={formRef} onSubmit={handleSubmit}>
      <UploadFormInput
        ref={formRef}
        onSubmit={handleSubmit} // <-- add this line
        isLoading={loading}
      />
    </form>
  </div>
);
}

export default UploadForm;
