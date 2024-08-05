'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BsPeople } from 'react-icons/bs';
import { useEffect, useState } from 'react';

import { BarLoader } from 'react-spinners';
import { getParticipantStatistics } from '@/actions/admin/statistics/participants';
import { getFormStatistics } from '@/actions/admin/statistics/forms';
import { getEventAttendanceRate, getTotalEvents } from '@/actions/admin/statistics/events';
import RecentParticipants from '@/components/statistics/RecentParticipants';
import CancellationsPerEventBarChart from '@/components/charts/CancellationPerEventBarChart';
import NewParticipantsAreaChart from '@/components/charts/NewParticipantsAreaChart';
import ParticipationsPerEventAreaChart from '@/components/charts/ParticipationsPerEventAreaChart';

type Statistics = {
  totalParticipants: number;
  totalCancelledParticipation: number;
  participantChange: number;
  cancelledChange: number;
  averageParticipantsPerEvent: number;
  averageParticipantCancellationsPerEvent: number;
  totalForms: number;
  totalFormsChange: number;
  totalFormSubmissions: number;
  totalFormSubmissionsChange: number;
  totalEvents: number;
  totalEventsChange: number;
  attendanceRate: number;
};

export default function DashboardPage() {
  const [statistics, setStatistics] = useState<Statistics | null>(null);

  useEffect(() => {
    async function fetchData() {
      const participantStats = await getParticipantStatistics();
      const formStats = await getFormStatistics();
      const eventStats = await getEventAttendanceRate();
      const totalEventsStats = await getTotalEvents();
      setStatistics({ ...participantStats, ...formStats, ...eventStats, ...totalEventsStats });
    }

    fetchData();
  }, []);

  if (!statistics) {
    return (
      <div className="flex min-h-[calc(100vh-5rem)] w-full items-center justify-center">
        <BarLoader color="#36f8a7" />
      </div>
    );
  }

  const formatPercentage = (value: number): string => {
    return value > 0 ? `+${value.toFixed(2)}%` : `${value.toFixed(2)}%`;
  };

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
              <BsPeople className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics.totalParticipants}</div>
              <div className="text-sm text-gray-500">
                {formatPercentage(statistics.participantChange)} from last week
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cancelled Participation</CardTitle>
              <BsPeople className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics.totalCancelledParticipation}</div>
              <div className="text-sm text-gray-500">
                {formatPercentage(statistics.cancelledChange)} from last week
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Participants per Event</CardTitle>
              <BsPeople className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statistics.averageParticipantsPerEvent.toFixed(2)}
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Cancellations per Event</CardTitle>
              <BsPeople className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statistics.averageParticipantCancellationsPerEvent.toFixed(2)}
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Forms</CardTitle>
              <BsPeople className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics.totalForms}</div>
              <div className="text-sm text-gray-500">
                {formatPercentage(statistics.totalFormsChange)} from last week
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Form Submissions</CardTitle>
              <BsPeople className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics.totalFormSubmissions}</div>
              <div className="text-sm text-gray-500">
                {formatPercentage(statistics.totalFormSubmissionsChange)} from last week
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <BsPeople className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics.totalEvents}</div>
              <div className="text-sm text-gray-500">
                {formatPercentage(statistics.totalEventsChange)} from last year
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Event Attendance Rate</CardTitle>
              <BsPeople className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics.attendanceRate.toFixed(2)}%</div>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-7">
            <NewParticipantsAreaChart />
          </div>
          <Card className="h- col-span-12 lg:col-span-5 border-border">
            <CardHeader>
              <CardTitle>Recent Participants</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentParticipants />
            </CardContent>
          </Card>
          <div className="col-span-12 lg:col-span-6">
            <ParticipationsPerEventAreaChart />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <CancellationsPerEventBarChart />
          </div>
        </div>
      </div>
    </div>
  );
}
