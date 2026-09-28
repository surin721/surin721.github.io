import React, { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';
import { highlight } from 'sugar-high';

type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

type HeroProps = {
  name: string;
  title: string;
  location: string;
  children?: React.ReactNode;
  // Set to a path in /public (e.g. "/profile.jpg") to replace the placeholder.
  image?: string;
};

function Hero({ name, title, location, children, image }: HeroProps) {
  return (
    <section className="flex flex-col-reverse md:flex-row md:items-center gap-8 pt-10 md:pt-16">
      <div className="flex-1 space-y-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
            {name}
          </h1>
          <p className="mt-2 text-lg text-gray-600">{title}</p>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
        <div className="space-y-4">{children}</div>
      </div>
      <div className="w-40 md:w-56 shrink-0 self-center md:self-auto">
        {image ? (
          <img
            src={image}
            alt={name}
            className="aspect-square w-full rounded-full object-cover shadow-md ring-4 ring-white"
          />
        ) : (
          <div
            role="img"
            aria-label="Profile photo placeholder"
            className="aspect-square w-full rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center text-gray-400"
          >
            <span className="text-4xl font-semibold">
              {name
                .split(' ')
                .map((part) => part[0])
                .join('')}
            </span>
            <span className="mt-1 text-xs uppercase tracking-wider">
              Photo
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

type RoleProps = {
  title: string;
  org: string;
  period: string;
  meta?: string;
  children?: React.ReactNode;
};

function Role({ title, org, period, meta, children }: RoleProps) {
  return (
    <div className="py-3 border-b border-gray-100 last:border-0">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-4">
        <div>
          <p className="font-medium text-gray-900">{title}</p>
          <p className="text-gray-600">{org}</p>
        </div>
        <p className="text-sm text-gray-500 sm:text-right shrink-0">{period}</p>
      </div>
      {meta && <p className="mt-1 text-sm text-gray-500">{meta}</p>}
      {children && <div className="mt-2 text-gray-700">{children}</div>}
    </div>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm text-gray-700"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

const components = {
  Hero,
  Role,
  Tags,
  h1: (props: HeadingProps) => (
    <h1 className="font-medium pt-12 mb-0" {...props} />
  ),
  h2: (props: HeadingProps) => (
    <h2
      id={typeof props.children === 'string' ? slugify(props.children) : undefined}
      className="text-gray-900 font-semibold mt-10 mb-3 scroll-mt-8"
      {...props}
    />
  ),
  h3: (props: HeadingProps) => (
    <h3
      className="text-gray-900 font-semibold mt-10 mb-3"
      {...props}
    />
  ),
  h4: (props: HeadingProps) => <h4 className="font-medium" {...props} />,
  p: (props: ParagraphProps) => (
    <p className="text-gray-800 leading-snug" {...props} />
  ),
  ol: (props: ListProps) => (
    <ol
      className="text-gray-800 list-decimal pl-5 space-y-2"
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul
      className="text-gray-800 list-disc pl-5 space-y-1"
      {...props}
    />
  ),
  li: (props: ListItemProps) => <li className="pl-1" {...props} />,
  em: (props: ComponentPropsWithoutRef<'em'>) => (
    <em className="font-medium" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-medium" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className =
      'text-blue-600 hover:text-blue-800 underline-offset-2 hover:underline';
    if (href?.startsWith('/')) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith('#')) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  },
  code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
    const codeHTML = highlight(children as string);
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
  },
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <table>
      <thead>
        <tr>
          {data.headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="ml-[0.075em] border-l-3 border-gray-300 pl-4 text-gray-700"
      {...props}
    />
  ),
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}
