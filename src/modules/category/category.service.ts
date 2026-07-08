import { prisma } from "../../lib/prisma";
import { ICreateCategory } from "./category.interface";

const getAllCategoriesFromDB = async () => {

  const categories = await prisma.category.findMany({
    orderBy:{
      createdAt:"desc"
    }
  });

  return categories;
};
const createCategoryIntoDB = async (
  payload: ICreateCategory
) => {

  const { name } = payload;

  const slug = name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");


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

const updateCategory = async () =>{}

const deleteCategory = async () =>{}





export const categoryService = {
    getAllCategoriesFromDB,
    createCategoryIntoDB,
    updateCategory,
    deleteCategory
}