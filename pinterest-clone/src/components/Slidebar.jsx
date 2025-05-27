import {
  Home,
  Bell,
  Plus,
  MessageCircle,
  Settings,
} from "lucide-react";

import { FaPinterest } from 'react-icons/fa';

const navItems = [
  { icon: <Home size={28} />, label: "Inicio" },
  { icon: <Bell size={28} />, label: "Notificaciones", badge: true },
  { icon: <Plus size={28} />, label: "Crear" },
  { icon: <MessageCircle size={28} />, label: "Mensajes" },
  { icon: <Settings size={28} />, label: "Ajustes" },
];

export default function Slidebar() {
  return (
    <aside
      className="w-80 min-h-screen rounded-3xl flex flex-col
        bg-gradient-to-b from-red-50 via-red-100 to-red-200
        py-16 px-12"
      style={{
        backgroundImage:
          "radial-gradient(circle at top left, #ffe5e5, transparent 70%), radial-gradient(circle at bottom right, #f9a8d4, transparent 70%)",
      }}
    >
      {/* Logo Pinterest */}
      <div
        className="select-none cursor-pointer flex justify-center"
        style={{ marginBottom: "2rem" }}
      >
        <FaPinterest size={64} color="#E60023" className="drop-shadow-lg" />
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col">
        {navItems.map((item, index) => (
          <button
            key={index}
            className="flex items-center justify-center
              px-2 py-4
              font-semibold text-red-700 text-xl
              bg-transparent border-none
              transition-all duration-300
              hover:scale-[1.06] hover:text-red-900
              focus:outline-none focus-visible:ring-4 focus-visible:ring-red-400"
            style={{ marginBottom: "2rem" }}
          >
            {/* Icono */}
            <div
              className="flex items-center justify-center text-red-600
                rounded-full bg-white border border-white"
              style={{
                minWidth: "48px",
                minHeight: "48px",
                boxShadow: "none",
                filter: "none",
              }}
            >
              {item.icon}
              {item.badge && (
                <span
                  className="absolute -top-1 -right-2 w-8 h-8 bg-red-600 rounded-full border-4 border-white
                    animate-bounce"
                  style={{ boxShadow: "0 0 14px rgba(220,38,38,0.7)" }}
                />
              )}
            </div>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div
        className="mt-auto pt-14 text-center text-sm text-red-500 font-medium select-none cursor-default"
        style={{
          textShadow: "0 0 5px rgba(220,38,38,0.8)",
          userSelect: "none",
          transition: "color 0.3s ease",
        }}
      >
      © 2025 PINT
      </div>
    </aside>
  );
}
