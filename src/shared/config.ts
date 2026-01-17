/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import 'dotenv/config';
import { plainToInstance } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';
import fs from 'fs';
import path from 'path';

// Kiểm tra coi thử có file .env hay chưa

if (!fs.existsSync(path.resolve('.env'))) {
  console.log('Không tìm thấy file .env');
  process.exit(1);
}

class ConfigSchema {
  @IsString()
  DATABASE_URL: string;
  @IsString()
  ACCESS_TOKEN_SECRET: string;
  @IsString()
  ACCESS_TOKEN_EXPIRES_IN: string;
  @IsString()
  REFRESH_TOKEN_SECRET: string;
  @IsString()
  REFRESH_TOKEN_EXPIRES_IN: string;

  @IsNumber()
  TEST: number;
}

const configServer = plainToInstance(ConfigSchema, process.env, {
  enableImplicitConversion: true,
});
const e = validateSync(configServer);

if (e.length > 0) {
  console.log('Các giá trị khai báo trong file .env không hợp lệ');
  const errors = e.map((eItem) => {
    return {
      property: eItem.property,
      constraints: eItem.constraints,
      value: eItem.value,
    };
  });
  // eslint-disable-next-line @typescript-eslint/only-throw-error
  throw errors;
}

const envConfig = configServer;

export default envConfig;
