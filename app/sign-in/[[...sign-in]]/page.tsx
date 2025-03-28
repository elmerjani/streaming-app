'use client'
import { SignIn } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';
export default function Page() {
  const {resolvedTheme} = useTheme();
  return (
    <div className="h-full flex items-center justify-center">
      <SignIn appearance={{
        baseTheme: resolvedTheme === 'dark' ? dark : undefined,
      }}/>
    </div>
  );
}
