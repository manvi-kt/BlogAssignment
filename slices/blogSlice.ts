import { createSlice  , PayloadAction} from "@reduxjs/toolkit";
import { RootState } from '../store';


interface Blog{
    id:string,
    title:string,
    content:string,
    date:string,
    day:string
}

interface WeeklyData{
    [day:string]:number
}

interface BlogState{
    blogData:Blog[],
    weeklyData:WeeklyData
}


const initialState : BlogState = {
  blogData:[
    {
      id:"1",
      title: "Understanding JavaScript Closures",
      content: "A deep dive into closures in JavaScript, explaining their uses and how they work with practical examples.",
      date :"",
      day:"Monday"
    },
    {
      id:"2",
      title: "10 Tips for Writing Clean React Code",
      content: "Discover best practices for writing maintainable and clean React code to improve readability and scalability.",
      date:"",
      day:"Tuesday"
    },
    { 
      id:"3",
      title: "Exploring Next.js: A Beginner's Guide",
      content: "An introduction to Next.js, covering its core features and how it simplifies server-side rendering and routing.",
      date:"",
      day:"Wednesday"
    },
    {
      id:"4",
      title: "CSS Tricks for Responsive Design",
      content: "Learn essential CSS techniques to create responsive and user-friendly web designs that adapt to various devices.",
      date:"",
      day:"Sunday"
    }
  ],
  weeklyData: {
    Monday: 1,
    Tuesday: 1,
    Wednesday: 1,
    Thursday: 1,
    Friday: 0,
    Saturday: 0,
    Sunday: 1,
  },


}

const getDayOfWeek = (date: Date): string => {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const generateUniqueId = (): string => {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  };

const BlogSlice = createSlice({
    name:"blog",
    initialState:initialState,
    reducers:{
        addBlog :(state, action:PayloadAction< {title: string; content: string }>)=>{
            const id = generateUniqueId();
            const {title , content} = action.payload;
            const currentDate = new Date();
            const dayOfWeek = getDayOfWeek(currentDate);
            const newBlog:Blog ={
                id,
                title,
                content,
                date:currentDate.toISOString(),
                day:dayOfWeek
            }
            state.blogData.push(newBlog);

            if(state.weeklyData[dayOfWeek]!==undefined){
                state.weeklyData[dayOfWeek]++;
            }
            else{
                state.weeklyData[dayOfWeek] = 1;
            }

            

        },

        deleteBlog:(state, action:PayloadAction<{ id: string}>)=>{
            const {id}= action.payload
            const blogToDelete= state.blogData.find((blog)=>blog.id===id);

            if (blogToDelete) {
                const dayOfWeek = blogToDelete.day;
            
            state.blogData = state.blogData.filter((blog)=>blog.id!==id);

            if(state.weeklyData[dayOfWeek]>0){
                state.weeklyData[dayOfWeek]--;
            }
        }

         },

         updateBlog: (state, action: PayloadAction<{ id: string; title: string; content: string }>) => {
            const { id, title, content } = action.payload;
            const blogIndex = state.blogData.findIndex((blog) => blog.id === id);
      
            if (blogIndex !== -1) {
              state.blogData[blogIndex] = { ...state.blogData[blogIndex], title, content };
            }
          },
          
        },
    });

    export const {addBlog,updateBlog,deleteBlog} = BlogSlice.actions;
    export const blogReducer = BlogSlice.reducer;
