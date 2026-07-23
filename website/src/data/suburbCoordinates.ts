/** Approximate suburb centre coordinates for Area We Clean map pins (WGS84). */

export interface SuburbPin {
  name: string;
  groupId: string;
  lat: number;
  lng: number;
}

/** Lookup by suburb display name */
export const suburbCoordinates: Record<string, { lat: number; lng: number }> = {
  // CBD and Inner City
  'Melbourne CBD': { lat: -37.8136, lng: 144.9631 },
  Southbank: { lat: -37.8226, lng: 144.9631 },
  Docklands: { lat: -37.8149, lng: 144.9415 },
  Carlton: { lat: -37.8001, lng: 144.9671 },
  Fitzroy: { lat: -37.7984, lng: 144.9783 },
  Collingwood: { lat: -37.8022, lng: 144.9883 },
  Richmond: { lat: -37.823, lng: 144.998 },
  'South Yarra': { lat: -37.84, lng: 144.989 },
  Prahran: { lat: -37.851, lng: 144.993 },
  'St Kilda': { lat: -37.8676, lng: 144.981 },

  // Northern
  Brunswick: { lat: -37.7667, lng: 144.9628 },
  Coburg: { lat: -37.7445, lng: 144.964 },
  Preston: { lat: -37.741, lng: 145.005 },
  Thornbury: { lat: -37.755, lng: 145.005 },
  Northcote: { lat: -37.769, lng: 145.002 },
  Reservoir: { lat: -37.717, lng: 145.007 },
  Bundoora: { lat: -37.698, lng: 145.06 },
  Epping: { lat: -37.65, lng: 145.033 },
  Craigieburn: { lat: -37.6, lng: 144.941 },
  Broadmeadows: { lat: -37.68, lng: 144.92 },

  // Eastern
  Hawthorn: { lat: -37.822, lng: 145.035 },
  Camberwell: { lat: -37.835, lng: 145.072 },
  'Box Hill': { lat: -37.819, lng: 145.122 },
  Doncaster: { lat: -37.787, lng: 145.125 },
  Ringwood: { lat: -37.815, lng: 145.229 },
  Blackburn: { lat: -37.819, lng: 145.152 },
  Mitcham: { lat: -37.816, lng: 145.193 },
  Vermont: { lat: -37.836, lng: 145.196 },
  Balwyn: { lat: -37.809, lng: 145.079 },
  Kew: { lat: -37.806, lng: 145.031 },

  // South-Eastern
  Caulfield: { lat: -37.877, lng: 145.026 },
  Oakleigh: { lat: -37.899, lng: 145.089 },
  Clayton: { lat: -37.915, lng: 145.122 },
  'Glen Waverley': { lat: -37.878, lng: 145.165 },
  'Mount Waverley': { lat: -37.877, lng: 145.13 },
  Dandenong: { lat: -37.987, lng: 145.215 },
  Springvale: { lat: -37.948, lng: 145.153 },
  'Noble Park': { lat: -37.967, lng: 145.176 },
  Bentleigh: { lat: -37.921, lng: 145.036 },
  Carnegie: { lat: -37.889, lng: 145.057 },

  // Western
  Footscray: { lat: -37.799, lng: 144.9 },
  Sunshine: { lat: -37.788, lng: 144.832 },
  Williamstown: { lat: -37.861, lng: 144.895 },
  Altona: { lat: -37.868, lng: 144.83 },
  Werribee: { lat: -37.902, lng: 144.661 },
  'Point Cook': { lat: -37.914, lng: 144.751 },
  'Hoppers Crossing': { lat: -37.883, lng: 144.7 },
  'Deer Park': { lat: -37.769, lng: 144.772 },
  'St Albans': { lat: -37.745, lng: 144.8 },
  Keilor: { lat: -37.72, lng: 144.834 },

  // Bayside
  Brighton: { lat: -37.906, lng: 145.003 },
  Sandringham: { lat: -37.952, lng: 145.0 },
  Hampton: { lat: -37.938, lng: 145.002 },
  Beaumaris: { lat: -37.986, lng: 145.043 },
  'Black Rock': { lat: -37.973, lng: 145.016 },
  Mordialloc: { lat: -38.006, lng: 145.087 },
  Cheltenham: { lat: -37.967, lng: 145.055 },
  Mentone: { lat: -37.982, lng: 145.065 },
  Parkdale: { lat: -37.992, lng: 145.077 },
  Elwood: { lat: -37.883, lng: 144.984 },
};
