import { Link } from 'react-router-dom';

export default function TestRoute() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Route Test</h1>
      <Link 
        to="/tools/pdf-to-word" 
        className="text-blue-600 hover:underline"
      >
        Test Link to PDF Tool
      </Link>
      <br />
      <Link 
        to="/" 
        className="text-blue-600 hover:underline"
      >
        Back to Home
      </Link>
    </div>
  );
}