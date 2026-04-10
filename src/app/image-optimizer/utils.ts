import { pinyin } from 'pinyin-pro';
import { ExportFormat, ImageFile, OptimizerSettings } from './types';

export const getPinyinShorthand = (name: string): string => {
  const baseName = name.split('.')[0];
  const shorthand = pinyin(baseName, {
    pattern: 'first',
    toneType: 'none',
    type: 'array',
  }).join('');
  return shorthand.toLowerCase();
};

export const generateNewName = (
  originalName: string,
  settings: OptimizerSettings
): string => {
  let name = originalName.split('.')[0];
  if (settings.renameMode === 'pinyin') {
    name = getPinyinShorthand(name);
  }
  const prefix = settings.prefix ? `${settings.prefix}-` : '';
  const extension = settings.format === 'webp' ? 'webp' : settings.format === 'jpeg' ? 'jpg' : 'png';
  return `${prefix}${name}.${extension}`;
};

export const processImage = async (
  imageFile: ImageFile,
  settings: OptimizerSettings
): Promise<Partial<ImageFile>> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(imageFile.file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      const { width, height } = img;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas context failed'));

      let finalW = width;
      let finalH = height;

      if (settings.isMarkerMode) {
        const size = settings.targetSize || Math.max(width, height);
        canvas.width = size;
        canvas.height = size;
        ctx.clearRect(0, 0, size, size);
        const ratio = Math.min(size / width, size / height);
        finalW = width * ratio;
        finalH = height * ratio;
        ctx.drawImage(img, (size - finalW) / 2, (size - finalH) / 2, finalW, finalH);
      } else {
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0);
      }

      canvas.toBlob((blob) => {
        if (!blob) return reject(new Error('Blob failed'));
        resolve({
          outputBlob: blob,
          outputSize: blob.size,
          outputDimensions: { width: canvas.width, height: canvas.height },
          previewUrl: URL.createObjectURL(blob),
        });
      }, `image/${settings.format}`, settings.quality / 100);
    };
    img.onerror = () => reject(new Error('Image load failed'));
    img.src = url;
  });
};

export const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.width, height: img.height });
    };
    img.src = url;
  });
};
