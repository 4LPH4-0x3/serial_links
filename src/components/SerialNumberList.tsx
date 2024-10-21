import React from 'react';
import { List, ExternalLink } from 'lucide-react';

interface SerialNumberEntry {
  serialNumber: string;
  link: string;
}

interface SerialNumberListProps {
  entries: SerialNumberEntry[];
}

const SerialNumberList: React.FC<SerialNumberListProps> = ({ entries }) => {
  if (entries.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <List className="mr-2" /> Logged Serial Numbers
      </h2>
      <ul className="bg-white shadow overflow-hidden sm:rounded-md">
        {entries.map((entry, index) => (
          <li key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-blue-600 truncate">
                  {entry.serialNumber}
                </p>
                <div className="ml-2 flex-shrink-0 flex">
                  <a
                    href={entry.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 hover:bg-green-200"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" /> Link
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SerialNumberList;