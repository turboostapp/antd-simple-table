import { IsBoolean, IsNumber, IsString } from "class-validator";

export class ColumnSetting {
  @IsString()
  public key: string;

  @IsBoolean()
  public hidden: boolean;

  @IsNumber()
  public width: number;
}
