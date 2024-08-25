import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { FileResponse } from './file.interface';

@Injectable()
export class FileService {
	async saveFiles(files: Express.Multer.File[], folder: string = 'courses') {
		const uploadedFiles = `${path}/uploads/${folder}`;
		await ensureDir(uploadedFiles);
		const response: FileResponse[] = await Promise.all(
			files.map(async file => {
				const originalName = file.originalname;
				await writeFile(`${uploadedFiles}/${originalName}`, file.buffer);
				return {
					url: `/uploads/${folder}/${originalName}`,
					name: originalName
				};
			})
		);
		return response;
	}
}
