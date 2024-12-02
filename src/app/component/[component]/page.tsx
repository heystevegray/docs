export default async function Page({ params }: { params: Promise<{ component: string }> }) {
  const searchParams = await params
  return (
    <div>
      <h1>My Page</h1>
      <p>Comopnent: {searchParams.component}</p>
    </div>
  )
}
