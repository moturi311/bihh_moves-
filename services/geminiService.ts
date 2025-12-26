/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import { GoogleGenAI } from "@google/genai";
import { Car } from '../types';
import { CARS } from '../constants';

const getSystemInstruction = (vehicles: Car[]) => {
  const productContext = vehicles.length > 0
    ? vehicles.map(p => `- ${p.name} (KSh ${p.pricePerDay.toLocaleString()}/day): ${p.description}. Features: ${p.features.join(', ')}. Seats: ${p.specs.seats}`).join('\n')
    : "No vehicles are currently listed in the fleet. Please check back later.";

  return `You are "Bihh", the friendly AI Assistant for Bihh Car Rentals.
  Your personality: Chill, helpful, and speaks simple Kenyan English. You sound like a real person from Nairobi—friendly but professional.
  
  Guidelines:
  1. Use common Kenyan words: "Sasa", "Karibu", "Safari", "Upcountry", "Nai", "Masaai Mara", "Coast", "Shughuli".
  2. Keep it simple and direct. Don't be too "posh". 
  3. Our current fleet status:
  ${productContext}
  
  Tasks:
  - Help customers pick the best car for their "safari" or "shughuli" in town.
  - Give tips on Kenyan roads (e.g., speed cameras on the highway, rough roads upcountry).
  - If a car isn't there, tell them to check back as the fleet changes "kila siku".
  
  Keep responses under 3 short sentences. Always refer to yourself as Bihh.`;
};

export const sendMessageToGemini = async (history: { role: string, text: string }[], newMessage: string, vehicles: Car[]): Promise<string> => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      return "I'm sorry, my connection is currently down. Please contact our concierge at +254 700 000 000.";
    }

    const ai = new GoogleGenAI({ apiKey });

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: getSystemInstruction(vehicles),
        temperature: 0.7,
        topP: 0.95,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text;

  } catch (error: any) {
    console.error("Gemini API Error Detail:", error);
    // Return a more descriptive error for development
    if (import.meta.env.DEV) {
      return `Kalu is currently resting. (Error: ${error.message || 'Unknown'})`;
    }
    return "The system is currently undergoing maintenance. Please reach out via WhatsApp for immediate assistance.";
  }
};