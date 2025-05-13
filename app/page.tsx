import StartLiveButton from '@/components/ui/StartLive';
import { UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <div className="flex flex-col gap-y-4">
      <h1>Dashboard</h1>
      <UserButton afterSwitchSessionUrl="/"></UserButton>
      <StartLiveButton></StartLiveButton>
    </div>
  );
}
