'use server';

import { revalidatePath } from 'next/cache';
import { catchAsync, deepCloneObject } from '../utils';
import { connectToDatabase } from '../database/mongoose';
import User from '../database/models/user.model';
import Image from '../database/models/image.model';

export const createImage = catchAsync(
  async ({ path, image, userId }: AddImageParams) => {
    await connectToDatabase();

    const author = await User.findById(userId);

    if (!author) {
      throw new Error('User not found!');
    }

    const createdImage = await Image.create({
      ...image,
      author: author._id,
    });

    revalidatePath(path);

    return deepCloneObject(createdImage);
  }
);

export const updateImage = catchAsync(
  async ({ path, image, userId }: UpdateImageParams) => {
    await connectToDatabase();

    const imageToUpdate = await Image.findById(image._id);

    if (!imageToUpdate) {
      throw new Error('Image not found!');
    }
    if (imageToUpdate.author?._id != userId) {
      throw new Error('Unauthorized!');
    }

    const updatedImage = await Image.findByIdAndUpdate(
      imageToUpdate._id,
      {
        ...image,
      },
      {
        new: true,
      }
    );

    revalidatePath(path);

    return deepCloneObject(updatedImage!);
  }
);

export const deleteImage = catchAsync(async (imageId: string) => {
  await connectToDatabase();
  await Image.findByIdAndDelete(imageId);
});

export const getImageById = catchAsync(async (imageId: string) => {
  await connectToDatabase();
  const image = await Image.findById(imageId).populate({
    path: 'author',
    model: User,
    select: '_id firstName lastName clerkId',
  });

  if (!image) {
    throw new Error('Image not found!');
  }

  return deepCloneObject(image);
});

export const getMyImages = catchAsync(
  async ({
    limit = 10,
    page = 1,
    search = '',
    userId,
  }: {
    limit?: number;
    page?: number;
    search?: string;
    userId: string;
  }) => {
    const titleReg = new RegExp(search, 'i');
    const filterQueryObj = {
      title: titleReg,
      author: userId,
    };
    const skipAmount = (page - 1) * limit;

    const totalImageCount = await Image.countDocuments(filterQueryObj);
    const pageCount = Math.ceil(totalImageCount / limit);

    const images = await Image.find(filterQueryObj)
      .populate({
        path: 'author',
        model: User,
        select: '_id firstName lastName clerkId',
      })
      .limit(limit)
      .skip(skipAmount);

    return deepCloneObject({
      data: images,
      pageCount,
      totalCount: totalImageCount,
    });
  }
);
