import Link from 'next/link';

export default function NotFound() {
  return (
    <main>
      <h1>페이지를 찾을 수 없습니다</h1>
      <p>요청하신 페이지가 존재하지 않습니다.</p>
      <Link href="/">홈으로</Link>
    </main>
  );
}
