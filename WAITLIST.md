# Waitlist Feature

## Overview

Users can sign up for early access to Clinsight through the waitlist form.

## Access

- URL: `/waitlist`
- Public facing (no authentication required)

## Features

- Email validation
- Form validation
- Success confirmation
- Responsive design

## API Endpoint

- **POST** `/api/subscribe`
- Body: `{ email: string, first_name: string, source: 'waitlist' }`
- Returns: `{ status: string, message: string, data: { id: string, email: string, created_at: string } }`

## Testing

Visit http://localhost:3000/waitlist to test the form.
