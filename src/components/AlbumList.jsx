import React from "react";

const albums = [
  { id: 1, title: "Ngày Hạnh Phúc", image: "/assets/myTam.jpg", description: "Hạnh phúc trong tình yêu là được bên nhau mỗi ngày" },
  { id: 2, title: "Nhạc Giải Stress", image: "/assets/hoNgocHa.jpg", description: "Dễ dàng xua tan căng thẳng với âm nhạc giải stress" },
  { id: 3, title: "V-Pop Tươi Vui", image: "/assets/quangHung.jpg", description: "Bắt tinh thần lên và giai điệu V-Pop làm bạn vui tươi cả ngày" },
  { id: 4, title: "Nhạc Chữa Buồn", image: "/assets/ducPhuc.jpg", description: "Nhẹ nhàng chữa lành trái tim bằng giai điệu tích cực" },
  { id: 5, title: "Đi Làm Vì Đam Mê", image: "/assets/justin.jpg", description: "Đam mê là chính, deadline là phụ" },
  { id: 6, title: "Nhạc Trẻ Remix", image: "/assets/sonTung.jpg", description: "Châu Khải Phong, Phan Duy Anh, Thương Vô..." },
];


export default function AlbumList() {
  return (
    <div className="max-w-6xl mx-auto p-5">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">🎶 Popular Albums</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {albums.map((album) => (
          <div key={album.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={album.image} alt={album.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{album.title}</h3>
              <p className="text-sm text-gray-600">{album.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
