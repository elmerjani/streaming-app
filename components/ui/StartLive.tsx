'use client';

import { Button } from './button';
import { useRouter } from 'next/navigation';
import { nanoid } from 'nanoid';
import { useUser } from '@clerk/nextjs';

export default function StartLiveButton() {
  const router = useRouter();
  const { user } = useUser();

  const handleClick = async () => {
    const roomId = nanoid(8);

    const username = user?.username || user?.id; // fallback if username not set

    if (!username) {
      alert('User not signed in.');
      return;
    }

    router.push(`/rooms/${roomId}`);
  };

  return <Button onClick={handleClick}>Go live</Button>;
}
