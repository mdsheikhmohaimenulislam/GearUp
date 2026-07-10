export default async function handler(req: any, res: any) {
  try {
    // Prefer compiled output in production deployments (dist), fallback to source during local dev
    try {
      const { default: app } = await import("../dist/src/app.js");
      return app(req, res);
    } catch (err) {
      const { default: app } = await import("../src/app");
      return app(req, res);
    }
  } catch (err: any) {
    console.error("Serverless handler initialization error:", err);
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain");
    res.end("Server initialization error");
  }
}
