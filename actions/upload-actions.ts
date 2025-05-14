"use server";

import { ourFileRouter } from "@/app/api/uploadthing/core";
// import { getDbConnection } from "@/lib/db";
import { generateSummaryFromGemini } from "@/lib/geminiai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { ClientUploadedFileData } from "uploadthing/types";

interface PdfSummaryType {
  userId: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

type StorePdfSummaryResponse = {
  success: boolean;
  message: string;
  data?: any;
};

export async function generatePdfSummary(
  uploadResponse: ClientUploadedFileData<typeof ourFileRouter>[]
): Promise<StorePdfSummaryResponse> {
  const fileInfo = uploadResponse?.[0];

  if (!fileInfo?.url) {
    return {
      success: false,
      message: "Invalid file data",
      data: null,
    };
  }

  const pdfUrl = fileInfo.url;

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);

    const summary = await generateSummaryFromGemini(pdfText);

    return {
      success: true,
      message: "Summary generated successfully",
      data: {
        summary,
        fileUrl: pdfUrl,
        title: pdfText.split("\n")[0]?.slice(0, 100) || "Untitled Document", // or some smarter title logic
        fileName: fileInfo.name,
      },
    };
  } catch (err) {
    console.error("Summary generation failed", err);
    return {
      success: false,
      message: "Failed to generate summary",
      data: null,
    };
  }
}

