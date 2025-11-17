import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  return (
    <div className="container flex min-h-[calc(100vh-8rem)] items-center justify-center">
      <div className="rounded-lg border bg-card p-8 text-center shadow-lg">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="mt-6 text-3xl font-bold">Thank You for Your Order!</h1>
        <p className="mt-2 text-muted-foreground">
          Your order has been placed successfully. A confirmation email has been sent.
        </p>
        <Button asChild className="mt-8">
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}
