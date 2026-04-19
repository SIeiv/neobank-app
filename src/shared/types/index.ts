export type ScreenMode = 'desktop' | 'tablet' | 'mobile';

export type Status = 'idle' | 'loading' | 'ok' | 'error';

export interface ISection {
  marginTop?: [number, number, number];
}

export interface LinkType {
  text: string;
  to: string;
}

export interface INews {
  img: string;
  title: string;
  text: string;
}
