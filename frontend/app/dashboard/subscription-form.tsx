'use client';

import { useState } from 'react';
import { useForm, ControllerRenderProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { PlusCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

// Create a form schema using zod
const formSchema = z.object({
  subreddit: z.string()
    .min(2, 'Subreddit name must be at least 2 characters')
    .max(21, 'Subreddit name must be at most 21 characters')
    .regex(
      /^[a-z0-9_]+$/i, 
      'Subreddit name can only contain letters, numbers, and underscores'
    )
    .transform((val) => val.toLowerCase().trim())
});

type FormData = z.infer<typeof formSchema>;

interface SubscriptionFormProps {
  userId: string;
}

export function SubscriptionForm({ userId }: SubscriptionFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subreddit: '',
    },
  });

  // Track if form is currently being submitted
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: FormData) => {
    // Prevent double submission
    if (isSubmitting) {
      console.log('Preventing duplicate form submission');
      return;
    }

    try {
      setIsSubmitting(true);
      setIsLoading(true);
      
      console.log('Submitting form with data:', { ...data, userId });
      
      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subreddit: data.subreddit,
          user_id: userId,
        }),
      });

      const responseData = await response.json();
      console.log('API Response:', { status: response.status, data: responseData });

      if (!response.ok) {
        const errorMessage = responseData.error || responseData.detail || 'Failed to add subscription';
        const errorDetails = responseData.details 
          ? `: ${typeof responseData.details === 'string' 
              ? responseData.details 
              : JSON.stringify(responseData.details)}`
          : '';
        throw new Error(`${errorMessage}${errorDetails}`);
      }

      toast.success(`Successfully subscribed to r/${data.subreddit}`);
      form.reset();
    } catch (error) {
      console.error('Error in form submission:', error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'An unexpected error occurred. Please try again.';
      
      if (error instanceof Error) {
        console.error('Error details:', error.stack);
      }
      
      toast.error(errorMessage, {
        duration: 5000,
        className: 'bg-red-50 text-red-700',
      });
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form 
        onSubmit={(e) => {
          e.preventDefault(); // Prevent default form submission
          form.handleSubmit(onSubmit)(e);
        }} 
        className="flex gap-2 w-full max-w-md"
      >
        <FormField
          control={form.control}
          name="subreddit"
          render={({ field }: { field: ControllerRenderProps<FormData, 'subreddit'> }) => (
            <FormItem className="flex-1">
              <FormControl>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                    r/
                  </div>
                  <Input
                    placeholder="subreddit-name"
                    className="pl-8"
                    disabled={isLoading}
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
