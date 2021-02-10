import { useEffect, useState } from "react";

export const useLocale = () => {
    // set from user settings later
    const defaultLocale = null;

    const [locale, setLocale] = useState(defaultLocale);

    useEffect(() => {
        // if there is no locale set, get the users default locale
        if (!locale) {
            import("get-user-locale")
              .then(({ getUserLocale }) => getUserLocale())
              .then((userLocale) => import(`date-fns/locale/${userLocale}`))
              .then(({ default: locale }) => setLocale(locale));
        }
    });

    return [locale];
};
