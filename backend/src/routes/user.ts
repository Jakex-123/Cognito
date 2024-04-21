import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { hashedPassword } from "../../utils/hashPassword";
import { sign } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { signupInput,signinInput } from "@jakex123/medium-common";


export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs not correct",
    });
  }
  try {
    const hashedPass = await hashedPassword(body.password);
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPass,
      },
    });
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (e) {
    console.log(e);
    c.status(403);
    return c.json({
      error: "Error while signing up",
    });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs not correct",
    });
  }
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  if (!user) {
    c.status(403);
    return c.json({
      error: "user not found",
    });
  }
  if (user?.password !== (await hashedPassword(body.password))) {
    console.log(await hashedPassword(user?.password));
    c.status(401);
    return c.json({
      error: "user email or password incorrect",
    });
  }
  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ jwt });
});
