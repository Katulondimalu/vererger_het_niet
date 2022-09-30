import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

const LanguageView = () => {
  const language = 'nl';
  let { kist_naam } = useParams();
  return <Navigate to={`/${kist_naam}/${language}/game`} />;
};

export default LanguageView;
