import {
  setRandomTeams,
  checkTeamsLength,
  removeFromTeam,
  setTeam,
} from "../playerSelectionCode";
import React from "react";

const players = [
  {
    createdAt: "2022-08-08T17:09:15.905Z",
    email: "dog@three.com",
    firstName: "Dog",
    image: "1659978551843dogOne.jpeg",
    lastName: "Three",
    lastPlayed: "2022-08-21T18:58:43.846Z",
    loses: 0,
    percentage: 1,
    updatedAt: "2022-08-21T18:58:43.996Z",
    wins: 2,
  },
  {
    createdAt: "2022-07-22T15:22:53.317Z",
    email: "Betty@Lounging.com",
    firstName: "Betty",
    image: "1660000297861IMG_4525.jpeg",
    lastName: "Lounging2",
    lastPlayed: "2022-08-21T19:02:40.819Z",
    loses: 3,
    percentage: 0.625,
    updatedAt: "2022-08-21T19:02:40.984Z",
    wins: 5,
  },
  {
    createdAt: "2022-07-14T23:21:59.665Z",
    email: "frenchie2@cuddles.com",
    firstName: "Frenchie",
    image: "1657840905574dogFour.jpeg",
    lastName: "Lovescuddles",
    lastPlayed: "2022-08-21T18:58:43.849Z",
    loses: 9,
    percentage: 0.4,
    updatedAt: "2022-08-21T18:58:44.002Z",
    wins: 6,
  },
  {
    createdAt: "2022-07-22T15:16:45.294Z",
    email: "Betty@sit.com",
    firstName: "Betty",
    image: "1658503256619IMG_4519.jpeg",
    lastName: "Sit",
    lastPlayed: "2022-08-21T18:58:43.849Z",
    loses: 6,
    percentage: 0.45454545454545453,
    updatedAt: "2022-08-21T18:58:43.899Z",
    wins: 5,
  },
];

describe("Check Team Length Ok To Add More Users", () => {
  describe("Check Team Length", () => {
    it("should return true because team array is half the size of players allowed", () => {
      expect(checkTeamsLength([1, 2], 4)).toEqual(true);
    });
    it("should return false because is empty", () => {
      expect(checkTeamsLength([], 4)).toEqual(false);
    });
    // it("should rdoes ", () => {
    //    const setState = jest.fn();
    //    const useStateSpy = jest.spyOn(React, "useState");

    //    useStateSpy.mockImplementation((init) => [init, setState]);

    //    const [firstTeam, setFirstTeam] = React.useState([]);
    //    const [secondTeam, setSecondTeam] = React.useState([]);
    //    setRandomTeams(players, "4", [], setFirstTeam, setSecondTeam);
    //    expect(firstTeam.length).toEqual(2);
    //    expect(secondTeam.length).toEqual(2);
    // });
  });
});


