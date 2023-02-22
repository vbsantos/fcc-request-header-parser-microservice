import express, { Express, Request, Response } from "express";

interface ApiResponseI {
  ipaddress: string | string[] | undefined;
  language: string | undefined;
  software: string | undefined;
}

const app: Express = express();

app.get("/whoami", (req: Request, res: Response) => {
  const response: ApiResponseI = {
    ipaddress: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
    language: req.headers["accept-language"],
    software: req.headers["user-agent"],
  };

  res.status(200).json(response);
});

app.use((err: Error, req: Request, res: Response) => {
  console.error({ error: err.message, stack: err.stack });
  res.status(500).json({ error: "Internal Server Error" });
});

if (!module.parent) {
  app.listen(3000);
}

export default app;
