'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getChartData } from '@/actions/admin/statistics/charts';
import { useEffect, useState } from 'react';
import { ParticipantData } from '@/types';

const chartConfig = {
  participants: {
    label: 'Participants',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

const NewParticipantsAreaChart = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [chartData, setChartData] = useState<ParticipantData[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getChartData();
      setChartData(data.newParticipantsByDays);
    }

    fetchData();
  }, [timeRange]);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const now = new Date();
    let daysToSubtract = 30;
    if (timeRange === '7d') {
      daysToSubtract = 7;
    }
    now.setDate(now.getDate() - daysToSubtract);
    return date >= now;
  });

  const maxCount = Math.max(...filteredData.map((d) => d.count));

  const yTicks = Array.from({ length: 4 }, (_, i) => Math.ceil(maxCount / 3) * i);

  return (
    <Card className="border-border">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row border-border">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>New Participants</CardTitle>
          <CardDescription>Showing new participants for the selected period</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[160px] rounded-lg sm:ml-auto" aria-label="Select a value">
            <SelectValue placeholder="Last 30 days" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-4 pt-6 sm:px-8 sm:pt-8">
        <ChartContainer config={chartConfig} className="aspect-auto h-[300px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillParticipants" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-participants)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-participants)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                });
              }}
            />
            <YAxis domain={[0, Math.max(maxCount, yTicks[yTicks.length - 1])]} ticks={yTicks} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="count"
              type="natural"
              fill="url(#fillParticipants)"
              stroke="var(--color-participants)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default NewParticipantsAreaChart;
