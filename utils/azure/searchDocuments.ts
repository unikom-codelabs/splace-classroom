import { clientIndex, clientIndexer } from "@/config/azure"

export const createIndex = async (indexName: string) => {
  try {
    
    await clientIndex.createIndex({
      name: indexName,
      fields: [
        { name: 'id', type: 'Edm.String', key: true,filterable:true,sortable:true },
        { name: 'content', type: 'Edm.String',searchable:true },
        { name: 'filepath', type: 'Edm.String' },
        { name: 'url', type: 'Edm.String', },
        {name:'title',type:'Edm.String',searchable:true}
      ],
      corsOptions: {
        allowedOrigins: ['*'],
        maxAgeInSeconds: 300
      },

      semanticSearch: {
        configurations: [
          { name: 'default', prioritizedFields: { titleField: { name: 'title' }, contentFields: [{ name: 'content' }]}}
        ]
      }
    })
  console.info(`[SYSTEM] created index : ${indexName} `)

    return true
  } catch (error) {
    console.error(error)
    return error
  }

}
export const createIndexer = async (indexerName :string,dataSourceName:string,indexName:string) => {
  
  await clientIndexer.createIndexer({
    name: indexerName,
    dataSourceName:dataSourceName,
    targetIndexName: indexName,
    parameters: {
      configuration: {
        indexedFileNameExtensions: '.pdf,.docx,.doc,.pptx,.ppt,.xlsx,.xls,.txt',
        parsingMode: 'default',
      }
      
    },
    fieldMappings: [
      { sourceFieldName: 'metadata_storage_path', targetFieldName: 'filepath' },
      { sourceFieldName: 'metadata_storage_path', targetFieldName: 'url' },
      { sourceFieldName: 'metadata_title', targetFieldName: 'title' },
      { sourceFieldName: 'content', targetFieldName: 'content' },
    ],
    
  });
  console.info(` [SYSTEM] created indexer: ${indexerName} `)
}
export const craateDatasource = async (dataSourceName:string,containerName:string) => {
  await clientIndexer.createDataSourceConnection({
    name: dataSourceName,
    container: {name:containerName},
    type: 'azureblob',
    connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING as string
  }, {
    requestOptions: {
        allowInsecureConnection:true
      }
  })
  console.info(`[SYSTEM] created datasource : ${dataSourceName} `)

}


export const runIndexer = async (indexerName: string) => { 
  console.info(`[SYSTEM] run indexer : ${indexerName} `)
  await clientIndexer.resetIndexer(indexerName)
  return await clientIndexer.runIndexer(indexerName)
}

export const deleteIndex = async (indexName: string) => {
  console.info(`[SYSTEM] delete index : ${indexName} `)
  return await clientIndex.deleteIndex(indexName)
}

export const deleteIndexer = async (indexerName: string) => {
  console.info(`[SYSTEM] delete indexer : ${indexerName} `)
  return await clientIndexer.deleteIndexer(indexerName)
}

export const deleteDatasource = async (dataSourceName: string) => {
  console.info(`[SYSTEM] delete datasource : ${dataSourceName} `)
  return await clientIndexer.deleteDataSourceConnection(dataSourceName)
}