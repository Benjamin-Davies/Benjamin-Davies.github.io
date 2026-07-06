---
name: mediawiki
description: Fetch raw wikitext from Wikipedia. Use this when you need to look up factual information, verify a claim, understand a concept, or research a topic — any time a Wikipedia article would be a useful source.
user-invocable: true
---

# MediaWiki Skill

Base URL: `https://en.wikipedia.org`

## Fetching a page

Fetch raw wikitext using the `action=raw` endpoint, with spaces as underscores:

```
https://en.wikipedia.org/w/index.php?title=Page_Title&action=raw
```

Use `WebFetch` with this URL. Redirects are followed automatically.

To fetch the redirect page itself without following it (e.g. to see where it points), append `&noredirect=1`.

## Searching

When the exact title is unknown, search first:

```
https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=QUERY&format=json&srlimit=10&srnamespace=0|4
```

This searches both the main article namespace (0) and the Wikipedia project namespace (4, e.g. policy and guideline pages like `Wikipedia:Manual of Style`).

Pick the best match from `query.search[].title`, then fetch that page with `action=raw`.

## Templates and transclusion

Many pages pull content from shared templates. When a section looks sparse or a table is missing content, the source may be transcluded.

**Fetch a template's wikitext:**
```
https://en.wikipedia.org/w/index.php?title=Template:Template_Name&action=raw
```

**List templates used on a page:**
```
https://en.wikipedia.org/w/api.php?action=query&titles=Page_Title&prop=templates&format=json&tllimit=50
```
Results are in `query.pages.*.templates[].title`.

**Find all pages that transclude a template:**
```
https://en.wikipedia.org/w/api.php?action=query&list=embeddedin&eititle=Template:Name&format=json&eilimit=20`
```

## Disambiguations and sections

- If the raw text contains `{{disambig}}`, list the linked options for the user to choose from.
- Sections are delimited by `== Heading ==` markers — extract the relevant section if the user asks for one.
