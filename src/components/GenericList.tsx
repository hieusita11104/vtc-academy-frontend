import React from "react";

interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

const GenericList = <T,>({ items, renderItem }: ListProps<T>) => {
  return (
    <ul className="border p-4 rounded-lg shadow-lg w-80 bg-white">
      {items.map((item, index) => (
        <li key={index} className="p-2 border-b last:border-0">
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
};

export default GenericList;
