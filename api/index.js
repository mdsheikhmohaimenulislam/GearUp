export default async function handler(req, res) {
  try {
    // Prefer compiled output in production (dist), fallback to source during local dev
    const { default: app } = await import("../dist/src/app.js");
    return app(req, res);
  } catch (err) {
    console.error("Serverless handler initialization error:", err);
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain");
    res.end("Server initialization error");
  }
}
