import{j as e}from"./index-B7Ig6kNO.js";import{C as s}from"./CodeBlock-jMISp3qZ.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";function o(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"TypeScript bases"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Two tsconfig bases — tsconfig.api for NestJS services that nest build compiles, tsconfig.handler for lambdas where the deploy tool bundles and tsc only typechecks."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"What they set"}),e.jsx(s,{language:"json",tabs:[{code:`{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "target": "ES2023",
    "lib": ["ES2023"],
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "types": ["node"],
    "resolvePackageJsonExports": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "isolatedModules": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "declaration": false,
    "removeComments": true,
    "sourceMap": true,
    "incremental": true,
    "skipLibCheck": true,
    "strict": true,
    "strictPropertyInitialization": false,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,
    "jsx": "react-jsx"
  }
}`,label:"tsconfig.api.json"},{code:`{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "target": "ES2023",
    "lib": ["ES2023"],
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "types": ["node"],
    "resolvePackageJsonExports": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "isolatedModules": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "noEmit": true,
    "skipLibCheck": true,
    "strict": true,
    "strictPropertyInitialization": false,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true
  }
}`,label:"tsconfig.handler.json"}]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Strict — with one exception"}),e.jsxs("p",{className:"text-muted-foreground",children:["Both bases are ",e.jsx("code",{className:"text-lib",children:'"strict": true'})," with"," ",e.jsx("code",{className:"text-lib",children:'"strictPropertyInitialization": false'}),". NestJS DTOs and entities declare class fields that decorators and the runtime populate — never a constructor:"]}),e.jsx(s,{code:`export class CreateBookingDto {
  @IsString()
  propertyId: string

  @IsDateString()
  checkIn: string
}`,filename:"create-booking.dto.ts",language:"ts"}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:["With full strictness every field would need a"," ",e.jsx("code",{className:"text-lib",children:"!"})," assertion. Turning off only strictPropertyInitialization keeps the rest of strict mode intact."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Decorators and modules"}),e.jsxs("ul",{className:"space-y-2 text-muted-foreground",children:[e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:[e.jsx("code",{className:"text-lib",children:'"experimentalDecorators": true'})," ","and"," ",e.jsx("code",{className:"text-lib",children:'"emitDecoratorMetadata": true'})," — NestJS DI resolves constructor parameter types from the emitted metadata"]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:[e.jsx("code",{className:"text-lib",children:'"module": "nodenext"'})," +"," ",e.jsx("code",{className:"text-lib",children:'"moduleResolution": "nodenext"'})," ","with"," ",e.jsx("code",{className:"text-lib",children:'"resolvePackageJsonExports": true'})," ","— resolution matches what node actually does at runtime"]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:["ES2023 target and lib,"," ",e.jsx("code",{className:"text-lib",children:'"types": ["node"]'}),","," ",e.jsx("code",{className:"text-lib",children:"isolatedModules"}),","," ",e.jsx("code",{className:"text-lib",children:"esModuleInterop"}),", and"," ",e.jsx("code",{className:"text-lib",children:"allowSyntheticDefaultImports"})]})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"api vs handler"}),e.jsxs("ul",{className:"space-y-2 text-muted-foreground",children:[e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:[e.jsx("code",{className:"text-lib",children:"tsconfig.api"})," emits — nest build runs tsc, so it sets"," ",e.jsx("code",{className:"text-lib",children:'"declaration": false'}),","," ",e.jsx("code",{className:"text-lib",children:'"removeComments": true'}),","," ",e.jsx("code",{className:"text-lib",children:'"sourceMap": true'}),","," ",e.jsx("code",{className:"text-lib",children:'"incremental": true'}),", and"," ",e.jsx("code",{className:"text-lib",children:'"jsx": "react-jsx"'})]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:[e.jsx("code",{className:"text-lib",children:"tsconfig.handler"})," sets"," ",e.jsx("code",{className:"text-lib",children:'"noEmit": true'})," — tsc only typechecks, the lambda bundle is the deploy tool's job, so none of the emit options exist"]})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"What the app declares"}),e.jsxs("p",{className:"text-muted-foreground",children:["The bases set no ",e.jsx("code",{className:"text-lib",children:"include"}),","," ",e.jsx("code",{className:"text-lib",children:"outDir"}),", or"," ",e.jsx("code",{className:"text-lib",children:"paths"})," — extends resolves path-like options relative to the file that declares them, so those must live in the app:"]}),e.jsx(s,{language:"json",tabs:[{code:`{
  "extends": "@turystack/backend-config/tsconfig.api.json",
  "include": ["src"],
  "compilerOptions": {
    "outDir": "./dist",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}`,label:"tsconfig.json (API)"},{code:`{
  "extends": "@turystack/backend-config/tsconfig.handler.json",
  "include": ["src"],
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}`,label:"tsconfig.json (handler)"}]}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:["An API declares ",e.jsx("code",{className:"text-lib",children:"outDir"})," because tsconfig.api emits; a handler is noEmit, so only include and the"," ",e.jsx("code",{className:"text-lib",children:"@/*"})," alias remain app-side."]})]})]})}export{o as component};
