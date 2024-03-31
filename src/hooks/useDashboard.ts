import { create } from 'zustand';

// import { MS_API_URL } from '../api';
import { WidgetConfig } from '../components/widgets';

export type Layout = {
  w: number;
  h: number;
  x: number;
  y: number;
  i: string;
  minW?: number;
  maxW?: number;
  minH?: number;
  maxH?: number;
  moved: boolean;
  static: boolean;
}[];

interface IState {
  layout: Layout;
  widgets: WidgetConfig[];
  dashboard_id: string | null;
}
interface IStateActions {
  setDashboard: (
    layout: Layout,
    widgets: WidgetConfig[],
    dashboard_id: string
  ) => void;
  clearDashboard: () => void;
  setLayout: (layout: Layout) => void;
  setWidgets: (widgets: WidgetConfig[]) => void;
}

const useDashboard = create<IState & IStateActions>((set) => ({
  layout: [
    {
      w: 4,
      h: 8,
      x: 0,
      y: 0,
      i: "a",
      moved: false,
      static: false,
    },
    {
      w: 4,
      h: 8,
      x: 0,
      y: 12.5,
      i: "b",
      minW: 4,
      maxW: 8,
      minH: 11.5,
      maxH: 11.5,
      moved: false,
      static: false,
    },
    {
      w: 4,
      h: 11.5,
      x: 4,
      y: 0,
      i: "c",
      minW: 4,
      maxW: 8,
      minH: 11.5,
      maxH: 11.5,
      moved: false,
      static: false,
    },
    {
      w: 4,
      h: 11.5,
      x: 8,
      y: 0,
      i: "d",
      minW: 4,
      maxW: 8,
      minH: 11.5,
      maxH: 11.5,
      moved: false,
      static: false,
    },
  ],
  widgets: [
    // {
    //   id: "a",
    //   type: "VIDEO",
    //   title: "Live Feed",
    //   description: "Live video feed from the room camera",
    //   data: {
    //     url: `${MS_API_URL}/device-65fc78e2d89991a580b78c35.flv`,
    //   },
    //   config: {
    //     categories: ["value"],
    //     index: "time",
    //     colors: ["red"],
    //     topic: "af14/temperature",
    //   },
    // },
    {
      id: "b",
      type: "LINECHART",
      title: "Occupancy",
      description: "Occupancy of the room",
      data: [],
      config: {
        topic: "af14/temperature",
        index: "time",
        categories: ["value"],
        colors: ["lime"],
      },
    },
    {
      id: "c",
      type: "BARCHART",
      title: "Occupancy",
      description: "Occupancy of the room",
      data: [],
      config: {
        topic: "af14/humidity",
        index: "time",
        categories: ["sequence"],
        colors: ["lime"],
      },
    },
    {
      id: "d",
      type: "AREACHART",
      title: "Occupancy",
      description: "Occupancy of the room",
      data: [],
      config: {
        topic: "af14/temperature",
        index: "time",
        categories: ["sequence"],
        colors: ["red"],
      },
    },
  ],
  dashboard_id: null,
  setDashboard: (layout, widgets, dashboard_id) =>
    set({
      layout,
      widgets,
      dashboard_id,
    }),
  setWidgets: (widgets) =>
    set({
      widgets,
    }),
  setLayout: (layout) =>
    set({
      layout,
    }),
  clearDashboard: () =>
    set({
      layout: [],
      widgets: [],
      dashboard_id: null,
    }),
}));

export default useDashboard;
