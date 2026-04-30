export type ScreenMode = 'desktop' | 'tablet' | 'mobile';

export const Status = {
  Idle: 'idle',
  Loading: 'loading',
  Ok: 'ok',
  Error: 'error',
} as const;

export type Status = (typeof Status)[keyof typeof Status];

export interface ISection {
  marginTop?: [number, number, number];
}

export interface LinkType {
  text: string;
  to: string;
}

export interface DefaultInitialState<T = object> {
  lastUpdatedTime: string | null;
  data: T;
  status: Status;
}

export interface Link {
  text: string;
  to: string;
}
