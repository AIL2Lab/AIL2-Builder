/**
 * 简化版 IaoPool 组件 - 根据状态渲染不同阶段
 */

import React, { useMemo } from 'react';
import { Card } from "@/components/ui/card";
import { useTranslations } from 'next-intl';

import { IaoBeforeView } from './IaoBeforeView';
import { IaoActiveView } from './IaoActiveView';
import { IaoEndedView } from './IaoEndedView';
import type { LocalModel } from "@/types/model";

interface IaoPoolProps {
  modelData: LocalModel;
}

const IaoPool = React.memo(({ modelData }: IaoPoolProps) => {
  const t = useTranslations('iaoPool');
  console.log("IaoPool _ modelData", modelData);

  // 判断 IAO 阶段
  const iaoPhase = useMemo((): 'before' | 'active' | 'ended' => {
    // 如果没有 IAO 数据，返回 before
    if (!modelData.iaos || modelData.iaos.length === 0) {
      return 'before';
    }

    const iao = modelData.iaos[0];
    
    // 如果没有时间信息，返回 before
    if (!iao.iaoStartTime || !iao.iaoEndTime) {
      return 'before';
    }

    const now = Date.now();
    const startTime = new Date(iao.iaoStartTime).getTime();
    const endTime = new Date(iao.iaoEndTime).getTime();
    
    // 根据时间判断阶段
    if (now < startTime) {
      return 'before';
    } else if (now >= startTime && now < endTime) {
      return 'active';
    } else {
      return 'ended';
    }
  }, [modelData.iaos]);

  // 渲染对应阶段的视图
  const renderPhaseView = () => {
    switch (iaoPhase) {
      case 'before':
        return <IaoBeforeView modelData={modelData} />;
      case 'active':
        return <IaoActiveView modelData={modelData} />;
      case 'ended':
        return <IaoEndedView modelData={modelData} />;
      default:
        return <div className="text-center py-8">{t('loading')}</div>;
    }
  };

  return (
    <Card className="p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">
        {iaoPhase === 'before' && t('iaoBeforeTitle')}
        {iaoPhase === 'active' && t('iaoActiveTitle')}
        {iaoPhase === 'ended' && t('iaoEndedTitle')}
      </h2>
      {renderPhaseView()}
    </Card>
  );
});

IaoPool.displayName = 'IaoPool';

export default IaoPool;
