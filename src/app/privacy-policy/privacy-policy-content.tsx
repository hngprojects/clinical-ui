'use client';

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

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
};

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const listItemVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

function AnimatedSection({
  index,
  title,
  children,
}: {
  index: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-6%' }}
      className="border-b border-border pb-8 last:border-0 last:pb-0"
    >
      <h2 className="mb-3 text-base font-semibold text-foreground">
        {index}. {title}
      </h2>
      {children}
    </motion.section>
  );
}

function BodyText({ children }: { children: React.ReactNode }) {
  return <p className="text-sm leading-6 text-muted-foreground">{children}</p>;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <motion.ul
      className="mt-2 space-y-1"
      variants={listVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-6%' }}
    >
      {items.map((item) => (
        <motion.li
          key={item}
          variants={listItemVariants}
          className="flex items-start gap-2 text-sm leading-6 text-muted-foreground"
        >
          <span className="mt-2.5 size-1 shrink-0 rounded-full bg-muted-foreground/60" />
          <span>{item}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}

export default function PrivacyPolicyContent() {
  return (
    <main className="flex-1">
      {/* Blue hero header */}
      <div className="bg-[#2B5BA8] px-4 py-12 text-center sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <h1 className="text-2xl font-semibold text-white sm:text-3xl">Privacy Policy</h1>
          <p className="mt-2 text-sm text-blue-200">Last Updated, May 2026</p>
        </motion.div>
      </div>

      {/* Content card */}
      <div className="bg-muted/30 px-4 py-8 sm:px-6">
        <motion.article
          className="mx-auto max-w-2xl space-y-8 rounded-lg border border-border bg-background px-6 py-8 shadow-sm sm:px-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
        >
          {/* 1. Introduction */}
          <AnimatedSection index={1} title={INTRODUCTION.title}>
            <BodyText>{INTRODUCTION.content}</BodyText>
            {INTRODUCTION.footerContent && (
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {INTRODUCTION.footerContent}
              </p>
            )}
          </AnimatedSection>

          {/* 2. Data Collection */}
          <AnimatedSection index={2} title={DATA_COLLECTED.title}>
            <BodyText>{DATA_COLLECTED.content}</BodyText>
            <div className="mt-3 space-y-4">
              {DATA_COLLECTED.dataCollectedType.map((dataType) => (
                <div key={dataType.title}>
                  <p className="text-sm font-semibold text-foreground">{dataType.title}</p>
                  <BulletList items={dataType.content} />
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* 3. Uses of Data */}
          <AnimatedSection index={3} title={DATA_USE.title}>
            <BodyText>{DATA_USE.content}</BodyText>
            <BulletList items={DATA_USE.uses} />
            {DATA_USE.footerContent && (
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {DATA_USE.footerContent}
              </p>
            )}
          </AnimatedSection>

          {/* 4. Cookies */}
          <AnimatedSection index={4} title={COOKIES.title}>
            <BodyText>{COOKIES.content}</BodyText>
            <BulletList items={COOKIES.uses} />
            {COOKIES.footerContent && (
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {COOKIES.footerContent}
              </p>
            )}
          </AnimatedSection>

          {/* 5. Your Rights */}
          <AnimatedSection index={5} title={YOUR_RIGHTS.title}>
            <BodyText>{YOUR_RIGHTS.content}</BodyText>
            <BulletList items={YOUR_RIGHTS.rights} />
            {YOUR_RIGHTS.footerContent && (
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {YOUR_RIGHTS.footerContent}
              </p>
            )}
          </AnimatedSection>

          {/* 6. Contact Us */}
          <AnimatedSection index={6} title={CONTACT_US.title}>
            {CONTACT_US.content && <BodyText>{CONTACT_US.content}</BodyText>}
            <motion.ul
              className="mt-2 space-y-1"
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-6%' }}
            >
              {CONTACT_US.contactInfo
                .filter((item) => item.value.trim().length > 0)
                .map((item) => (
                  <motion.li
                    key={item.label}
                    variants={listItemVariants}
                    className="flex items-start gap-2 text-sm leading-6 text-muted-foreground"
                  >
                    <span className="mt-2.5 size-1 shrink-0 rounded-full bg-muted-foreground/60" />
                    <span>
                      <span className="text-muted-foreground">{item.label}:</span>{' '}
                      {item.label.toLowerCase() === 'email' ? (
                        <a
                          href={`mailto:${item.value}`}
                          className="font-semibold text-foreground underline-offset-2 hover:underline"
                        >
                          {item.value}
                        </a>
                      ) : item.label.toLowerCase() === 'phone' ? (
                        <span className="font-semibold text-foreground">{item.value}</span>
                      ) : (
                        item.value
                      )}
                    </span>
                  </motion.li>
                ))}
            </motion.ul>
          </AnimatedSection>
        </motion.article>
      </div>
    </main>
  );
}
