/* Library import */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
/* State Type 설정 */
export interface header {
  isScrolled: boolean;
  scrollCount: number;
  timerMessage: string | number;
  headerAllConcerts: any[];
  headerIsRendered: boolean;
}

/* State 초기값 설정 */
const initialState: header = {
  isScrolled: false,
  scrollCount: 0,
  timerMessage: '',
  headerAllConcerts: [],
  headerIsRendered: false,
};

const headerSlice = createSlice({
  name: 'header',
  initialState: initialState,
  reducers: {
    /* Action 설정 */
    setIsScrolled: (state: header, { payload }: PayloadAction<boolean>) => {
      state.isScrolled = payload;
    },
    setScrollCount: (state: header, { payload }: PayloadAction<number>) => {
      state.scrollCount = payload;
    },
    setTimerMessage: (
      state: header,
      { payload }: PayloadAction<string | number>,
    ) => {
      state.timerMessage = payload;
    },
    setHeaderAllConcerts: (
      state: header,
      { payload }: PayloadAction<Array<any>>,
    ) => {
      state.headerAllConcerts = payload;
    },
    setHeaderIsRendered: (
      state: header,
      { payload }: PayloadAction<boolean>,
    ) => {
      state.headerIsRendered = payload;
    },
  },
});

export const {
  setIsScrolled,
  setScrollCount,
  setTimerMessage,
  setHeaderAllConcerts,
  setHeaderIsRendered,
} = headerSlice.actions;
export default headerSlice.reducer;
