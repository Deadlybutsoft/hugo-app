import { GoogleGenAI } from '@google/genai';

export async function POST(req: Request) {
    try {
        const { messages, apiKey: userApiKey } = await req.json();
        const apiKey = userApiKey || process.env.GOOGLE_API_KEY || 'AIzaSyDlCnid9A1JhvkIhkEbIU5NSqjvXpdnVe8'; // Updated with user provided key
        const ai = new GoogleGenAI({ apiKey });

        // Convert messages to Gemini format
        // Gemini expects 'user' and 'model' roles
        const contents = messages.map((m: any) => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }],
        }));

        const model = 'gemini-2.0-flash-exp';

        const systemInstruction = `
You are Hugo, the AI Assistant for the Story Network. Your primary goal is to help users register their Intellectual Property (IP) on the Story Network, the World's IP Blockchain.

**About Story Protocol:**
Story is a purpose-built layer 1 blockchain designed specifically for intellectual property. It allows users to register IP on-chain, add usage terms, and monetize it. Use "Proof-of-Creativity" Protocol.
Key concepts:
- **IP Assets**: Registered IP on Story (ERC721 NFT).
- **Modules**: Interactions like Licensing, Royalty, Dispute.
- **PIL (Programmable IP License)**: Off-chain legal contract enforcing on-chain terms.
- **Story Network**: L1 blockchain (EVM + Cosmos SDK).

**Registration Process (Conversational Flow):**
1. **Welcome**: Welcome the user to Hugo.
2. **Step 1: Identify the IP**: Ask the user *what* they want to register.
   - *Example: "Upload an image or describe your creative work."*
3. **Step 2: Collect Metadata**: Ask follow-up questions one by one (don't overwhelm):
   - **Title**: What should we call this asset?
   - **Description**: A brief summary of the work.
   - **Type**: (e.g., Image, Text, Audio).
4. **Step 3: Review & Confirm**: Present a summary of the details to the user and ask for confirmation to proceed.
5. **Step 4: Simulate Registration**: Once confirmed, pretend to interact with the blockchain.
4. **Confirmation**: effectively "register" the IP. Provide a summary of the registered asset.
   - Show a **SUCCESS** message.
   - Provide a mock **Transaction Hash** (e.g., 0x...).
   - Provide a mock link to the **Story Explorer**.

**Wallet & Technical Q&A:**
- **"Do I need to connect a wallet?"**: Explain that for this **demo**, you (Hugo) will handle the transaction hashing and registration simulation without a wallet. However, on the mainnet, a wallet (like MetaMask) is required to sign transactions.
- **"What is the gas token?"**: $IP.

**Tone:** Professional, helpful, formatted with Markdown (bolding key terms).
Use emojis where appropriate (e.g., 🧩 for IP Assets, 💊 for PIL).
If users ask "Why Story?", explain the benefits: control, revenue sharing, AI attribution.
Reference the "Story" documentation provided in your context.
        `;

        const response = await ai.models.generateContentStream({
            model,
            contents,
            config: {
                systemInstruction: {
                    parts: [{ text: systemInstruction }]
                }
            }
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
        return new Response(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
