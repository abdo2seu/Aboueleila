'use client';
import React from 'react';
import { EtheralShadow } from '@/components/ui/etheral-shadow';

// خلفية ثابتة تغطي كامل الشاشة - أسفل المحتوى
export function SiteBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
    >
      <EtheralShadow
        className="h-full w-full"
        color="rgba(128,128,128,1)"
        animation={{ scale: 100, speed: 90 }}
        noise={{ opacity: 0.8, scale: 1.2 }}
        sizing="fill"
      />
    </div>
  );
}

