export interface Event {
  id: number;
  year: string;
  text: string;
}

export interface DateSlide {
  id: number;
  dateStart: number;
  dateEnd: number;
  category: string;
  events: Events;
}

export type DateMap = DateSlide[];

export type Events = Event[];
