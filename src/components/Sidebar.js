import Link from 'next/link';
import { Home, Trello, Settings } from 'lucide-react';

export default function Sidebar() {
  return (
    <nav className="bg-gray-800 text-white w-64 p-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold">CRM Menu</h2>
      </div>
      <ul className="space-y-2 flex-grow">
        <li>
          <Link href="/" className="flex items-center p-2 hover:bg-gray-700 rounded">
            <Home size={20} className="mr-2" />
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/kanban" className="flex items-center p-2 hover:bg-gray-700 rounded">
            <Trello size={20} className="mr-2" />
            Kanban
          </Link>
        </li>
        <li>
          <Link href="/settings" className="flex items-center p-2 hover:bg-gray-700 rounded">
            <Settings size={20} className="mr-2" />
            Configurações
          </Link>
        </li>
      </ul>
    </nav>
  );
}