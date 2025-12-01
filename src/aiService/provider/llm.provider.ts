import { ChatOpenAI } from '@langchain/openai';
import dotenv from 'dotenv';

dotenv.config();
let llmInstance: ChatOpenAI | null = null;



const getLLM = async(): Promise<ChatOpenAI>=>{
    try {
        if(!llmInstance){
            llmInstance = new ChatOpenAI({
                model: "gpt-4o-mini",
                temperature:0.5,
                maxTokens: 1000,
                apiKey: process.env.OPENAI_API_KEY,
            })

        }
        return llmInstance;
    } catch (error) {
        console.log("error while getting llm", error);
        
        throw error;
    }
}

export const llmModel = await getLLM();