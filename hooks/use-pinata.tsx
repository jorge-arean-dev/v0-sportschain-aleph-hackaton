"use client";

import { useState, useCallback } from "react";

interface PinataResponse {
  data?: string;
  error?: string;
  loading: boolean;
}

interface UsePinataReturn {
  uploadFile: (file: File) => Promise<string | null>;
  uploadJson: (jsonData: object) => Promise<string | null>;
  readData: (cid: string) => Promise<string | null>;
  fileUpload: PinataResponse;
  jsonUpload: PinataResponse;
  dataRead: PinataResponse;
}

export function usePinata(): UsePinataReturn {
  const [fileUpload, setFileUpload] = useState<PinataResponse>({
    loading: false,
  });
  
  const [jsonUpload, setJsonUpload] = useState<PinataResponse>({
    loading: false,
  });
  
  const [dataRead, setDataRead] = useState<PinataResponse>({
    loading: false,
  });

  const uploadFile = useCallback(async (file: File): Promise<string | null> => {
    setFileUpload({ loading: true });
    
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      const response = await fetch("/api/pinata/files", {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const ipfsHash = await response.json();
      
      setFileUpload({
        data: ipfsHash,
        loading: false,
      });
      
      return ipfsHash;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Upload failed";
      setFileUpload({
        error: errorMessage,
        loading: false,
      });
      console.error("File upload error:", error);
      return null;
    }
  }, []);

  const uploadJson = useCallback(async (jsonData: object): Promise<string | null> => {
    setJsonUpload({ loading: true });
    
    try {
      const formData = new FormData();
      formData.append("jsonData", JSON.stringify(jsonData));
      
      const response = await fetch("/api/pinata/json", {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const ipfsHash = await response.json();
      
      setJsonUpload({
        data: ipfsHash,
        loading: false,
      });
      
      return ipfsHash;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "JSON upload failed";
      setJsonUpload({
        error: errorMessage,
        loading: false,
      });
      console.error("JSON upload error:", error);
      return null;
    }
  }, []);

  const readData = useCallback(async (cid: string): Promise<string | null> => {
    setDataRead({ loading: true });
    
    try {
      const response = await fetch(`/api/pinata/read?cid=${encodeURIComponent(cid)}`, {
        method: "GET",
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const url = await response.json();
      
      setDataRead({
        data: url,
        loading: false,
      });
      
      return url;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Read failed";
      setDataRead({
        error: errorMessage,
        loading: false,
      });
      console.error("Data read error:", error);
      return null;
    }
  }, []);

  return {
    uploadFile,
    uploadJson,
    readData,
    fileUpload,
    jsonUpload,
    dataRead,
  };
}

// Additional utility hooks for specific use cases
export function usePinataFileUpload() {
  const { uploadFile, fileUpload } = usePinata();
  return { uploadFile, ...fileUpload };
}

export function usePinataJsonUpload() {
  const { uploadJson, jsonUpload } = usePinata();
  return { uploadJson, ...jsonUpload };
}

export function usePinataDataRead() {
  const { readData, dataRead } = usePinata();
  return { readData, ...dataRead };
}
