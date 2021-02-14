import { useEffect, useState } from "react";

export const useLocale = () => {
  const userLocale = null; // set from user settings later
  const [locale, setLocale] = useState(userLocale);

  useEffect(() => {
    // if there is no locale set, get the users default locale
    if (!locale) {
      import("get-user-locale")
        .then(({ getUserLocale }) => getUserLocale())
        .then((userLocale) => {
          let locale = convertToDateFnsLocaleName(userLocale);
          return import(`date-fns/locale/${locale}`);
        })
        .then(({ default: locale }) => setLocale(locale));
    }
  });

  return [locale];
};

function convertToDateFnsLocaleName(userLocale: string): string {
  let locale: string | undefined = userLocale;
  if (dateFnsLocales.includes(locale)) {
    return locale;
  }

  locale = locale.split("-")[0];
  if (dateFnsLocales.includes(locale)) {
    return locale;
  }

  locale = dateFnsLocales.find((l) => l.startsWith(locale as string));
  return locale ?? "en-GB";
}

const dateFnsLocales = [
  "af",
  "ar-DZ",
  "ar-MA",
  "ar-SA",
  "az",
  "be",
  "bg",
  "bn",
  "ca",
  "cs",
  "cy",
  "da",
  "de",
  "el",
  "en-US",
  "en-GB",
  "en-CA",
  "en-AU",
  "en-NZ",
  "en-IN",
  "eo",
  "es",
  "et",
  "eu",
  "fa-IR",
  "fi",
  "fr",
  "fr-CA",
  "fr-CH",
  "gd",
  "gl",
  "gu",
  "he",
  "hi",
  "hr",
  "hu",
  "hy",
  "id",
  "is",
  "it",
  "ja",
  "ka",
  "kk",
  "kn",
  "ko",
  "lb",
  "lt",
  "lv",
  "mk",
  "ms",
  "mt",
  "nb",
  "nl",
  "nl-BE",
  "nn",
  "pl",
  "pt",
  "pt-BR",
  "ro",
  "ru",
  "sk",
  "sl",
  "sr",
  "sr-Latn",
  "sv",
  "ta",
  "te",
  "th",
  "tr",
  "ug",
  "uk",
  "uz",
  "vi",
  "zh-CN",
  "zh-TW",
];
