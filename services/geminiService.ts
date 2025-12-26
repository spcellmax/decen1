
import { GoogleGenAI, Type } from "@google/genai";
import { DECENTRO_MODULES } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function findSolutions(query: string) {
  const systemPrompt = `
    You are the Principal Solutions Architect at Decentro. 
    A customer is describing a fintech vision. Map this vision to Decentro's infrastructure.

    CRITICAL RULE: You MUST use the exact module names provided below for the "recommendedModules" field.
    DECENTRO MODULES:
    ${DECENTRO_MODULES.map(m => `- ${m.name}`).join('\n')}

    YOUR TASK:
    1. Reasoning: A brief, high-level business strategy (2-3 sentences).
    2. Recommended Modules: An array of strings. Each string MUST be exactly one of the module names listed above.
    3. Workflow: A clear implementation roadmap. Use a NEWLINE character (\n) between each step. Each step should start with a number (e.g. "1. Step description").
    4. Business Impact: One punchy sentence about the bottom-line benefit.
    5. TimeToMarket: A specific duration (e.g., "14 Days", "3 Weeks").

    Output strictly valid JSON.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `User Objective: "${query}"`,
    config: {
      systemInstruction: systemPrompt,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          reasoning: { type: Type.STRING },
          recommendedModules: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          workflow: { type: Type.STRING },
          businessImpact: { type: Type.STRING },
          timeToMarket: { type: Type.STRING }
        },
        required: ["reasoning", "recommendedModules", "workflow", "businessImpact", "timeToMarket"]
      }
    }
  });

  return JSON.parse(response.text);
}
