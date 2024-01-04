"use server";

import { prisma } from "@/prisma/client";
import { User } from "@prisma/client";
import { handleError } from "../utils";

interface CreateUserParams {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
}

// Create user
export const createUser = async (userData: CreateUserParams): Promise<User> => {
  const { clerkId, name, username, email, picture } = userData;

  try {
    const user = await prisma.user.create({
      data: {
        clerkId,
        name,
        username,
        email,
        picture,
        role: "USER",
      },
    });

    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating user");
  }
};

// Update User
interface UpdateUserParams {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
}

export const updateUser = async (userData: UpdateUserParams): Promise<User> => {
  const { clerkId, name, username, email, picture } = userData;

  try {
    const user = await prisma.user.update({
      where: { clerkId },
      data: {
        name,
        username,
        email,
        picture,
      },
    });

    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Error updating user");
  }
};

// Update User Cover Image
interface UpdateUserCoverImgParams {
  userId: string;
  coverImg: string;
}

export const updateUserCoverImg = async ({ userId, coverImg }: UpdateUserCoverImgParams): Promise<User> => {
  try {
    const user = await prisma.user.update({
      where: { clerkId: userId },
      data: {
        coverImg,
      },
    });

    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Error updating user cover image");
  }
};

// Update User Profile Image
interface UpdateUserProfileImgParams {
  userId: string;
  profileImg: string | null;
}

export const updateUserProfileImg = async ({ userId, profileImg }: UpdateUserProfileImgParams): Promise<User> => {
  try {
    const user = await prisma.user.update({
      where: { clerkId: userId },
      data: {
        picture: profileImg || "",
      },
    });

    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Error updating user profile image");
  }
};

// Delete User

export const deleteUser = async (clerkId: string): Promise<User> => {
  try {
    const user = await prisma.user.delete({
      where: { clerkId },
    });

    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting user");
  }
};

// Get user by Id
export const getUserById = async (id: number): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      console.error(`User not found for id: ${id}`);
      return null;
    }

    return user;
  } catch (error) {
    handleError(error, "Error getting user by id", id);
    return null;
  }
};

// Get all users
export const getAllUsers = async (): Promise<User[]> => {
  try {
    const users = await prisma.user.findMany();

    return users;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting all users");
  }
};
