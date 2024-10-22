import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../lib/utils/errorResponse";
import sql from "../db";
import { BaseResponse } from "../lib/utils/BaseResponse";
import {StatusCodes} from "http-status-codes";
import { Medicine } from "../models/Medicine";
import { updateMedicineRequestSchema } from "../lib/validation";

export const getMedicines = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const medicines = await sql`
      SELECT * FROM medicines 
      LIMIT 5
    `
    if (!medicines.length) {
      return next(new ErrorResponse('No medicines found', StatusCodes.NOT_FOUND));
    }
    
    const response = new BaseResponse(StatusCodes.OK, 'success', medicines)
    return res.status(response.status).json(response);
  } catch (error) {
    next(error);    
  }
}

export const getMedicine = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const medicine = await sql`
      SELECT * FROM medicines
      WHERE medicine_id = ${req.params.id}
    `
    if (!medicine) {
      return next(new ErrorResponse('Medicine not found', StatusCodes.NOT_FOUND));
    }
  
    const response = new BaseResponse(StatusCodes.OK, 'success', medicine)
    return res.status(response.status).json(response);
  } catch (error) {
    next(error);    
  }
}

export const updateMedicine = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedRequest = updateMedicineRequestSchema.parse(req.body);
    const {medicine: validatedMedicine, medicineDetail: validatedMedicineDetail} = validatedRequest;

    const medicine = await sql`
      SELECT * FROM medicines
      WHERE medicine_id = ${req.params.id}
    ` as unknown as Medicine[];
    if (!medicine) {
      return next(new ErrorResponse('Medicine not found', StatusCodes.NOT_FOUND));
    }

    //introduce some sort of duplication logic here
    const updatedMedicine = await sql`
      UPDATE medicines
      SET 
        medicine = ${sql.json(validatedMedicine)},
        "Uses/Indications" = ${validatedMedicineDetail["Uses/Indications"] ?? null},
        "Pharmacology/Actions" = ${validatedMedicineDetail["Pharmacology/Actions"] ?? null},
        "Pharmacokinetics" = ${validatedMedicineDetail["Pharmacokinetics"] ?? null},
        "Contraindications/Precautions/Warnings" = ${validatedMedicineDetail["Contraindications/Precautions/Warnings"] ?? null},
        "Adverse Effects" = ${validatedMedicineDetail["Adverse Effects"] ?? null},
        "Reproductive/Nursing Safety" = ${validatedMedicineDetail["Reproductive/Nursing Safety"] ?? null},
        "Overdosage/Acute Toxicity" = ${validatedMedicineDetail["Overdosage/Acute Toxicity"] ?? null},
        updated_at = NOW()
      WHERE medicine_id = ${req.params.id}
    `
    const response = new BaseResponse(StatusCodes.OK, 'Updated Medicine', updatedMedicine[0])
    return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
}

export const deleteMedicine = async(req: Request, res: Response, next: NextFunction) => {
    try {
    const medicine = await sql`
      SELECT * FROM medicines
      WHERE medicine_id = ${req.params.id}
    `
    if (!medicine) {
      return next(new ErrorResponse('Medicine not found', StatusCodes.NOT_FOUND));
    }
    const deletedMedicine = await sql`
      DELETE FROM medicines
      WHERE medicines_id = ${req.params.id}
      RETURNING *
    `
    const response = new BaseResponse(StatusCodes.OK, 'success', deletedMedicine)
    return res.status(response.status).json(response);
  } catch (error) {
    next(error);    
  }
}