import {
  Image,
  LayoutDashboard,
  Paintbrush,
  ScanLine,
  ScanText,
  Settings,
  Sparkles,
} from 'lucide-react';

export const trasnformationsObject = {
  dashboard: {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    textColor: 'text-sky-500',
    bgColor: 'text-sky-500/10',
    description: 'Restore your image with most advanced AI',
  },
  'image-restore': {
    label: 'Image Restore',
    icon: Image,
    href: '/transformation/image-restore',
    textColor: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
    description: 'Restore your image with most advanced AI',
  },
  'generative-fill': {
    label: 'Generative Fill',
    icon: Sparkles,
    href: '/transformation/generative-fill',
    textColor: 'text-pink-700',
    bgColor: 'bg-pink-700/10',
    description: 'Restore your image with most advanced AI',
  },
  'remove-obj': {
    label: 'Remove Object',
    icon: ScanLine,
    href: '/transformation/remove-obj',
    textColor: 'text-orange-700',
    bgColor: 'bg-orange-700/10',
    description: 'Restore your image with most advanced AI',
  },
  recolor: {
    label: 'Object Recolor',
    icon: Paintbrush,
    href: '/transformation/recolor',
    textColor: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    description: 'Restore your image with most advanced AI',
  },
  'remove-bg': {
    label: 'Remove Background',
    icon: ScanText,
    href: '/transformation/remove-bg',
    textColor: 'text-green-700',
    bgColor: 'bg-green-700/10',
    description: 'Restore your image with most advanced AI',
  },
  settings: {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
    textColor: '',
    bgColor: 'bg-black/10',
    description: 'Restore your image with most advanced AI',
  },
};

export type TransformationObjectKeys = keyof typeof trasnformationsObject;

const notTools = ['dashboard', 'settings'];

export const tools = Object.keys(trasnformationsObject)
  .filter((el) => !notTools.includes(el))
  .map((el) => trasnformationsObject[el as TransformationObjectKeys]);

export const navLinksArray = Object.keys(trasnformationsObject).map(
  (el) => trasnformationsObject[el as TransformationObjectKeys]
);

export const plans = [
  {
    _id: 1,
    name: 'Free',
    icon: '/assets/icons/free-plan.svg',
    price: 0,
    credits: 20,
    inclusions: [
      {
        label: '20 Free Credits',
        isIncluded: true,
      },
      {
        label: 'Basic Access to Services',
        isIncluded: true,
      },
      {
        label: 'Priority Customer Support',
        isIncluded: false,
      },
      {
        label: 'Priority Updates',
        isIncluded: false,
      },
    ],
  },
  {
    _id: 2,
    name: 'Pro Package',
    icon: '/assets/icons/free-plan.svg',
    price: 40,
    credits: 120,
    inclusions: [
      {
        label: '120 Credits',
        isIncluded: true,
      },
      {
        label: 'Full Access to Services',
        isIncluded: true,
      },
      {
        label: 'Priority Customer Support',
        isIncluded: true,
      },
      {
        label: 'Priority Updates',
        isIncluded: false,
      },
    ],
  },
  {
    _id: 3,
    name: 'Premium Package',
    icon: '/assets/icons/free-plan.svg',
    price: 199,
    credits: 2000,
    inclusions: [
      {
        label: '2000 Credits',
        isIncluded: true,
      },
      {
        label: 'Full Access to Services',
        isIncluded: true,
      },
      {
        label: 'Priority Customer Support',
        isIncluded: true,
      },
      {
        label: 'Priority Updates',
        isIncluded: true,
      },
    ],
  },
];

export const transformationTypes = {
  restore: {
    type: 'restore',
    title: 'Restore Image',
    subTitle: 'Refine images by removing noise and imperfections',
    config: { restore: true },
    icon: 'image.svg',
  },
  removeBackground: {
    type: 'removeBackground',
    title: 'Background Remove',
    subTitle: 'Removes the background of the image using AI',
    config: { removeBackground: true },
    icon: 'camera.svg',
  },
  fill: {
    type: 'fill',
    title: 'Generative Fill',
    subTitle: "Enhance an image's dimensions using AI outpainting",
    config: { fillBackground: true },
    icon: 'stars.svg',
  },
  remove: {
    type: 'remove',
    title: 'Object Remove',
    subTitle: 'Identify and eliminate objects from images',
    config: {
      remove: { prompt: '', removeShadow: true, multiple: true },
    },
    icon: 'scan.svg',
  },
  recolor: {
    type: 'recolor',
    title: 'Object Recolor',
    subTitle: 'Identify and recolor objects from the image',
    config: {
      recolor: { prompt: '', to: '', multiple: true },
    },
    icon: 'filter.svg',
  },
};

export const aspectRatioOptions = {
  '1:1': {
    aspectRatio: '1:1',
    label: 'Square (1:1)',
    width: 1000,
    height: 1000,
  },
  '3:4': {
    aspectRatio: '3:4',
    label: 'Standard Portrait (3:4)',
    width: 1000,
    height: 1334,
  },
  '9:16': {
    aspectRatio: '9:16',
    label: 'Phone Portrait (9:16)',
    width: 1000,
    height: 1778,
  },
};

export const defaultValues = {
  title: '',
  aspectRatio: '',
  color: '',
  prompt: '',
  publicId: '',
};

export const creditFee = -1;
