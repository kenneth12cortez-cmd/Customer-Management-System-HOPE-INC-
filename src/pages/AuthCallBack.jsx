export default function AuthCallback() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
      <h2 className="text-xl font-semibold text-gray-700">Verifying session...</h2>
      <p className="text-gray-500">Please wait while we log you in.</p>
    </div>
  );
}
