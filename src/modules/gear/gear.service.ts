import { prisma } from "../../lib/prisma";
import { IGearFilterRequest } from "./gear.interface";


const getAllGearFromDB = async (query: IGearFilterRequest) => {

  const {
  category,
  brand,
  price,
  available
  } = query;


  const gears = await prisma.gearItem.findMany({

where: {
  isActive: true,

  ...(available === "true" && {
    quantityAvailable: {
      gt: 0,
    },
  }),

  ...(brand && {
    brand: {
      contains: brand,
      mode: "insensitive",
    },
  }),

  ...(category && {
    category: {
      slug: category,
    },
  }),

...(price && {
  pricePerDay: {
    lte: Number(price),
  },
}),
},


    include: {

      category: {
        select: {
          id: true,
          name: true,
          slug: true
        }
      },


      provider: {
        select: {
          id: true,
          name: true
        }
      }

    },


    orderBy: {
      createdAt: "desc"
    }

  });


  return gears;
};


export const gearService = {
  getAllGearFromDB
};