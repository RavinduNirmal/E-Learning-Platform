import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend('re_MtyoeAZV_9g75jFoeqJtJj2yEi7EVTvNS')

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json()

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', 
      to: 'ravindu.liyanage099@gmail.com', 
      subject: 'New Contact Form Submission',
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    })

    if (error) {
      return NextResponse.json({ error }, { status: 400 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}