import { Workbook } from "exceljs";

export const readXlsx = (file: File) => {
  return new Promise(async (resolve, reject) => {
	try {
		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);
		const workbook = new Workbook();
		await workbook.xlsx.load(buffer); // load the workbook from the buffer
    const worksheet = workbook.getWorksheet(1); // get the first worksheet
    const data :any[]= []
    let keys:any[] =[]
    worksheet?.eachRow((row, rowNumber) => {
      const rowJson = JSON.parse(JSON.stringify(row.values))
      
      if (rowNumber == 1 ) keys= rowJson
      else data.push(rowJson);
    });
    
    return resolve(data.map(values => {
      return keys.reduce((obj, key, index) => {
        if(key!== null && values[index] !== null)
    obj[key] = values[index];
    return obj;
  }, {});
}))
	} catch (error) {
    console.error(error);
    reject(error)
  }
	})
};
