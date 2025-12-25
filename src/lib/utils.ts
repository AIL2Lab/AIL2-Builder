import { TOKEN_KEY } from "@/config/storage.config";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export function getOrigin(): string {
    if (typeof window !== 'undefined') {
        return window.location.origin;
    }
    return process.env.NEXT_PUBLIC_APP_ORIGIN as string
}


export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

export const setToken = (token:string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

export const clearToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
  }
};

export const shortenAddress = (address: string) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

/** 
 * 兼容性复制到剪贴板 
 * @param text 要复制的文本 
 * @returns Promise<boolean> 是否成功 
 */ 
export async function copyToClipboard(text: string): Promise<boolean> { 
  if (navigator.clipboard && window.isSecureContext) { 
    try { 
      await navigator.clipboard.writeText(text); 
      return true; 
    } catch (e) { 
      // 失败则降级 
    } 
  } 
  try { 
    const textarea = document.createElement('textarea'); 
    textarea.value = text; 
    textarea.style.position = 'fixed'; 
    textarea.style.top = '0'; 
    textarea.style.left = '0'; 
    textarea.style.width = '2em'; 
    textarea.style.height = '2em'; 
    textarea.style.padding = '0'; 
    textarea.style.border = 'none'; 
    textarea.style.outline = 'none'; 
    textarea.style.boxShadow = 'none'; 
    textarea.style.background = 'transparent'; 
    document.body.appendChild(textarea); 
    textarea.focus(); 
    textarea.select(); 
    const successful = document.execCommand('copy'); 
    document.body.removeChild(textarea); 
    return successful; 
  } catch (e) { 
    return false; 
  } 
}