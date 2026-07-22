import React from 'react';
import { Button } from '../ui/Button';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton({ phone, message, children = "Chat on WhatsApp", className, ...props }) {
  const handleClick = () => {
    const url = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <Button variant="whatsapp" onClick={handleClick} className={className} {...props}>
      <MessageCircle className="mr-2 h-4 w-4" />
      {children}
    </Button>
  );
}
