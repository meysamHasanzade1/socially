import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();


// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  postImage: f({
    image: {
      
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const {userId} =await auth();
      if(!userId) throw new Error("Unauthorized");


      return { userId};
    })
    .onUploadComplete(async ({ metadata, file }) => {
     try{
      return {fileUrl: file.url};
     }catch(error){
      console.error("Error in on UpladComplate:",error)
      throw error
     }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
