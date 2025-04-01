'use client';
import queryString from 'query-string';
import { SearchIcon, X } from 'lucide-react';
// import { useRouter } from 'next/navigation';
import { Input } from './input';
import { Button } from './button';
import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';


// export default function Search() {
//   const router = useRouter();
//   const [value, setValue] = useState('');
//   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!value) return;
//     const url = queryString.stringifyUrl(
//       {
//         url: '/',
//         query: { term: value },
//       },
//       { skipEmptyString: true }
//     );
//     router.push(url);
//   };
//   return (
//     <form
//       className="relative w-full lg:w-[400px] flex items-center"
//       onSubmit={() => {}}
//     >
//       <Input
//         placeholder="Search"
//         className="rounded-r-none focus-visible:ring-0 
//       focus-visible:ring-transparent focus-visible:ring-offset-0"
//       />
//       <Button
//         type="submit"
//         size="sm"
//         variant="secondary"
//         className="rounded-l-none"
//       >
//         <SearchIcon className="h-5 w-5 text-muted-foreground"></SearchIcon>
//       </Button>
//     </form>
//   );
// }
export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((term: string) => {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);

    params.set('page', '1');

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
