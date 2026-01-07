
import { GoogleGenAI } from "@google/genai";

export const generateWallpaper = async (
  prompt: string,
  aspectRatio: "1:1" | "3:4" | "4:3" | "9:16" | "16:9" = "16:9"
): Promise<string> => {
  // Inisialisasi API
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("Kunci API tidak ditemukan.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio,
        },
      },
    });

    const candidates = response.candidates;
    if (candidates && candidates.length > 0) {
      const parts = candidates[0].content?.parts;
      const imagePart = parts?.find(p => p.inlineData);
      
      if (imagePart?.inlineData?.data) {
        return `data:image/png;base64,${imagePart.inlineData.data}`;
      }
    }
    
    throw new Error("Model tidak mengembalikan data gambar.");
  } catch (error: any) {
    console.error("Gemini Error Details:", error);
    if (error?.message?.includes('API_KEY_INVALID')) {
      throw new Error("API Key tidak valid.");
    }
    throw error;
  }
};
