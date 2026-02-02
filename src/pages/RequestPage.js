import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import RequestFormSection from '../components/sections/RequestFormSection/RequestFormSection';

const RequestPage = () => {
  const [searchParams] = useSearchParams();

  const calculatorSummary = useMemo(() => {
    const from = searchParams.get('from');
    const summary = searchParams.get('summary');
    if (from === 'calculator' && summary) {
      return decodeURIComponent(summary);
    }
    return null;
  }, [searchParams]);

  return (
    <div className="request-page">
      <RequestFormSection calculatorSummary={calculatorSummary} />
    </div>
  );
};

export default RequestPage;
