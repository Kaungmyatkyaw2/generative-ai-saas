/* eslint-disable prefer-const */
/* eslint-disable no-prototype-builtins */
import { type ClassValue, clsx } from 'clsx';
import qs from 'qs';
import { twMerge } from 'tailwind-merge';

import { aspectRatioOptions } from '@/constants';
import {
  Image,
  LayoutDashboard,
  LucideIcon,
  Paintbrush,
  ScanLine,
  ScanText,
  Sparkles,
} from 'lucide-react';

export const getIcon = (key: string) => {
  const icons: { [key: string]: LucideIcon } = {
    fill: Sparkles,
    recolor: Paintbrush,
    removeBackground: ScanText,
    remove: ScanLine,
    restore: Image,
    dashboard: LayoutDashboard,
  };

  return icons[key];
};

export const deepCloneObject = (obj: Object) => {
  return JSON.parse(JSON.stringify(obj));
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const catchAsync = <T extends (...args: any[]) => Promise<any>>(
  fn: T
) => {
  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    try {
      return await fn(...args);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message, error.stack);
        throw new Error(`Error: ${error.message}`);
      } else if (typeof error === 'string') {
        console.error(error);
        throw new Error(`Error: ${error}`);
      } else {
        console.error(error);
        throw new Error(`Unknown error: ${JSON.stringify(error)}`);
      }
    }
  };
};

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#7986AC" offset="20%" />
      <stop stop-color="#68769e" offset="50%" />
      <stop stop-color="#7986AC" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#7986AC" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

export const dataUrl = `data:Image/svg+xml;base64,${toBase64(
  shimmer(1000, 1000)
)}`;

// FORM URL QUERY
export const formUrlQuery = ({
  searchParams,
  key,
  value,
}: FormUrlQueryParams) => {
  const params = { ...qs.parse(searchParams.toString()), [key]: value };

  return `${window.location.pathname}?${qs.stringify(params, {
    skipNulls: true,
  })}`;
};

// REMOVE KEY FROM QUERY
export function removeKeysFromQuery({
  searchParams,
  keysToRemove,
}: RemoveUrlQueryParams) {
  const currentUrl = qs.parse(searchParams);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  // Remove null or undefined values
  Object.keys(currentUrl).forEach(
    (key) => currentUrl[key] == null && delete currentUrl[key]
  );

  return `${window.location.pathname}?${qs.stringify(currentUrl)}`;
}

export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout | null;
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

// GE Image SIZE
export type AspectRatioKey = keyof typeof aspectRatioOptions;
export const getImageSize = (
  type: string,
  Image: any,
  dimension: 'width' | 'height'
): number => {
  if (type === 'fill') {
    return (
      aspectRatioOptions[Image.aspectRatio as AspectRatioKey]?.[dimension] ||
      1000
    );
  }
  return Image?.[dimension] || 1000;
};

// DOWNLOAD Image
export const download = (url: string, filename: string) => {
  if (!url) {
    throw new Error('Resource URL not provided! You need to provide one');
  }

  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const blobURL = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobURL;

      if (filename && filename.length)
        a.download = `${filename.replace(' ', '_')}.png`;
      document.body.appendChild(a);
      a.click();
    })
    .catch((error) => console.log({ error }));
};

// DEEP MERGE OBJECTS
export const deepMergeObjects = (obj1: any, obj2: any) => {
  if (obj2 === null || obj2 === undefined) {
    return obj1;
  }

  let output = { ...obj2 };

  for (let key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      if (
        obj1[key] &&
        typeof obj1[key] === 'object' &&
        obj2[key] &&
        typeof obj2[key] === 'object'
      ) {
        output[key] = deepMergeObjects(obj1[key], obj2[key]);
      } else {
        output[key] = obj1[key];
      }
    }
  }

  return output;
};
