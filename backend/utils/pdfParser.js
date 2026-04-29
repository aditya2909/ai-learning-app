import fs from "fs/promises";
import { PDFParse } from "pdf-parse";

/**
 * Extract text from PDF File
 * @param {string} filePath - Path to PDF file
 * @returns {Promise<{text: string, numPages: number}>}
 */
export const extractTextFromPdf = async (filePath) => {
  try {
    const dataBuffer = await fs.readFile(filePath);

    const parser = new PDFParse(new Uint8Array(dataBuffer));
    const data = await parser.getText();

    return {
      text: data.text,
      numPages: data.numPages,
      info: data.info,
    };
  } catch (error) {
    throw new Error("Failed to extract text from PDF");
    console.error("PDF parsing error", error);
  }
};
