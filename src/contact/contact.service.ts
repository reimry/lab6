import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { Resend } from "resend";
import { ContactDto } from "./contact.dto";

@Injectable()
export class ContactService {
  private readonly resend: Resend;
  private readonly recipientEmail: string;
  private readonly senderEmail: string;

  constructor() {
    const apiKey = this.resolveResendApiKey();
    this.resend = new Resend(apiKey);
    this.recipientEmail = this.resolveRecipientEmail();
    this.senderEmail = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";
  }

  async sendContactEmail(payload: ContactDto): Promise<void> {
    const result = await this.resend.emails.send({
      from: this.senderEmail,
      to: [this.recipientEmail],
      replyTo: payload.email,
      subject: `[Contact Form] ${payload.subject}`,
      text: [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        "",
        payload.message,
      ].join("\n"),
    });

    if (result.error) {
      throw new InternalServerErrorException("Не вдалося відправити лист.");
    }
  }

  private resolveResendApiKey(): string {
    if (process.env.RESEND_API_KEY) {
      return process.env.RESEND_API_KEY;
    }

    const secretFilePath = join(process.cwd(), "secret.txt");
    if (!existsSync(secretFilePath)) {
      throw new Error(
        "Resend key is missing. Set RESEND_API_KEY in .env or add secret.txt.",
      );
    }

    const fileContent = readFileSync(secretFilePath, "utf-8").trim();
    const tokenPrefix = "resend API key:";

    if (!fileContent.startsWith(tokenPrefix)) {
      throw new Error("У secret.txt відсутній ключ Resend у потрібному форматі.");
    }

    const parsedKey = fileContent.slice(tokenPrefix.length).trim();
    if (!parsedKey) {
      throw new Error("Resend key in secret.txt is empty.");
    }

    return parsedKey;
  }

  private resolveRecipientEmail(): string {
    const recipient = (process.env.CONTACT_TO_EMAIL ?? "").trim();
    if (!recipient) {
      throw new Error("Set CONTACT_TO_EMAIL in .env.");
    }

    return recipient;
  }
}
