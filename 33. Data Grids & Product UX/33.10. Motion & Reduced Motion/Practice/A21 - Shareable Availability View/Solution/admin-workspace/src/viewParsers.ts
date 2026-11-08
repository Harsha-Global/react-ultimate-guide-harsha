import { createParser, parseAsNumberLiteral, parseAsStringLiteral } from "nuqs";

export const availabilityValues = ["all", "available", "low", "unavailable"] as const;
export type Availability = typeof availabilityValues[number];

const pageParser = createParser({
  parse: (value) => /^[1-9]\d*$/.test(value) && Number(value) <= 100000 ? Number(value) : null,
  serialize: String,
});
const searchParser = createParser({
  parse: (value) => value.length <= 60 ? value : null,
  serialize: (value) => value,
});

export const viewParsers = {
  availability: parseAsStringLiteral(availabilityValues).withDefault("all"),
  q: searchParser.withDefault(""),
  sort: parseAsStringLiteral(["", "name", "category", "priceMinor", "stock"] as const).withDefault(""),
  dir: parseAsStringLiteral(["asc", "desc"] as const).withDefault("asc"),
  page: pageParser.withDefault(1),
  size: parseAsNumberLiteral([2, 4] as const).withDefault(2),
};
