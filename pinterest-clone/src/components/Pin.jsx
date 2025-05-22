export default function Pin({ pin }) {
  return (
    <div className="rounded overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300">
      <img
        src={pin.src}
        alt={pin.alt}
        className="w-full object-cover rounded"
        loading="lazy"
      />
      <div className="p-2 bg-white">
        <p className="text-sm text-gray-700 font-semibold">{pin.title}</p>
      </div>
    </div>
  );
}
