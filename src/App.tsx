import React, { useState } from 'react';
import { Upload, List, ExternalLink } from 'lucide-react';
import CSVUploader from './components/CSVUploader';
import SerialNumberList from './components/SerialNumberList';

interface SerialNumberEntry {
  serialNumber: string;
  link: string;
}

function App() {
  const [entries, setEntries] = useState<SerialNumberEntry[]>([]);

  const handleCSVUpload = (data: SerialNumberEntry[]) => {
    setEntries(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Serial Number and Link Logger
        </h1>
        <CSVUploader onUpload={handleCSVUpload} />
        <SerialNumberList entries={entries} />
      </div>
    </div>
  );
}

export default App;