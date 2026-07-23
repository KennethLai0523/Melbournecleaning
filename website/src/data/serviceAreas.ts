import { suburbCoordinates, type SuburbPin } from './suburbCoordinates';

export interface ServiceAreaGroup {
  id: string;
  name: string;
  suburbs: string[];
}

export const serviceAreas: ServiceAreaGroup[] = [
  {
    id: 'cbd-inner',
    name: 'Melbourne CBD and Inner City',
    suburbs: [
      'Melbourne CBD',
      'Southbank',
      'Docklands',
      'Carlton',
      'Fitzroy',
      'Collingwood',
      'Richmond',
      'South Yarra',
      'Prahran',
      'St Kilda',
    ],
  },
  {
    id: 'northern',
    name: 'Northern Suburbs',
    suburbs: [
      'Brunswick',
      'Coburg',
      'Preston',
      'Thornbury',
      'Northcote',
      'Reservoir',
      'Bundoora',
      'Epping',
      'Craigieburn',
      'Broadmeadows',
    ],
  },
  {
    id: 'eastern',
    name: 'Eastern Suburbs',
    suburbs: [
      'Hawthorn',
      'Camberwell',
      'Box Hill',
      'Doncaster',
      'Ringwood',
      'Blackburn',
      'Mitcham',
      'Vermont',
      'Balwyn',
      'Kew',
    ],
  },
  {
    id: 'south-eastern',
    name: 'South-Eastern Suburbs',
    suburbs: [
      'Caulfield',
      'Oakleigh',
      'Clayton',
      'Glen Waverley',
      'Mount Waverley',
      'Dandenong',
      'Springvale',
      'Noble Park',
      'Bentleigh',
      'Carnegie',
    ],
  },
  {
    id: 'western',
    name: 'Western Suburbs',
    suburbs: [
      'Footscray',
      'Sunshine',
      'Williamstown',
      'Altona',
      'Werribee',
      'Point Cook',
      'Hoppers Crossing',
      'Deer Park',
      'St Albans',
      'Keilor',
    ],
  },
  {
    id: 'bayside',
    name: 'Bayside Areas',
    suburbs: [
      'Brighton',
      'Sandringham',
      'Hampton',
      'Beaumaris',
      'Black Rock',
      'Mordialloc',
      'Cheltenham',
      'Mentone',
      'Parkdale',
      'Elwood',
    ],
  },
];

export const serviceAreaDisclaimer =
  'Service availability may vary depending on the location, cleaning type and requested appointment time. Contact our team to confirm availability.';

/** Flat list of map pins for every listed suburb */
export function getServiceAreaPins(): SuburbPin[] {
  const pins: SuburbPin[] = [];
  for (const group of serviceAreas) {
    for (const name of group.suburbs) {
      const coords = suburbCoordinates[name];
      if (!coords) continue;
      pins.push({ name, groupId: group.id, lat: coords.lat, lng: coords.lng });
    }
  }
  return pins;
}
