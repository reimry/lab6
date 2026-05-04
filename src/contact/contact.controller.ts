import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ContactDto } from "./contact.dto";
import { ContactService } from "./contact.service";

@Controller("api/contact")
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @HttpCode(200)
  async createContactRequest(@Body() body: ContactDto) {
    await this.contactService.sendContactEmail(body);

    return {
      ok: true,
      message: "Лист успішно відправлено.",
    };
  }
}
