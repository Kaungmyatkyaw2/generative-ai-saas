'use server';

import User from '../database/models/user.model';
import { connectToDatabase } from '../database/mongoose';
import { catchAsync, deepCloneObject } from '../utils';

export const createUser = catchAsync(async (user: CreateUserBody) => {
  await connectToDatabase();
  const newUser = await User.create(user);
  return deepCloneObject(newUser);
});

export const getUserById = catchAsync(async (userId: string) => {
  await connectToDatabase();
  const user = await User.findOne({ clerkId: userId });

  if (!user) {
    throw new Error("User isn't exist!");
  }

  return deepCloneObject(user);
});

export const updateUser = catchAsync(
  async (userId: string, user: UpdateUserBody) => {
    await connectToDatabase();
    const updatedUser = await User.findOneAndUpdate({ clerkId: userId }, user, {
      new: true,
    });

    if (!updatedUser) {
      throw new Error('User update failed!');
    }

    return deepCloneObject(updatedUser);
  }
);

export const deleteUser = catchAsync(async (userId: string) => {
  await connectToDatabase();
  const user = await User.findOne({ clerkId: userId });

  if (!user) {
    throw new Error("User isn't exist!");
  }

  const deletedUser = await User.findByIdAndDelete(user._id);

  return deletedUser ? deepCloneObject(deletedUser) : null;
});

export const updateCredit = catchAsync(
  async (userId: string, creditFee: number) => {
    await connectToDatabase();
    const updatedCredit = await User.findByIdAndUpdate(
      userId,
      {
        $inc: { creditBalance: creditFee },
      },
      {
        new: true,
      }
    );

    if (!updatedCredit) {
      throw new Error('User credits update failed!');
    }

    return deepCloneObject(updatedCredit);
  }
);
