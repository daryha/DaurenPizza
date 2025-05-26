import axios from "axios";
import { parseStringPromise } from "xml2js";

interface Valute {
  CharCode: string;
  Nominal: string;
  Value: string;
}

export const getTengePerRub = async (): Promise<number> => {
  // 1️⃣ Скачиваем XML
  const { data: xml } = await axios.get<string>("https://www.cbr.ru/scripts/XML_daily.asp");

  // 2️⃣ Парсим в JS-объект
  const result = await parseStringPromise(xml, { explicitArray: false });
  const rawValutes = result.ValCurs.Valute;
  const valutes: Valute[] = Array.isArray(rawValutes) ? rawValutes : [rawValutes];

  // 3️⃣ Ищем KZT
  const kzt = valutes.find((v) => v.CharCode === "KZT");
  if (!kzt) throw new Error("KZT не найден в ответе ЦБ");

  // 4️⃣ Берём Nominal (сколько условных единиц валюты) и Value (сколько рублей)
  const nominal = parseInt(kzt.Nominal, 10); // например, 100
  const value = parseFloat(kzt.Value.replace(",", ".")); // например, 12.3456 (рублей за 100 тенге)

  // 5️⃣ Считаем тенге за 1 рубль: nominal / value
  const tengePerRub = nominal / value;
  return tengePerRub;
};
