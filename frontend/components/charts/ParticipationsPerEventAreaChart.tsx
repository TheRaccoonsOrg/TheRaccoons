'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { getChartData } from '@/actions/admin/statistics/charts';
import { useEffect, useState } from 'react';
import { EventData } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

const chartConfig = {
  participations: {
    label: 'Participations',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

const ParticipationsPerEventAreaChart = () => {
  const [chartData, setChartData] = useState<EventData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getChartData();
      setChartData(data.participationsPerEvent);
      setIsLoading(false);
    }

    fetchData();
  }, []);
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Participations per Event</CardTitle>
          <CardDescription>Showing participations for each event</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[20rem] w-full" />
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="border-border">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b border-border py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Participations per Event</CardTitle>
          <CardDescription>Showing participations for each event</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="h-[20rem] w-full">
          <AreaChart data={chartData}>
            <Area
              dataKey={(entry) => entry.count}
              type="monotone"
              fill={chartConfig.participations.color}
              fillOpacity={0.4}
              stroke={chartConfig.participations.color}
              animationDuration={1000}
              animateNewValues={true}
              animationEasing={'ease-in-out'}
              animationBegin={0}
            />
            <CartesianGrid vertical={false} />
            <XAxis dataKey="event" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent labelFormatter={(value) => value} indicator="dot" />}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ParticipationsPerEventAreaChart;
