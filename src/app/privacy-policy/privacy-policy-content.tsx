'use client';

import type { ReactNode } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  AiBrain03Icon,
  CookieIcon,
  DatabaseLockedIcon,
  MailAtSign01Icon,
  ShieldUserIcon,
  UserCheck01Icon,
} from '@hugeicons/core-free-icons';
import { motion } from 'motion/react';
import type { Variants } from 'motion/react';
import {
  CONTACT_US,
  COOKIES,
  DATA_COLLECTED,
  DATA_USE,
  INTRODUCTION,
  YOUR_RIGHTS,
} from '@/lib/privacy-policy-constants';

type Hugeicon = React.ComponentProps<typeof HugeiconsIcon>['icon'];

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const listItemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};

function AnimatedSection({ children, icon }: { children: ReactNode; icon: Hugeicon }) {
  return (
    <motion.section
      className="grid gap-4 sm:grid-cols-[2.75rem_1fr] sm:gap-5"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-8%' }}
    >
      <div className="flex size-11 items-center justify-center rounded-lg border bg-secondary text-foreground">
        <HugeiconsIcon icon={icon} size={22} strokeWidth={1.7} aria-hidden="true" />
      </div>
      <div className="space-y-4">{children}</div>
    </motion.section>
  );
}

function AnimatedList({ items }: { items: string[] }) {
  return (
    <motion.ul
      className="space-y-2 text-sm leading-7 text-muted-foreground sm:text-base"
      variants={listVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-8%' }}
    >
      {items.map((item) => (
        <motion.li key={item} className="flex gap-3" variants={listItemVariants}>
          <span className="mt-3 size-1.5 shrink-0 rounded-full bg-foreground/70" />
          <span>{item}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}

function ContactInfoList({ items }: { items: { label: string; value: string }[] }) {
  const availableItems = items.filter((item) => item.value.trim().length > 0);

  if (availableItems.length === 0) {
    return null;
  }

  return (
    <motion.ul
      className="space-y-2 text-sm leading-7 text-muted-foreground sm:text-base"
      variants={listVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-8%' }}
    >
      {availableItems.map((item) => (
        <motion.li key={item.label} variants={listItemVariants}>
          <span className="font-medium text-foreground">{item.label}:</span> {item.value}
        </motion.li>
      ))}
    </motion.ul>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return <h2 className="text-xl font-semibold tracking-tight text-foreground">{children}</h2>;
}

function SectionText({ children }: { children: ReactNode }) {
  return <p className="leading-7 text-muted-foreground">{children}</p>;
}

function AnimatedSeparator() {
  return (
    <motion.div
      className="h-px w-full bg-border"
      style={{ transformOrigin: 'left' }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
    />
  );
}

export default function PrivacyPolicyContent() {
  return (
    <main className="flex-1 bg-secondary/40 px-4 py-12 sm:px-6 md:py-18">
      <motion.article
        className="mx-auto flex max-w-5xl flex-col gap-8 rounded-xl border bg-background px-5 py-7 shadow-sm sm:px-8 md:px-10 md:py-10"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut', delay: 0.15 }}
      >
        <header className="space-y-3 border-b pb-7">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Clinsight
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="max-w-3xl leading-7 text-muted-foreground">
            How we collect, use, and protect the information needed to support your lab insights and
            doctor consultations.
          </p>
        </header>

        <AnimatedSection icon={ShieldUserIcon}>
          <SectionHeading>{INTRODUCTION.title}</SectionHeading>
          <SectionText>{INTRODUCTION.content}</SectionText>
          <SectionText>{INTRODUCTION.footerContent}</SectionText>
        </AnimatedSection>

        <AnimatedSeparator />

        <AnimatedSection icon={DatabaseLockedIcon}>
          <SectionHeading>{DATA_COLLECTED.title}</SectionHeading>
          <SectionText>{DATA_COLLECTED.content}</SectionText>
          <div className="grid gap-5 md:grid-cols-3">
            {DATA_COLLECTED.dataCollectedType.map((dataType) => (
              <div
                key={dataType.title}
                className="rounded-lg border bg-card p-4 text-card-foreground"
              >
                <h3 className="mb-2 font-semibold text-foreground">{dataType.title}</h3>
                <AnimatedList items={dataType.content} />
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSeparator />

        <AnimatedSection icon={AiBrain03Icon}>
          <SectionHeading>{DATA_USE.title}</SectionHeading>
          <SectionText>{DATA_USE.content}</SectionText>
          <AnimatedList items={DATA_USE.uses} />
          <SectionText>{DATA_USE.footerContent}</SectionText>
        </AnimatedSection>

        <AnimatedSeparator />

        <AnimatedSection icon={CookieIcon}>
          <SectionHeading>{COOKIES.title}</SectionHeading>
          <SectionText>{COOKIES.content}</SectionText>
          <AnimatedList items={COOKIES.uses} />
          <SectionText>{COOKIES.footerContent}</SectionText>
        </AnimatedSection>

        <AnimatedSeparator />

        <AnimatedSection icon={UserCheck01Icon}>
          <SectionHeading>{YOUR_RIGHTS.title}</SectionHeading>
          <SectionText>{YOUR_RIGHTS.content}</SectionText>
          <AnimatedList items={YOUR_RIGHTS.rights} />
          <SectionText>{YOUR_RIGHTS.footerContent}</SectionText>
        </AnimatedSection>

        <AnimatedSeparator />

        <AnimatedSection icon={MailAtSign01Icon}>
          <SectionHeading>{CONTACT_US.title}</SectionHeading>
          {CONTACT_US.content ? <SectionText>{CONTACT_US.content}</SectionText> : null}
          <ContactInfoList items={CONTACT_US.contactInfo} />
        </AnimatedSection>
      </motion.article>
    </main>
  );
}
