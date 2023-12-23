const initialState = {
    alldata: [],
  };
  
  
  
  export const BillDataReducer = (state = initialState, action) => {
      switch (action.type) {
        case "ADD-DATA":
          return {
            ...state,
            alldata: [...state.alldata, ...action.payload],
          };
            
      }
      return state;
     
    };