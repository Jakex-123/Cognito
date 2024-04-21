import z from "zod";

//sign up
export const signupInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

export type signupInput = z.infer<typeof signupInput>;
 //sign in
export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });
  
export type signinInput = z.infer<typeof signinInput>;

//blog

//create
export const createPostInput = z.object({
    title: z.string(),
    content: z.string(),
  });
  
export type createPostInput = z.infer<typeof createPostInput>;

// update
export const updatePostInput = z.object({
    title: z.string(),
    content: z.string(),
    id:z.string()
  });
  
export type updatePostInput = z.infer<typeof updatePostInput>;

 