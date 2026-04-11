import * as fs from 'fs';
import * as path from 'path';

export class TestDataLoader {
  static loadTestData(fileName: string): any {
    const filePath = path.join(__dirname, '../testData', `${fileName}.json`);
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  }

  static getAllTestData(): any[] {
    const testDataDir = path.join(__dirname, '../testData');
    const files = fs.readdirSync(testDataDir).filter((file) => file.endsWith('.json'));
    return files.map((file) => {
      const filePath = path.join(testDataDir, file);
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    });
  }
}
