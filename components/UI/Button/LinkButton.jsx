import Link from 'next/link';
import React from 'react';

function LinkButton({ item }) {
  return (
    <Link href={item.link}>
      <span className="px-4 py-2 text-primary bg-transparent hover:bg-slate-100 rounded-lg hover:pl-6 cursor-pointer transition-all duration-500">
        {item.name}
      </span>
    </Link>
  );
}

export default LinkButton;
