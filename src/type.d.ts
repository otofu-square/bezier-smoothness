export type Point = [number, number];
export type PointName = 'p0' | 'c0' | 'c1' | 'p1';
export type BezierPoints = Record<PointName, Point>;
export type Bezier = {
  points: BezierPoints;
  t: number;
};

export type VisibilitiesKey = 'tangent' | 'normal' | 'osculatingCircle';

export type State = {
  beziers: [Bezier, Bezier];
  draggingPoint: {
    index: 0 | 1;
    name: PointName;
  } | null;
  visibilities: Record<VisibilitiesKey, boolean>;
};

export type Action =
  | {
      type: 'DRAG_START';
      payload: { index: 0 | 1; name: PointName };
    }
  | {
      type: 'DRAG';
      payload: Point;
    }
  | {
      type: 'DRAG_END';
    }
  | {
      type: 'SET_T';
      payload: { index: 0 | 1; value: number };
    }
  | {
      type: 'SET_VISIBILITY';
      payload: { key: VisibilitiesKey; value: boolean };
    };
