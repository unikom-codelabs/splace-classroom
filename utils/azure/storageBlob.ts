import { storageClient } from "@/config/azure"

export const createContainer = async (containerName:string) => {
  await storageClient.createContainer(containerName, {
    access: 'container',
    metadata: {
      containerName: containerName
    }
  })
  console.info(`[SYSTEM] created container : ${containerName} `)
}
export const upload = async (containerName: string, fileName: string, buffer: Buffer) => {
  const containerClient = storageClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);
  const uploaded = await blockBlobClient.upload(buffer, buffer.length)
  console.info(`[SYSTEM] uploaded file : ${fileName} to container : ${containerName}`)
  return uploaded._response
}
export const deleteBlob = async (containerName: string, link: string) => {

const linkSplited = link.split('/')

const fileName = linkSplited[linkSplited.length-1]

const decodedString = decodeURIComponent(fileName.replace(/\+/g, ' '));
  const containerClient = storageClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(decodedString);
  await blockBlobClient.delete()
  console.info(`[SYSTEM] deleted file : ${fileName} from container : ${containerName}`)
}
export const deleteContainer = async (containerName: string) => {
  const containerClient = storageClient.getContainerClient(containerName);
  await containerClient.delete()
  console.info(`[SYSTEM] deleted container : ${containerName}`)
}