import {
  HomeIcon,
  SparklesIcon,
  PlusCircleIcon,
  BellIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const menuItems = [
  { icon: HomeIcon },
  { icon: SparklesIcon },
  { icon: PlusCircleIcon },
  { icon: BellIcon },
  { icon: ChatBubbleLeftEllipsisIcon },
];

export default function Slidebar() {
  return (
    <aside className="w-32 h-screen bg-white shadow-md flex flex-col justify-between items-center py-8">
      {/* Parte superior con logo e íconos */}
      <div className="flex flex-col items-center space-y-10">
        <img src="./public/pinterest-logo.svg" alt="Pinterest Logo" className="h-32 w-32" />
        {menuItems.map(({ icon: Icon }, index) => (
          <button
            key={index}
            className="p-4 rounded-full hover:bg-red-100 transition"
          >
            <Icon className="h-32 w-32 text-gray-800 hover:text-red-600" />
          </button>
        ))}
      </div>

      {/* Icono de configuración abajo */}
      <div>
        <button className="p-4 rounded-full hover:bg-red-100 transition">
          <Cog6ToothIcon className="h-16 w-16 text-gray-800 hover:text-red-600" />
        </button>
      </div>
    </aside>
  );
}
