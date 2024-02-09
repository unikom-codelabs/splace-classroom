import { OpenAIClient,AzureKeyCredential as Credential } from "@azure/openai";
import { SearchIndexClient,SearchIndexerClient } from '@azure/search-documents';
import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import { AzureKeyCredential } from "@azure/core-auth";

const openAiEndpoint = process.env.AZURE_OPENAI_ENDPOINT as string ;
const openAiApiKey = process.env.AZURE_OPENAI_KEY as string;
const searchIndexEndpoint = process.env.AZURE_SEARCH_ENDPOINT as string;
const storageConnectionKey=process.env.AZURE_STORAGE_CONNECTION_STRING as string
const clientIndexApiKey = process.env.AZURE_SEARCH_KEY as string;

export const clientIndex = new SearchIndexClient(searchIndexEndpoint, new AzureKeyCredential(clientIndexApiKey));
export const openAiClient =  new OpenAIClient(openAiEndpoint,new AzureKeyCredential(openAiApiKey));
export const clientIndexer = new SearchIndexerClient(searchIndexEndpoint,new AzureKeyCredential(clientIndexApiKey));
export const storageClient = BlobServiceClient.fromConnectionString(storageConnectionKey)

let searchClient :any=null;

export function getSearchClient(index_name:string) {
  if(!searchClient[index_name]) {
    searchClient[index_name]= new searchClient(searchIndexEndpoint,index_name,new AzureKeyCredential(clientIndexApiKey));
  }
  return searchClient[index_name];
}