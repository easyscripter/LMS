import {
	Controller,
	HttpCode,
	Post,
	Query,
	UploadedFiles,
	UseGuards,
	UseInterceptors
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@HttpCode(200)
	@UseInterceptors(FilesInterceptor('files'))
	@UseGuards(JwtAuthGuard)
	@Post('upload')
	async saveFiles(
		@UploadedFiles() files: Express.Multer.File[],
		@Query('folder') folder?: string
	) {
		return this.fileService.saveFiles(files, folder);
	}
}
