#Synapsis Test
## Techstack

- Next Js v 14.2.4
- Tailwind CSS
- Tenstack React Query : To caching management data
- Axios : API Comminucation
- React Hook Form : Form State 
- Zod : Validation

## Folder Stucture

All sources are placed in the `src` folder
- /app: All pages are in this folder along with their routing, this is the default folder from Next.js if using the App Router
- /components: To place all the components that will be reused on the pages
- /config: For things that need to be configured, here I place the axios config
- /hooks: To store all custom hooks, here I created useDebounce to delay the input onChange action
- /providers: I created a query provider for react-query
- /schema: To store the user and post form schemas along with their validations
- /service: In this folder, I created the API service that will be fetched later
- /utils: In this folder, I created a library for CSS conditioning and error responses
- /enum.ts: To store enum data
- /types: To prepare all data structures with types and interfaces
