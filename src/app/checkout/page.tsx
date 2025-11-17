'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/cart-context';
import { getPlaceholderImageById } from '@/lib/placeholder-images';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';

const checkoutSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  firstName: z.string().min(1, { message: 'First name is required.' }),
  lastName: z.string().min(1, { message: 'Last name is required.' }),
  address: z.string().min(1, { message: 'Address is required.' }),
  city: z.string().min(1, { message: 'City is required.' }),
  zip: z.string().min(5, { message: 'ZIP code must be 5 digits.' }).max(5),
  cardName: z.string().min(1, { message: 'Name on card is required.' }),
  cardNumber: z.string().length(16, { message: 'Card number must be 16 digits.' }),
  cardExpiry: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, { message: 'Invalid expiry date (MM/YY).'}),
  cardCVC: z.string().length(3, { message: 'CVC must be 3 digits.' }),
});

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      zip: '',
      cardName: '',
      cardNumber: '',
      cardExpiry: '',
      cardCVC: '',
    },
  });

  if (cart.length === 0) {
    return (
        <div className="container flex h-[calc(100vh-8rem)] items-center justify-center text-center">
            <div>
                <h1 className="text-3xl font-bold">Your Cart is Empty</h1>
                <p className="mt-2 text-muted-foreground">Add some products to your cart before checking out.</p>
                <Button onClick={() => router.push('/products')} className="mt-6">Continue Shopping</Button>
            </div>
        </div>
    )
  }

  const onSubmit = (values: z.infer<typeof checkoutSchema>) => {
    console.log('Form submitted:', values);
    toast({
        title: "Order Placed!",
        description: "Thank you for your purchase.",
    });
    clearCart();
    router.push('/checkout/success');
  };

  return (
    <div className="container grid grid-cols-1 gap-12 py-12 lg:grid-cols-2">
      <div className="order-2 lg:order-1">
        <h1 className="mb-6 text-3xl font-bold">Checkout</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
                <CardContent className="p-6">
                    <h2 className="text-xl font-semibold">Contact Information</h2>
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="mt-4">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                    <h2 className="text-xl font-semibold">Shipping Address</h2>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <FormField control={form.control} name="firstName" render={({ field }) => ( <FormItem><FormLabel>First Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                        <FormField control={form.control} name="lastName" render={({ field }) => ( <FormItem><FormLabel>Last Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                    </div>
                    <FormField control={form.control} name="address" render={({ field }) => ( <FormItem className="mt-4"><FormLabel>Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <FormField control={form.control} name="city" render={({ field }) => ( <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                        <FormField control={form.control} name="zip" render={({ field }) => ( <FormItem><FormLabel>ZIP Code</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                    </div>
                </CardContent>
            </Card>
            
            <Card>
                <CardContent className="p-6">
                    <h2 className="text-xl font-semibold">Payment Details</h2>
                    <p className="text-sm text-muted-foreground">This is a demo. Do not enter real card details.</p>
                     <FormField control={form.control} name="cardName" render={({ field }) => ( <FormItem className="mt-4"><FormLabel>Name on Card</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={form.control} name="cardNumber" render={({ field }) => ( <FormItem className="mt-4"><FormLabel>Card Number</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <FormField control={form.control} name="cardExpiry" render={({ field }) => ( <FormItem><FormLabel>Expiry (MM/YY)</FormLabel><FormControl><Input placeholder="MM/YY" {...field} /></FormControl><FormMessage /></FormItem> )} />
                        <FormField control={form.control} name="cardCVC" render={({ field }) => ( <FormItem><FormLabel>CVC</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                    </div>
                </CardContent>
            </Card>

            <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Processing...' : `Pay $${totalPrice.toFixed(2)}`}
            </Button>
          </form>
        </Form>
      </div>
      <div className="order-1 lg:order-2">
        <div className="sticky top-20 rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <ScrollArea className="mt-4 h-[30vh] pr-4">
            <div className="space-y-4">
              {cart.map((item) => {
                const placeholderImage = getPlaceholderImageById(item.product.image);
                return (
                  <div key={item.product.id} className="flex items-center gap-4">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                      <Image
                        src={placeholderImage?.imageUrl || '/placeholder.svg'}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        data-ai-hint={placeholderImage?.imageHint}
                      />
                      <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">{item.quantity}</div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.product.name}</p>
                    </div>
                    <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
          <Separator className="my-4" />
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span>Calculated at next step</span>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
