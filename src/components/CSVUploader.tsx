import React, { useState } from 'react';
import { Upload } from 'lucide-react';

interface CSVUploaderProps {
  onUpload: (data: { serialNumber: string; link: string }[]) => void;
}

const CSVUploader: React.FC<CSVUploaderProps> = ({ onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const csv = event.target?.result as string;
      const lines = csv.split('\n');
      const data = lines
        .filter(line => line.trim() !== '') // Remove empty lines
        .slice(1) // Remove header row
        .map(line => {
          const [serialNumber, link] = line.split(',').map(item => item.trim());
          return { serialNumber, link };
        })
        .filter(entry => entry.serialNumber && entry.link);

      if (data.length === 0) {
        setError('No valid data found in the CSV file. Please check the file format.');
      } else {
        setError(null);
        onUpload(data);
      }
    };
    reader.onerror = () => {
      setError('Error reading the file. Please try again.');
    };
    reader.readAsText(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'text/csv') {
      handleFileUpload(file);
    } else {
      setError('Please upload a valid CSV file.');
    }
  };

  return (
    <div>
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Drag and drop a CSV file here, or click to select a file
        </p>
        <input
          type="file"
          accept=".csv"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              handleFileUpload(file);
            }
          }}
          id="csv-upload"
        />
        <label
          htmlFor="csv-upload"
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
        >
          Select CSV File
        </label>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default CSVUploader;