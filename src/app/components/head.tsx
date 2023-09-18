export default function PageTitle({
  title,
  description,
  imageUrl,
  imageAlt,
  locale,
  type,
  twitterCard,
  canonicalUrl,
}: {
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  locale?: string;
  type?: string;
  twitterCard?: string;
  canonicalUrl?: string;
}): React.ReactNode {
  // Explicitly set website name
  const siteName = 'Constellation';
  const themeColor = '#157EFF'

  return (
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title ? `${siteName} - ${title}` : siteName}</title>
      {description && <meta name="description" content={description} />}
      {title && (
        <>
          <meta property="og:title" content={`${title} - ${siteName}`} />
          <meta property="og:description" content={description} />
          {imageUrl && <meta property="og:image" content={imageUrl} />}
          {imageAlt && <meta property="og:image:alt" content={imageAlt} />}
          {locale && <meta property="og:locale" content={locale} />}
          {type && <meta property="og:type" content={type} />}
          {twitterCard && <meta name="twitter:card" content={twitterCard} />}
          {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
          <meta name="theme-color" content={themeColor} />
        </>
      )}
    </head>
  );
}
