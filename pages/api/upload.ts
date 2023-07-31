import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import multer from "multer";
import { Request, Response } from "express";

const router = createRouter<Request, Response>();

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

router.post((req, res) => {
  upload.array("files")(req, res, (err) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    return res.status(200).json({
      success: true,
    });
  });
});

router.all((req, res) => {
  res.status(405).json({
    error: "Method not allowed",
  });
});

export default router.handler({
  onError(err, req, res) {
    res.status(500).json({
      error: (err as Error).message,
    });
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};
