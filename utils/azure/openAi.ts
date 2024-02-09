import { openAiClient } from "@/config/azure"
import { AzureKeyCredential, OpenAIClient } from "@azure/openai"

const modelName = process.env.AZURE_OPENAI_MODEL_NAME as string
const searchEndpoint = process.env.AZURE_SEARCH_ENDPOINT as string
const searchKey = process.env.AZURE_SEARCH_KEY as string
export const getChatCompletions = async (indexName: string, message: string) => {
 return await  openAiClient.getChatCompletions(modelName,[{ role: "user", content: message }], {
    azureExtensionOptions: {
      extensions: [
        {
          type: "AzureCognitiveSearch",
          endpoint: searchEndpoint,
          key: searchKey,
          indexName: indexName,
        },
      ],
    },
  })

}