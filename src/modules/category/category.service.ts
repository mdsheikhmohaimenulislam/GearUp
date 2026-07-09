import { prisma } from "../../lib/prisma";
import { ICreateCategory, IUpdateCategory } from "./category.interface";
import httpStatus from "http-status";

const getAllCategoriesFromDB = async () => {
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return categories;
};
const createCategoryIntoDB = async (payload: ICreateCategory) => {
  const { name } = payload;

  const slug = name.toLowerCase().trim().replace(/\s+/g, "-");

  const existingCategory = await prisma.category.findFirst({
    where: {
      OR: [
        {
          name,
        },
        {
          slug,
        },
      ],
    },
  });

  if (existingCategory) {
    throw new Error("Category already exists");
  }

  const category = await prisma.category.create({
    data: {
      name,
      slug,
    },
  });

  return category;
};

const updateCategoryIntoDB = async (id: string, payload: IUpdateCategory) => {
  console.log(payload);
  // Category exists check
  const isCategoryExists = await prisma.category.findUnique({
    where: { id },
  });

  if (!isCategoryExists) {
    throw new Error("Category not found");
  }

  // Duplicate name check
  if (payload.name) {
    const isNameExists = await prisma.category.findFirst({
      where: {
        name: payload.name,
        NOT: {
          id,
        },
      },
    });

    if (isNameExists) {
      throw new Error("Category already exists");
    }
  }

  // Update
  const result = await prisma.category.update({
    where: { id },
    data: payload,
  });

  return result;
};

const deleteCategoryFromDB = async (id: string) => {
  const isCategoryExists = await prisma.category.findUnique({
    where: { id },
  });

  if (!isCategoryExists) {
    throw new Error("Category not found");
  }

  await prisma.category.delete({
    where: { id },
  });

  return null;
};

export const categoryService = {
  getAllCategoriesFromDB,
  createCategoryIntoDB,
  updateCategoryIntoDB,
  deleteCategoryFromDB,
};
