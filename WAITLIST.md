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

- **POST** `/api/waitlist`
- Body: `{ email: string }`
- Backend: `https://api.staging.clinsight.hng14.com/api/v1/waitlist`
- Returns: `{ status: string, message: string, data: { id: string, email: string, created_at: string } }`

## Testing

Visit http://localhost:3000/waitlist to test the form.