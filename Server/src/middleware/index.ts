import { validationResult } from "express-validator";
import {Request, Response, NextFunction}from 'express'

export const handleInputErrors = (req:Request, res:Response, next:NextFunction) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }
  next();
};
