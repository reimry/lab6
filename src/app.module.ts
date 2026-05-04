import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "node:path";
import { ContactModule } from "./contact/contact.module";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), "public"),
    }),
    ContactModule,
  ],
})
export class AppModule {}
