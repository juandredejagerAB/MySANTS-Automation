export interface sqldata {
  studentId: string;
}

export const environmentData = {
  DEV: {
    studentId01: "3a1d225b-5263-dd8c-fddb-aa8e6f61ea2d",
    wilmoduleId01: "3a1ddb55-aef5-881f-543d-ece14543f0a7",
  },
  UAT: {
    studentId01: "3a1d2234-de05-367d-eafd-1b724d3eeab6",
    wilmoduleId01: "3a15a7be-e791-19ae-1704-fec69a52d74f",
  },
  STG: {
    studentId01: "",
    wilmoduleId01: "",
  },
  PROD: {
    studentId01: "",
    wilmoduleId01: "",
  },
} as const;
