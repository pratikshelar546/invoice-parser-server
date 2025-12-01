import { log } from "node:console";
import { llmModel } from "./provider/llm.provider.js";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

export const formatToJson = async (text: string) => {
  try {
    const gptResponse = await llmModel.invoke([
      new SystemMessage(
        `You are responsible for converting the text below into json format it is a bill or invoice so make sure to include all the details in the json format and do not loose any data and return only the json format no other text or explanation
            response format:
{
  "invoiceNumber": { "value": "string", "confidence": 0, "tag": "string" },
  "invoiceDate": { "value": "string", "confidence": 0, "tag": "string" },
  "supplierName": { "value": "string", "confidence": 0, "tag": "string" },
  "supplierGstin": { "value": "string", "confidence": 0, "tag": "string" },
  "buyerName": { "value": "string", "confidence": 0, "tag": "string" },

  "taxableAmount": { "value": "number", "confidence": 0, "tag": "string" },
  "gstAmount": { "value": "number", "confidence": 0, "tag": "string" },
  "totalAmount": { "value": "number", "confidence": 0, "tag": "string" },

  "items": [
    {
      "description": { "value": "string", "confidence": 0, "tag": "string" },
      "quantity": { "value": "number", "confidence": 0, "tag": "string" },
      "rate": { "value": "number", "confidence": 0, "tag": "string" },
      "amount": { "value": "number", "confidence": 0, "tag": "string" }
    }
  ]
}
above is just and example of the json format you need to return the json format only no other text or explanation and you can add extra deatils which you thing that are related to bill or invoice but do not do overdo it and data should be accurate with confidence score and tag.
if you have any other details that are not in the json format then you can add them to the extraDetails array.
rules of tag:
1. tag is a string that is used to identify the type of the data
Assign a tag to each field based on its confidence score using the following rules:

a. If confidence >= 0.95  
   tag = "ACCURATE"

b. If 0.85 <= confidence < 0.95  
   tag = "HIGH"

c. If 0.65 <= confidence < 0.85  
   tag = "POTENTIAL_ISSUE"

d. If 0.40 <= confidence < 0.65  
   tag = "REVIEW_REQUIRED"

e. If confidence < 0.40  
   tag = "MANUAL_VERIFICATION"

Tags must always be one of the following strings:
["ACCURATE", "HIGH", "POTENTIAL_ISSUE", "REVIEW_REQUIRED", "MANUAL_VERIFICATION"].

Do not create new tags.
Do not change tag names.
Tag selection must depend only on the numeric confidence.
            `
      ),
      new HumanMessage(text),
    ]);
    return gptResponse.content;
  } catch (error) {
    console.log("error while formatting to json", error);
    throw error;
  }
};
