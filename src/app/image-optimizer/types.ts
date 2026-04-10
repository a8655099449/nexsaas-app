export type ExportFormat = 'webp' | 'png' | 'jpeg';

export interface OptimizerSettings {
  format: ExportFormat;
  quality: number;
  renameMode: 'original' | 'pinyin';
  prefix: string;
  isMarkerMode: boolean;
  targetSize: number;
}

export interface ImageFile {
  id: string;
  name: string;
  file: File;
  originalSize: number;
  originalDimensions: { width: number; height: number };
  status: 'pending' | 'processing' | 'done' | 'error';
  
  outputBlob?: Blob;
  outputSize?: number;
  outputDimensions?: { width: number; height: number };
  newName?: string;
  previewUrl?: string;
  error?: string;
}
