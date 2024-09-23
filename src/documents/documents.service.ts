import { Injectable } from '@nestjs/common';
// Importa las bibliotecas necesarias para la manipulación de documentos, por ejemplo:
import * as Pizzip from 'pizzip';
import * as Docxtemplater from 'docxtemplater';
import * as fs from 'fs-extra';
import * as path from 'path';

@Injectable()
export class DocumentsService {
  async createDocument(data: any): Promise<string> {
    try {
      // Leer la plantilla del archivo .docx
      const templatePath = path.resolve(__dirname, '..', '..', 'src', 'templates', 'template.docx');
      console.log('Ruta de la plantilla:', templatePath);

      if (!fs.existsSync(templatePath)) {
        console.error('La plantilla no existe en la ruta especificada.');
        return null;
      }

      const content = fs.readFileSync(templatePath, 'binary');
      console.log('Contenido de la plantilla leído correctamente.');

      // Inicializar Pizzip y Docxtemplater
      const zip = new Pizzip(content);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      // Asignar los datos del endpoint a la plantilla
      doc.setData({
        endpoint: data.endpoint,
        method: data.method,
        entries: data.entries,
        title: data.title,
        description: data.description,
        results: data.results,
        token: data.token,
        observation: data.observation,
      });

      // Renderizar el documento con los datos proporcionados
      doc.render();
      console.log('Documento renderizado correctamente.');

      // Generar el documento final y guardarlo
      const buffer = doc.getZip().generate({ type: 'nodebuffer' });
      const outputPath = path.resolve(__dirname, '..', 'output', 'GeneratedDocument.docx');

      console.log('Ruta de salida del archivo:', outputPath);
      fs.ensureDirSync(path.dirname(outputPath));
      fs.writeFileSync(outputPath, buffer);

      console.log('Documento generado correctamente en:', outputPath);

      return outputPath;
    } catch (error) {
      console.error('Error al generar el documento:', error);
      return null;
    }
  }
}