import imagekit from "../utils/imageKit.js";

export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) return next();

    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(req.file.mimetype))
      throw { statusCode: 400, message: "Invalid image type" };

    const maxSize = 5 * 1024 * 1024;
    if (req.file.size > maxSize)
      throw { statusCode: 400, message: "Image too large (max 5MB)" };

    const image = await imagekit.upload({
      file: req.file.buffer,
      fileName: req.file.originalname,
    });

    req.imageUrl = image.url;
    next();
  } catch (err) {
    next(err);
  }
};
