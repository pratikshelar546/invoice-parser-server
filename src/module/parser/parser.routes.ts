import express, { type NextFunction, type Request, type Response } from 'express';
import { upload } from '../../utility/multers.js';
import { pdfParser } from './parser.service.js';
import { ResponseHandler } from '../../utility/response.handler.js';
import { InvoiceParser } from './parser.schema.js';


const router = express.Router();

router.post("/parse",upload.single("file"),async (req: Request,res: Response,next: NextFunction)=>{
    try {    
        console.log("req.file", req.file);
        
        const file = req.file;
        // return
        const response = await pdfParser(file);
        const json = JSON.parse(response as string);
        await InvoiceParser.create({
            invoiceNumber: json.invoiceNumber,
            invoiceDate: json.invoiceDate,
            supplierName: json.supplierName,
            taxableAmount: json.taxableAmount,
            gstAmount: json.gstAmount,
            totalAmount: json.totalAmount,
            items: json.items,
            extraDetails: json.extraDetails
        })
        return res.send(new ResponseHandler(json));
    } catch (error) {
        next(error);
    }
})

router.get("/getInvoices",async (req: Request,res: Response,next: NextFunction)=>{
    try {
        const invoices = await InvoiceParser.find().sort({ createdAt: -1 });
        return res.send(new ResponseHandler(invoices));
    } catch (error) {
        next(error);
    }
})
export default router;