import "dotenv/config";
import app from "./app";
import { prisma } from "./lib/prisma";
import config from "./config";

const port = config.port;

async function main() {
  try {
    // await prisma.$connect();
    console.log("Connect to the database successfully!..");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log("Error starting the server: ", error);
    // await prisma.$disconnect();
    process.exit(1);
  }
}

main();
// ..............