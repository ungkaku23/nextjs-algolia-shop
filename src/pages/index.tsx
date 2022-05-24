import Head from 'next/head';

export default function Home() {
  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900">
      <div className="container md:layout-px-1 lg:layout-px-2 xl:layout-px-3">
        <div className="row g-0">
          <div className="sm:col-12 md:col-4">sm:col-4</div>
          <div className="sm:col-12 md:col-8">col-8</div>
        </div>
      </div>
    </div>
  )
}

