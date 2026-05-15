import { Link } from "react-router-dom";


export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <input type="text" placeholder="First Name" className="w-full p-2 border rounded" required />
            <input type="text" placeholder="Last Name" className="w-full p-2 border rounded" required />
          </div>
          <input type="text" placeholder="Username" className="w-full p-2 border rounded" required />
          <input type="email" placeholder="Email" className="w-full p-2 border rounded" required />
          <input type="password" placeholder="Password" className="w-full p-2 border rounded" required />
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Sign Up
          </button>
        </form>
        <div className="mt-4">
          <button className="w-full border p-2 rounded flex items-center justify-center gap-2 hover:bg-gray-50">
            Register with Google
          </button>
        </div>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </div>
    </div>
  );
}

