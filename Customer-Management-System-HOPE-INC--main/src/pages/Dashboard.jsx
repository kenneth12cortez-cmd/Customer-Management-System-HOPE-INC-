export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-blue-600">
          Tailwind is Working!
        </h1>
        <p className="mt-4 text-gray-600">
          If this text is blue and inside a white box with a shadow, the scaffold is perfect.
        </p>
        <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Project Lead Test Button
        </button>
      </div>
    </div>
  )
}