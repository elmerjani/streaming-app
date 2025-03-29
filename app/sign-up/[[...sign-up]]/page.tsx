'use client';
import { SignUp } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';
export default function Page() {
  const { resolvedTheme } = useTheme();
  return (
    <div className="h-full flex items-center justify-center">
      <SignUp
        appearance={{
          baseTheme: resolvedTheme === 'dark' ? dark : undefined,
        }}
      />
    </div>
  );
}
