'use client';

import React, { useEffect, useState } from 'react';
import TokenInfo from './TokenInfo';
import IaoPool from './IaoPool/IaoPool';
import { KLineChart } from './KLineChart';

interface ModelDetailProps {
  id: string;
  locale: string;
}

const ModelDetail: React.FC<ModelDetailProps> = ({ id, locale }) => {
  const [modelData, setModelData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const response = await fetch(`/api/model?id=${id}`);
        const result = await response.json();

        if (result.success) {
          setModelData(result.data);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError('Failed to fetch model data');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchModel();
    }
  }, [id]);

  const handleRefreshAgent = async () => {
    try {
      const response = await fetch(`/api/model?id=${id}`);
      const result = await response.json();
      if (result.success) {
        setModelData(result.data);
      }
    } catch (err) {
      console.error('Failed to refresh model data', err);
    }
  };

  if (loading) {
    return <div className="text-white text-center py-10">Loading...</div>;
  }

  if (error || !modelData) {
    return <div className="text-red-500 text-center py-10">{error || 'Model not found'}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <TokenInfo data={modelData} />
      <KLineChart
        tokenAddress={modelData?.tokenAddress}
        liquidityPoolAddress={modelData?.liquidityPoolAddress}
        chainId={modelData?.chainId || 56}
        height={600}
        className="border border-border/50"
      />


      <IaoPool
        modelData={modelData}
      />
    </div>
  );
};

export default ModelDetail;
