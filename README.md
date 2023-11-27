This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

//Additional Notes.
    - We have use Redux just to store the cart data so we can do manipulation with the product quantity or the whole product.
    - If there will be API in the project then we can ommit the use of the Redux.
    - Also to get the redux state, we use redux hook (useSelector). Hence we have to make those componenet as client component. We can switch those component to the server component and implement complex functionality on the server.
    -For the Signin page, while form submission, we can implement the NextJS functionality (server action) to submit the form and make that component as the server component too.
    -Also, I have use Next-auth library to implement authentication logic using Credentials provider. With that library, We can get the user session data at any component to implement authentication based functionality.