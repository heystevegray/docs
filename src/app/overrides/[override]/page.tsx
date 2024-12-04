export default async function Page({ params }: { params: Promise<{ override: string }> }) {
  const searchParams = await params
  return (
    <div>
      <h1>My Page</h1>
      <p>Override: {searchParams.override}</p>
    </div>
  )
}
