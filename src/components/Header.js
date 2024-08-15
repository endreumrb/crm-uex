import { Bell, LogOut } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Sistema UEX</h1>
      <div className="flex items-center">
        <button className="mr-4 hover:text-blue-200">
          <Bell size={20} />
        </button>
        <div className="mr-4">Endreu Benites</div>
        <button className="hover:text-blue-200">
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}