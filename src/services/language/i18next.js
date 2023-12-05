import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from './langsrc/en.json'
import te from './langsrc/tel.json'
import ur from './langsrc/ur.json'
import hi from './langsrc/hin.json'

export const LangResources={
    en: {translation :en},
    te: {translation :te},
    hi : {translation :hi},
    ur : {translation :ur},
}
i18next.use(initReactI18next).init({
    compatibilityJSON: 'v3', 
    lng:'en',
    fallbackLng: 'en',
    resources:LangResources,
    interpolation: {
      escapeValue: false 
    },
    react: {
      useSuspense:false,
   }
})

export default i18next;