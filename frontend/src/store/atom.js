import { atom } from 'recoil';

export const areaState = atom({
    key: 'areaState',
    default: '노량진',
  });

export const fishDataState = atom({
    key: 'fishDataState',
    default: [
        {
          id: "1",
          heading: ["광어"],
          details: ["10000"],
          total: ["10000"]
        },
        {
          id: "2",
          heading: ["광어", "우럭"],
          details: ["10000" , "20000"],
          total: ["30000"]
        },
        {
          id: "3",
          heading: ["광어", "우럭", "참돔", "우럭", "참돔", "우럭", "참돔"],
          details: ["10000" , "20000", "30000", "20000", "30000", "20000", "30000"],
          total: ["160000"]
        },
        {
          id: "4",
          heading: ["광어", "참돔"],
          details: ["10000" , "30000"],
          total: ["40000"]
        }
      ],
});