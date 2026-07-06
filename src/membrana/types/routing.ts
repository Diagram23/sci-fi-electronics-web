export type InputId = "A" | "B" | "C" | "D";

export type RouteRow = {
  input: InputId;
  deviceId: string | null; // o nombre, según tu modelo
  channel: number;
};

export const DEFAULT_ROUTE_ROWS: RouteRow[] = [
  { input: "A", deviceId: null, channel: 1 },
  { input: "B", deviceId: null, channel: 10 },
  { input: "C", deviceId: null, channel: 1 },
  { input: "D", deviceId: null, channel: 1 },
];

export const DEFAULT_DEVICES = [
  { id: "um-one", name: "UM-ONE" },
  { id: "tr8s", name: "TR-8S" },
  { id: "digitakt", name: "Digitakt" },
];
