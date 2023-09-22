import { Request, Response } from "express";
import { recoverPinService } from "../../_services/passwordRecoverServices/recoverPin.service";


export const recoverPinController = async (req:Request, res: Response) => {
    const pinCode = req.body.recover_pin
    
    const recoverPinResponse = await recoverPinService(pinCode)
    return res.status(200).json(recoverPinResponse)
}