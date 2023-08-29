import { exerciseNames } from "../../availableExercises";
import { TTrainCreate } from "../../interfaces/train.interface";

export const mockTrainACreateData: TTrainCreate = {
  exercises: [
    {
      id: "654564-51151-saoidjasidj-5611",
      effort: 5,
      link: "http://dasduasdjasd.unsplash.com",
      load: 120,
      name: exerciseNames[0],
      reps: 15,
      series: 3,
      rest: 90,
    },
    {
      id: "saoidjasidj-5611-654564-51151",
      effort: 3,
      link: "http://dasduasdjasd.unsplash.com",
      load: 75,
      name: exerciseNames[1],
      series: 3,
      reps: 12,
      rest: 60,
    },
    {
      id: "5611-saoidjasidj-654564-51151",
      effort: 5,
      link: "http://dasduasdjasd.unsplash.com",
      load: 42,
      name: exerciseNames[2],
      reps: 10,
      series: 4,
      rest: 90,
    },
  ],
  name: "Leg Day",
  status: true,
};

export const mockTrainAUpdated: TTrainCreate = {
  exercises: [
    {
      id: "654564-51151-saoidjasidj-5611",
      effort: 5,
      link: "http://dasduasdjasd.unsplash.com",
      load: 120,
      name: exerciseNames[9],
      reps: 15,
      series: 3,
      rest: 90,
    },
    {
      id: "saoidjasidj-5611-654564-51151",
      effort: 3,
      link: "http://dasduasdjasd.unsplash.com",
      load: 75,
      name: exerciseNames[1],
      series: 3,
      reps: 12,
      rest: 60,
    },
    {
      id: "5611-saoidjasidj-654564-51151",
      effort: 5,
      link: "http://dasduasdjasd.unsplash.com",
      load: 42,
      name: exerciseNames[2],
      reps: 10,
      series: 4,
      rest: 90,
    },
  ],
  name: "Leg Day",
  status: true,
};

export const mockTrainBCreateData: TTrainCreate = {
  exercises: [
    {
      id: "654564-51151-saoidjasidj-5611",
      effort: 5,
      link: "http://dasduasdjasd.unsplash.com",
      load: 120,
      name: exerciseNames[3],
      reps: 15,
      series: 3,
      rest: 90,
    },
    {
      id: "saoidjasidj-5611-654564-51151",
      effort: 3,
      link: "http://dasduasdjasd.unsplash.com",
      load: 75,
      name: exerciseNames[4],
      series: 3,
      reps: 12,
      rest: 60,
    },
    {
      id: "5611-saoidjasidj-654564-51151",
      effort: 5,
      link: "http://dasduasdjasd.unsplash.com",
      load: 42,
      name: exerciseNames[5],
      reps: 10,
      series: 4,
      rest: 90,
    },
  ],
  name: "Chest Day",
  status: true,
};
export const mockTrainCCreateData: TTrainCreate = {
  exercises: [
    {
      id: "654564-51151-saoidjasidj-5611",
      effort: 5,
      link: "http://dasduasdjasd.unsplash.com",
      load: 120,
      name: exerciseNames[6],
      reps: 15,
      series: 3,
      rest: 90,
    },
    {
      id: "saoidjasidj-5611-654564-51151",
      effort: 3,
      link: "http://dasduasdjasd.unsplash.com",
      load: 75,
      name: exerciseNames[7],
      series: 3,
      reps: 12,
      rest: 60,
    },
    {
      id: "5611-saoidjasidj-654564-51151",
      effort: 5,
      link: "http://dasduasdjasd.unsplash.com",
      load: 42,
      name: exerciseNames[8],
      reps: 10,
      series: 4,
      rest: 90,
    },
  ],
  name: "Core Day",
  status: true,
};

export const mockedPlan = [mockTrainACreateData, mockTrainBCreateData, mockTrainCCreateData]
export const mockedUpdatedPlan = [mockTrainAUpdated, mockTrainBCreateData, mockTrainCCreateData]
