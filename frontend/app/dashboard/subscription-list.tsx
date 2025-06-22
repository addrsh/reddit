'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Loader2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Subscription {
  id: string;  // UUID
  user_id: string;  // UUID
  subreddit: string;
  last_fetched: string;
}

interface SubscriptionListProps {
  userId: string;
}

export function SubscriptionList({ userId }: SubscriptionListProps) {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchSubscriptions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/subscriptions?userId=${userId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch subscriptions');
      }
      
      const data = await response.json();
      setSubscriptions(data);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      toast.error('Failed to load subscriptions');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (subscriptionId: string) => {
    if (window.confirm('Are you sure you want to unsubscribe from this subreddit?')) {
      try {
        setDeletingId(subscriptionId);

        const response = await fetch(`/api/subscriptions?id=${subscriptionId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: userId }),
        });
        
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.detail || 'Failed to delete subscription');
        }
        
        toast.success('Subscription removed');
        fetchSubscriptions(); // Refresh the list
      } catch (error) {
        console.error('Error deleting subscription:', error);
        toast.error(error instanceof Error ? error.message : 'Failed to remove subscription');
      } finally {
        setDeletingId(null);
      }
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, [userId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (subscriptions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No subscriptions yet. Add a subreddit to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {subscriptions.map((sub) => (
          <Card key={sub.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">r/{sub.subreddit}</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(sub.id)}
                  disabled={deletingId === sub.id}
                  aria-label={`Unsubscribe from r/${sub.subreddit}`}
                >
                  {deletingId === sub.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4 text-destructive" />
                  )}
                </Button>
              </div>
              <CardDescription>
                Last fetched: {new Date(sub.last_fetched).toLocaleString()}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
