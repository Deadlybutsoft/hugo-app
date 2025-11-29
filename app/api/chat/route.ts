import { GoogleGenAI } from '@google/genai';

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();
        const apiKey = 'AIzaSyBML7sxZPH-0SMCvfmcVnYgpbEZ1OyudGg';

        const ai = new GoogleGenAI({ apiKey });

        // Convert messages to Gemini format
        // Gemini expects 'user' and 'model' roles
        const contents = messages.map((m: any) => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }],
        }));

        const model = 'gemini-2.0-flash-lite';

        const response = await ai.models.generateContentStream({
            model,
            contents,
        });

        const stream = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of response) {
                        if (chunk.text) {
                            controller.enqueue(new TextEncoder().encode(chunk.text));
                        }
                    }
                    controller.close();
                } catch (error) {
                    console.error('Streaming error:', error);
                    controller.error(error);
                }
            },
        });

        return new Response(stream, {
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });
    } catch (error) {
        console.error('API error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
