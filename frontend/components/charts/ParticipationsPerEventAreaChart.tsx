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

const chartConfig = {
  participations: {
    label: 'Participations',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

const ParticipationsPerEventAreaChart = () => {
  const [chartData, setChartData] = useState<EventData[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getChartData();
      setChartData(data.participationsPerEvent);
    }

    fetchData();
  }, []);

  return (
    <Card className="border-border">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b border-border py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Participations per Event</CardTitle>
          <CardDescription>Showing participations for each event</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillParticipations" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-participations)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-participations)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="event" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent labelFormatter={(value) => value} indicator="dot" />}
            />
            <Area
              dataKey="count"
              type="natural"
              fill="url(#fillParticipations)"
              stroke="var(--color-participations)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ParticipationsPerEventAreaChart;
