import { SignInButton, SignUpButton } from '@clerk/nextjs';
import Search from './Search';

export default async function Navbar(props:{
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <nav className="fixed top-0 w-full h-20 z-[49] bg-[#252731] px-2 lg:px-4 flex justify-between items-center shadow-sm">
      <Search placeholder='Search' ></Search>

      <SignInButton></SignInButton>
      <SignUpButton></SignUpButton>
    </nav>
  );
}
