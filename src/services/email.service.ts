import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer'

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter

  constructor(private configureService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configureService.get('nodemailer_host'),
      port: this.configureService.get('nodemailer_port'),
      auth: {
        user: this.configureService.get('nodemailer_auth_email'),
        pass: this.configureService.get('nodemailer_auth_code')
      }
    })
  }

  async send({to, subject, html}: {to: string, subject: string, html: string}) {
    await this.transporter.sendMail({
      from: {
        name: 'Meeting Room',
        address: this.configureService.get('nodemailer_auth_email')
      },
      to,
      subject,
      html
    })
  }
}
