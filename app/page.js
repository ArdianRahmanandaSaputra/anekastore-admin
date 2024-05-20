"use client"
import { useRouter } from 'next/navigation';
import Page from './login/page';

export default function Home() {
  const router = useRouter();

  return (
    <>
      {
        // router.push('/login')
        <Page />
      }
    </>
  );
}
