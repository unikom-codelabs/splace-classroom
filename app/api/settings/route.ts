import { Setting, SettingWithId, User } from "@/types";
import { deleteBlob, upload } from "@/utils/azure/storageBlob";
import getResponse from "@/utils/getResponse";
import { PrismaClient } from "@prisma/client";
import * as path from 'path';
const prisma = new PrismaClient();
export async function GET(req: Request) {
  const setting :SettingWithId = await prisma.setting.findFirst() as any

	return getResponse(setting, "success get all Setting", 200);
}

export async function POST(req: Request) {
	const form = await req.formData();
	const project_name = form.get("project_name") as string;
	const university_name = form.get("university_name") as string;
	const color = form.get("color") as string;
	const description = form.get("description") as string;
	const logo = form.get("logo") as any;
	const banner = form.get("banner") as any;

	let setting = await prisma.setting.findFirst();
	const now = new Date();
	const fileName = `${now.getTime()}_${project_name}_${university_name}_`;
	if ((!banner || !logo) && !setting)
    return getResponse(null, "Banner and Logo must Be Upload", 404);
  let logoBuffer,
    logoFileName = null;
  
  let bannerBuffer, bannerFileName= null
	if (logo) {
		const logoBytes = await logo.arrayBuffer();
		logoBuffer = Buffer.from(logoBytes);
		const logoExtension = path.extname(logo?.name);
		logoFileName = fileName + "logo" + logoExtension;
	}

	if (banner) {
		const bannerBytes = await banner.arrayBuffer();
		 bannerBuffer = Buffer.from(bannerBytes);
		const bannerExtension = path.extname(banner.name);
		 bannerFileName = fileName + "banner" + bannerExtension;
	}

  if (!setting && logoFileName&&logoBuffer) {
    console.log("[SYSTEM] Created Setting")
    const bannerBytes = await banner.arrayBuffer();
    const bannerBuffer = Buffer.from(bannerBytes);
    const bannerExtension = path.extname(banner.name);
    const bannerFileName = fileName + "banner" + bannerExtension;
		const [{ request: logoFile }, { request: bannerFile }] =
			await Promise.all([
				upload("settings", logoFileName, logoBuffer),
				upload("settings", bannerFileName, bannerBuffer),
			]);
		setting = await prisma.setting.create({
			data: {
				project_name,
				description,
				university_name,
				logo: logoFile.url,
				banner: bannerFile.url,
				color: JSON.parse(color),
			},
		});
  } else if (setting) {
    console.log("[SYSTEM] Updated Setting");
    
		let logoFile,
			bannerFile = null;
    if (setting && logo && logoFileName && logoBuffer) {
      console.log(setting.logo)
      await deleteBlob("settings", setting.logo)
      const { request:logoFileBlob } = await upload("settings", logoFileName, logoBuffer),
      logoFile = logoFileBlob.url
    }
    if (setting && banner &&bannerBuffer && bannerFileName) {
      await deleteBlob("settings", setting.banner)
      const { request:bannerFileBlob } = await upload("settings", bannerFileName, bannerBuffer),
      bannerFile = bannerFileBlob.url
    }
    
		
		await prisma.setting.update({
			where: { id: setting?.id },
			data: {
				project_name: project_name || setting.project_name,
				university_name: university_name || setting.university_name,
				color: JSON.parse(color) || setting.color,
				description: description || setting.description,
				banner: bannerFile || setting.banner,
				logo: logoFile || setting.banner,
			},
		});
	}

	return getResponse(setting, "Success Create/Update Setting", 200);
}