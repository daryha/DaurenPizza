"use client";

import React from "react";
import { useDebounce, useClickAway } from "react-use";

interface Props {
  onChange?: (value?: string) => void;
}

interface Suggestion {
  value: string;
  data: any;
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
  const [suggestions, setSuggestions] = React.useState<Suggestion[]>([]);
  const ref = React.useRef(null);
  const token = "68563b3862fc6153ed0e38d0f66c03154dc6c16b";
  const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
  const [focused, setFocused] = React.useState(false);
  const [query, setQuery] = React.useState("");

  useDebounce(
    async () => {
      if (!query) return;

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            query,
            count: 5,
            locations: [{ country: "Казахстан", city: "Астана" }],
          }),
        });

        const result = await response.json();
        setSuggestions(result.suggestions || []);
      } catch (error) {
        console.error("Ошибка при получении адресов:", error);
      }
    },
    250,
    [query]
  );

  useClickAway(ref, () => {
    setFocused(false);
  });

  const getShortAddress = (data: any): string => {
    const street = data.street_with_type || "";
    const house = data.house || "";
    return `${street}  ${house}`.trim();
  };

  const handleSelect = (suggestion: Suggestion) => {
    setQuery(getShortAddress(suggestion.data));
    setSuggestions([]);
    onChange?.(getShortAddress(suggestion.data));
    setFocused(false);
  };

  return (
    <div className="relative w-full max-w-md" ref={ref}>
      <input
        type="text"
        value={query}
        placeholder="Введите адрес (например, пр-т. Мангилик Ел)"
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-150"
      />
      {focused && suggestions.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full rounded-xl border border-gray-200 bg-white shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((s, i) => (
            <li
              key={i}
              onClick={() => handleSelect(s)}
              className="px-4 py-2 hover:bg-primary/10 cursor-pointer transition-colors"
            >
              {getShortAddress(s.data)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
