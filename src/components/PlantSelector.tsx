import React from 'react';
import { Menu } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import { Plant } from '../types';

interface PlantSelectorProps {
  plants: Plant[];
  selectedPlant: Plant | null;
  onSelectPlant: (plant: Plant) => void;
}

export function PlantSelector({ plants, selectedPlant, onSelectPlant }: PlantSelectorProps) {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow">
        {selectedPlant?.name || 'Select Plant'}
        <ChevronDown className="w-4 h-4" />
      </Menu.Button>
      <Menu.Items className="absolute z-10 w-56 mt-2 bg-white rounded-lg shadow-lg">
        {plants.map((plant) => (
          <Menu.Item key={plant.id}>
            {({ active }) => (
              <button
                className={`${
                  active ? 'bg-blue-50' : ''
                } w-full text-left px-4 py-2 text-sm`}
                onClick={() => onSelectPlant(plant)}
              >
                {plant.name}
              </button>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}