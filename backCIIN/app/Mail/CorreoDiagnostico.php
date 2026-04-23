<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class CorreoDiagnostico extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */

        public $cliente;
        public $diagnostico;

    public function __construct($cliente, $diagnostico)
    {   
        $this->cliente = $cliente;        
        $this->diagnostico = $diagnostico;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Correo Diagnostico De IA',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.diagnostico',
            with: [
                'cliente' => $this->cliente,
                'diagnostico' => $this->diagnostico
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
