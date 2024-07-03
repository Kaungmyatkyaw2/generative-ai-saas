'use server';

import User from '../database/models/user.model';
import { connectToDatabase } from '../database/mongoose';
import { catchAsync } from '../utils';

export const createUser = catchAsync(async (user: CreateUserBody) => {
  await connectToDatabase();
  const newUser = await User.create(user);
  return newUser;
});

export const getUserById = catchAsync(async (userId: string) => {
  await connectToDatabase();
  const user = await User.findOne({ clerkId: userId });

  if (!user) {
    throw new Error("User isn't exist!");
  }

  return user;
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

    return updatedUser;
  }
);

export const deleteUser = catchAsync(async (userId: string) => {
  await connectToDatabase();
  const user = await User.findOne({ clerkId: userId });

  if (!user) {
    throw new Error("User isn't exist!");
  }

  const deletedUser = await User.findByIdAndDelete(user._id);

  return deletedUser ? deletedUser : null;
});
