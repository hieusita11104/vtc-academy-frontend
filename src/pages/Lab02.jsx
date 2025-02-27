import React from "react";

const songs = [
  { id: 1, name: "My Tam", genre: "Music", image: "https://via.placeholder.com/50" },
  { id: 2, name: "Ho Ngoc Ha", genre: "Music", image: "https://via.placeholder.com/50" },
  { id: 3, name: "Quang Hung MasterD", genre: "Music", image: "https://via.placeholder.com/50" },
  { id: 4, name: "Son Tung MTP", genre: "Music", image: "https://via.placeholder.com/50" },
  { id: 5, name: "Duc Phuc", genre: "Music", image: "https://via.placeholder.com/50" },
  { id: 6, name: "Justin Bieber", genre: "Music", image: "https://via.placeholder.com/50" },
];

export default function MusicPlayer() {
  return (
    <div className="max-w-2xl mx-auto p-5 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-blue-600 mb-5">🎶 Lab 02: Music Player</h1>
      <h2 className="text-xl font-bold mb-4">🎵 Popular Songs</h2>
      <ul className="divide-y divide-gray-300">
        {songs.map((song, index) => (
          <li key={song.id} className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <span className="text-gray-500 font-semibold w-6">{String(index + 1).padStart(2, '0')}</span>
              <img
                src={song.image}
                alt={song.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-900">{song.name}</p>
                <p className="text-gray-500 text-sm">{song.genre}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <button className="hover:text-red-500">❤️</button>
              <button className="hover:text-blue-500">▶️</button>
              <button className="hover:text-gray-700">⋮</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
