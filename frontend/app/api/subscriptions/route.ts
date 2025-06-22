import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    console.log('Received subscription request');
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      console.error('Authentication error:', authError?.message || 'No user found');
      return NextResponse.json(
        { error: 'Unauthorized', details: authError?.message },
        { status: 401 }
      );
    }
    
    const body = await request.json().catch(error => {
      console.error('Error parsing request body:', error);
      throw new Error('Invalid request body');
    });

    console.log('Request body:', body);
    
    if (!body.subreddit) {
      return NextResponse.json(
        { error: 'Subreddit is required' },
        { status: 400 }
      );
    }
    
    // Forward the request to the backend service
    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/subscriptions/`;
    console.log('Forwarding to backend:', backendUrl);
    
    const payload = {
      subreddit: body.subreddit,
      user_id: user.id,
    };
    
    console.log('Sending payload:', payload);
    
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    const data = await response.json().catch(error => {
      console.error('Error parsing backend response:', error);
      return { detail: 'Invalid response from server' };
    });
    
    console.log('Backend response status:', response.status);
    console.log('Backend response data:', data);
    
    if (!response.ok) {
      return NextResponse.json(
        { 
          error: data.detail || 'Failed to add subscription',
          details: data,
          status: response.status 
        },
        { status: response.status }
      );
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in subscription endpoint:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user || user.id !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Forward the request to the backend service
    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/subscriptions/${userId}`;
    const response = await fetch(backendUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(
        { error: data.detail || 'Failed to fetch subscriptions' },
        { status: response.status }
      );
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request
) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    if (!id) {
      return NextResponse.json(
        { error: 'Subscription ID is required' },
        { status: 400 }
      );
    }
    
    // Forward the request to the backend service
    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/subscriptions/${id}/${user.id}`;
    const response = await fetch(backendUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.detail || 'Failed to delete subscription' },
        { status: response.status }
      );
    }
    
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting subscription:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
