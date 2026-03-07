import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Translates English text to Marathi using the MyMemory Translation API.
 * This is a free API with a daily limit per IP.
 */
export async function translateToMarathi(text: string): Promise<string> {
  if (!text || text.trim() === "" || /[^\x00-\x7F]/.test(text)) return text; // Skip if already looks non-English or empty

  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|mr`
    );
    const data = await response.json();
    
    if (data.responseData && data.responseData.translatedText) {
      return data.responseData.translatedText;
    }
    return text;
  } catch (error) {
    console.error("Translation error:", error);
    return text;
  }
}

/**
 * Deeply translates all string values in an object to Marathi.
 */
export async function translateObjectToMarathi(obj: any): Promise<any> {
  if (typeof obj === 'string') {
    return await translateToMarathi(obj);
  }
  
  if (Array.isArray(obj)) {
    return await Promise.all(obj.map(item => translateObjectToMarathi(item)));
  }
  
  if (obj !== null && typeof obj === 'object') {
    const translated: any = {};
    for (const key in obj) {
      // Skip boolean, number, and specific technical keys
      if (key === 'id' || key === 'icon' || key === 'isActive' || key === 'marathi' || key === 'backgroundImage' || key === 'mapEmbed') {
        translated[key] = obj[key];
      } else {
        translated[key] = await translateObjectToMarathi(obj[key]);
      }
    }
    return translated;
  }
  
  return obj;
}
