import { useTranslation } from 'react-i18next';

export const t= (key, variables = {}) => {
  const { t } = useTranslation();
  return t(key, variables);
};