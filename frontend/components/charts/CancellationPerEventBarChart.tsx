'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
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
  cancellations: {
    label: 'Cancellations',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

const CancellationsPerEventBarChart = () => {
  const [chartData, setChartData] = useState<EventData[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getChartData();
      setChartData(data.totalCancellationsPerEvent);
    }

    fetchData();
  }, []);

  const maxCount = Math.max(...chartData.map((d) => d.count));

  const yTicks = Array.from({ length: 5 }, (_, i) => Math.ceil(maxCount / 3) * i);

  return (
    <Card className="border-border">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b border-border py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Total Cancellations per Event</CardTitle>
          <CardDescription>Showing cancellations for each event</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-4 pt-6 sm:px-8 sm:pt-8">
        <ChartContainer config={chartConfig} className="aspect-auto h-[300px] w-full">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="event" tickLine={false} axisLine={false} tickMargin={10} />
            <YAxis domain={[0, Math.max(maxCount, yTicks[yTicks.length - 1])]} ticks={yTicks} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="count" fill="var(--color-cancellations)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default CancellationsPerEventBarChart;
