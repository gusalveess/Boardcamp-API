import { Router } from "express";
import { deleteRental, getRentals, postRentals, returnRental } from "../controllers/rentalsController.js";
import { rentalValidationMiddleware } from "../middlewares/rentalMiddleware.js";
import { schemaValidationMiddleware } from "../middlewares/schemaMiddleware.js";
import rentalSchema from "../schemas/rentalSchema.js";

const rentalsRouter = Router();
rentalsRouter.get(
   "/rentals",
   getRentals
);

rentalsRouter.post(
  "/rentals",
  schemaValidationMiddleware(rentalSchema),
  rentalValidationMiddleware,
  postRentals
);

rentalsRouter.post(
   "/rentals/:id/return",
   returnRental
);

rentalsRouter.delete(
   "/rentals/:id",
   deleteRental
);

export default rentalsRouter;