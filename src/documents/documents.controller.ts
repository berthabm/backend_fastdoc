import { Controller, Post, Res, Body } from '@nestjs/common';
import { Response } from 'express';
import { DocumentsService } from './documents.service';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('generate')
  async generateDocument(@Body() data: any, @Res() res: Response) {
    const filePath = await this.documentsService.createDocument(data);

    if (filePath) {
      // Enviar el archivo generado como respuesta para la descarga
      res.download(filePath, 'GeneratedDocument.docx', (err) => {
        if (err) {
          res.status(500).send({ message: 'Error al descargar el documento' });
        }
      });
    } else {
      res.status(500).send({ message: 'Error al generar el documento' });
    }
  }
}