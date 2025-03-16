export const LOCATIONS = {
  HCMC: {
    name: 'Ho Chi Minh City',
    center: [10.7769, 106.7009] as [number, number],
    markers: [
      {
        position: [10.7769, 106.7009] as [number, number],
        radius: 6000,
        color: '#008080',
        name: 'HCMC Hunt Area',
        description: 'Find treasures in this exciting urban adventure!',
      },
    ],
  },
  DANANG: {
    name: 'Da Nang',
    center: [16.0712, 108.2336] as [number, number],
    markers: [
      {
        position: [16.0712, 108.2336] as [number, number],
        radius: 5000,
        color: '#FF8C00',
        name: 'Da Nang Hunt Area',
        description: 'Beach and mountain treasures await explorers!',
      },
    ],
  },
  HANOI: {
    name: 'Hanoi',
    center: [21.0285, 105.8542] as [number, number],
    markers: [
      {
        position: [21.0285, 105.8542] as [number, number],
        radius: 5500,
        color: '#9370DB',
        name: 'Hanoi Hunt Area',
        description: 'Historic treasures hidden throughout the city!',
      },
    ],
  },
};
