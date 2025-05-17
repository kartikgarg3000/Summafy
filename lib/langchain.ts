<<<<<<< Updated upstream
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
=======
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
>>>>>>> Stashed changes

export async function fetchAndExtractPdfText(fileUrl: string) {
  const response = await fetch(fileUrl);
  const blob = await response.blob();
<<<<<<< Updated upstream
  const arrayBuffer = await blob.arrayBuffer();
  const loader = new PDFLoader(new Blob([arrayBuffer]));
  const docs = await loader.load();
  //combine all pages
  return docs.map((docs) => docs.pageContent).join('\n');
=======

  const arrayBuffer = await blob.arrayBuffer();

  const loader = new PDFLoader(new Blob([arrayBuffer]));

  const docs = await loader.load();

  //combine all pages
  return docs.map((doc) => doc.pageContent).join("\n");
>>>>>>> Stashed changes
}