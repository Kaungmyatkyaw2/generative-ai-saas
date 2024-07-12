export const transformationObject = {
  dashboard: {
    label: 'Dashboard',
    key: 'dashboard',
    href: '/dashboard',
    textColor: 'text-sky-500',
    bgColor: 'bg-sky-500 hover:bg-sky-500',
    description: 'Restore your image with most advanced AI',
  },
  restore: {
    label: 'Image Restore',
    href: '/transformation/restore',
    textColor: 'text-violet-500',
    bgColor: 'bg-violet-500 hover:bg-violet-500',
    description: 'Restore your image with most advanced AI',
    config: { restore: true },
    key: 'restore',
  },
  fill: {
    label: 'Generative Fill',
    href: '/transformation/fill',
    textColor: 'text-pink-700',
    bgColor: 'bg-pink-700 hover:bg-pink-700',
    description: 'Restore your image with most advanced AI',
    config: { fillBackground: true },
    key: 'fill',
  },
  remove: {
    label: 'Remove Object',
    href: '/transformation/remove',
    textColor: 'text-orange-700',
    bgColor: 'bg-orange-700 hover:bg-orange-700',
    description: 'Restore your image with most advanced AI',
    config: {
      remove: { prompt: '', removeShadow: true, multiple: true },
    },
    key: 'remove',
  },
  recolor: {
    label: 'Object Recolor',
    href: '/transformation/recolor',
    textColor: 'text-emerald-500',
    bgColor: 'bg-emerald-500 hover:bg-emerald-500',
    description: 'Restore your image with most advanced AI',
    config: {
      recolor: { prompt: '', to: '', multiple: true },
    },
    key: 'recolor',
  },
  removeBackground: {
    label: 'Remove Background',
    href: '/transformation/removeBackground',
    textColor: 'text-green-700',
    bgColor: 'bg-green-700 hover:bg-green-700',
    description: 'Restore your image with most advanced AI',
    config: { removeBackground: true },
    key: 'removeBackground',
  },
};

const notTools = ['dashboard'];

export const tools = Object.keys(transformationObject)
  .filter((el) => !notTools.includes(el))
  .map((el) => transformationObject[el as TransformationTypeKey]);

export const navLinksArray = Object.keys(transformationObject).map(
  (el) => transformationObject[el as TransformationTypeKey]
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
