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
- Body: `{ firstName: string, email: string }`
- Returns: `{ success: boolean, message: string }`

## Testing

Visit http://localhost:3000/waitlist to test the form.
