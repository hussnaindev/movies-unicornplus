import React from 'react';
import { getPlatformLogo } from '../../utils/images';

interface StreamingPlatform {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

interface StreamingPlatformsSectionProps {
  platforms: StreamingPlatform[];
}

const StreamingPlatformsSection: React.FC<StreamingPlatformsSectionProps> = ({ platforms }) => {
  // Sort platforms by display_priority
  const sortedPlatforms = [...platforms].sort((a, b) => a.display_priority - b.display_priority);

  return (
    <div className="p-8 bg-gray-900 rounded-xl shadow-lg transform scale-100 transition-transform duration-300 ease-out">
      <h3 className="text-2xl font-semibold mb-6 text-center text-white">Available Streaming Platforms</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {sortedPlatforms.length > 0 ? (
          sortedPlatforms.map((platform) => (
            <div
              key={platform.provider_id}
              className="flex flex-col items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transform hover:scale-110 transition-transform duration-300 ease-out"
            >
              <div className="w-24 h-24 overflow-hidden flex items-center justify-center mb-4">
                <img
                  src={getPlatformLogo(platform.provider_id)}
                  alt={platform.provider_name}
                  className="w-full h-full object-contain shadow-custom transition-shadow duration-300 ease-out"
                />
              </div>
              <p className="text-sm font-medium text-center text-gray-300">{platform.provider_name}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">No streaming platforms available.</p>
        )}
      </div>
    </div>
  );
};

export default StreamingPlatformsSection;
