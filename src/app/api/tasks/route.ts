import { error } from "console";

interface Task {
    id: number;
    title:string;
    complated:boolean;
}
interface CreateTackRequest {
    title:string
}

let tasks:Task[] = [
    {id:1, title:'Learn Next.js', complated:false},
    {id:2, title:'Build a project', complated:false},
];

export async function GET(){
    return Response.json(tasks);
}

export async function POST (request:Request){
    try{
        const body: CreateTackRequest =await request.json();

        if(!body.title){
            return Response.json({error:"Title is required"},{status:400})
        }
        const newTask:Task = {
            id:tasks.length+1,
            title:body.title,
            complated:false
        };
        tasks.push(newTask);
        return Response.json(newTask,{status:201})
        
    }catch(error){
        return Response.json({error:"Invalid request body"},{status:400});
    }
}

export async function DELETE(request:Request){
    try{
        const {searchParams} = new URL(request.url);
        const id = parseInt(searchParams.get("id") || "");

        if(!id){
            return Response.json({error:"Task ID is reqired"},{status:400});
        }
        const taskIndex = tasks.findIndex((task)=> task.id === id);
        if(taskIndex === -1){
            return Response.json({error:"Task not found"},{status:404});
        }

        tasks = tasks.filter((task)=>task.id !== id);
        return Response.json({message:"Task deleted"},)
    }catch(error){
        return Response.json({error:"Invalid request"},{status:400});
    }
}