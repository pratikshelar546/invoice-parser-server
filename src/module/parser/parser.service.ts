import { PDFParse } from 'pdf-parse'; 
import { formatToJson } from '../../aiService/index.js';
import { createWorker } from 'tesseract.js';


export const pdfParser = async (file: any) => {
    if (!file || !file.buffer) {
        throw new Error("No PDF file buffer provided.");
    }
    const imageBuffer = file.buffer;
    let rawText = ''

    try {
        console.log(file);
        if(file.mimetype === 'application/pdf'){
        const parser= new PDFParse({
            data: imageBuffer,  // Node Buffer is supported
          });
          const textResult = await parser.getText(); // returns TextResult
          const fullText = textResult.text?.trim() ?? '';
      
          console.log('pages:', textResult.pages.length);
          console.log('text length:', fullText.length);
          console.log(fullText.length > 100 ? fullText : null);
          parser.destroy();
          rawText = fullText;
        }else{
            const worker = await createWorker('eng');

            const {data:{text}} = await worker.recognize(imageBuffer);
            rawText = text;
            await worker.terminate();
        }        
          const json =await formatToJson(rawText);
        //   console.log("json", json);
        return json;
    } catch (error) {
        console.log(error);
        
        throw error;
    }
};