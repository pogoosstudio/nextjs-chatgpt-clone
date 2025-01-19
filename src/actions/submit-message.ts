/*'use server';

import { createStreamableValue } from 'ai/rsc';
import { CoreMessage, streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { Chat } from '@/models/chat';

export async function submitMessage(messages: CoreMessage[], chatId: string) {

    const exists = await Chat.exists({ key: chatId });
    console.log(exists);

    if (!exists) {
        console.log('Creating new chat');
        const newChat = await Chat.create({ key: chatId, messages });
        (await newChat).save();
    }

    const updateChat = await Chat.findOneAndUpdate({ key: chatId }, { messages });
    (await updateChat).save();
    
    const result = await streamText({
        model: openai('gpt-4'),
        messages,
    });

    const stream = createStreamableValue(result.textStream);

    return stream.value;
}*/

'use server';

import { createStreamableValue } from 'ai/rsc';
import { CoreMessage } from 'ai'; // Importa solo CoreMessage
import { Chat } from '@/models/chat';
import PogoAI from 'pogo-ai';


const pia = new PogoAI("pa-developers");


export async function submitMessage(messages: CoreMessage[], chatId: string) {
    // ... (código para guardar los mensajes en la base de datos)

  try {

    const prompt = messages.map(message => `${message.role}: ${message.content}`).join('\n'); // Construye el prompt


    const response = await pia.generateText(prompt,'pia-stellar');


    // Si PogoAI *no* soporta streaming:

    const stream = createStreamableValue(response);

    return stream.value;



  } catch (error) {

    // Manejo de errores
    console.error("Error al generar texto con Pogo AI:", error);
    throw error; // O maneja el error de otra manera
  }

}
