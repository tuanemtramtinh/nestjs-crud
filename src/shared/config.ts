import { plainToInstance } from 'class-transformer';
import fs from 'fs';
import path from 'path';

// Kiểm tra coi thử có file .env hay chưa

if (!fs.existsSync(path.resolve('.env'))) {
  console.log('Không tìm thấy file .env');
  process.exit(1);
}

class ConfigSchema {
  DATABASE_URL: string;
  ACCESS_TOKEN_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
  REFRESH_TOKEN_EXPIRES_IN: string;
}

const configServer = plainToInstance(ConfigSchema, process.env);

console.log(configServer);
