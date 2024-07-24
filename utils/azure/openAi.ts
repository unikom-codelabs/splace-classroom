import { openAiClient } from "@/config/azure"
import { AzureKeyCredential, OpenAIClient } from "@azure/openai"

const modelName = process.env.AZURE_OPENAI_MODEL_NAME as string
const searchEndpoint = process.env.AZURE_SEARCH_ENDPOINT as string
const searchKey = process.env.AZURE_SEARCH_KEY as string
export const getChatCompletions : any = async (indexName: string, message: string) => {
 return await openAiClient.getChatCompletions(
		modelName,
		[{ role: "user", content: message }],
		{
			azureExtensionOptions: {
				extensions: [
					{
						type: "azure_search",
						endpoint: searchEndpoint,
						// key: searchKey,
						authentication: {
							type: "api_key",
							key: searchKey,
						},
						indexName: indexName,
					},
				],
			},
		}
 );

}
export const getChatResponse: any = async (course_id:number,messages:Array<any>,prompt: string) => {
	const config = {
		prompt,
		course_id,
		messages,
		threshold: 0.5,
		limit: 5,
	};
	return await fetch(process.env.CHATBOT_URL as string, {
		method: 'POST',
		body: JSON.stringify(config),
		headers: { 'Content-Type': 'application/json' }
	}).then(res => res.json());
	
};