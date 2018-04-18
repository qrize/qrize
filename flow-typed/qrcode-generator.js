declare module "qrcode-generator" {
  declare export type TypeNumber =
    | 0 // Automatic type number
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25
    | 26
    | 27
    | 28
    | 29
    | 30
    | 31
    | 32
    | 33
    | 34
    | 35
    | 36
    | 37
    | 38
    | 39
    | 40;

  declare export type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";

  declare export type Mode =
    | "Numeric"
    | "Alphanumeric"
    | "Byte" /* Default */
    | "Kanji";

  declare export type QrCode = {|
    addData(data: string, mode?: Mode): void,
    make(): void,
    getModuleCount(): number,
    isDark(row: number, col: number): boolean,
    createImgTag(cellSize?: number, margin?: number): string,
    createSvgTag(cellSize?: number, margin?: number): string,
    createTableTag(cellSize?: number, margin?: number): string,
    renderTo2dContext(
      context: CanvasRenderingContext2D,
      cellSize?: number
    ): void,
  |};

  declare export default function qrcode(
    typeNumber: TypeNumber,
    errorCorrectionLevel: ErrorCorrectionLevel
  ): QrCode;
}
