import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// if (err instanceof RequestValidationError) {
	// 	// Remove the static definition of errors and import from the defined one in the class
	// 	// const formattedErrors = err.errors.map(error => {
	// 	// 	return { message: error.msg, field: error.param };
	// 	// });
	// 	// return res.status(400).send({ errors: formattedErrors });

	// 	// return res.status(err.statusCode).send({ errors: err.serializeErrors() });
	// }

	// if (err instanceof DatabaseConnectionError) {
	// 	return res
	// 		.status(err.statusCode)
	// 		.send({ errors: [{ errors: err.serializeErrors() }] });
	// }

	if (err instanceof CustomError) {
		return res.status(err.statusCode).send({ errors: err.serializeErrors() });
	}

	res.status(400).send({
		errors: [{ message: "Something went wrong" }],
	});
};
