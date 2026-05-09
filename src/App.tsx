/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { 
  ArrowRight, 
  Terminal, 
  Layers, 
  Zap, 
  GitMerge, 
  Lock, 
  Database, 
  Settings2, 
  Braces,
  CheckCircle2,
  Code2
} from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-bg-primary text-ink font-sans selection:bg-accent selection:text-bg-primary flex flex-col overflow-x-hidden">
      <Nav />
      
      <main className="flex-1 flex flex-col relative z-10">
        <HeroSection />
        <WhySection />
        <FeatureGrid />
        <ComparisonSection />
        <CodeTabsSection />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
}

// Components will be defined below

function getFeatureCardClasses(index: number, total: number) {
  const isLastRowOnMobile = index === total - 1;
  const isLastColumnOnTablet = index % 2 === 1;
  const isLastColumnOnDesktop = index % 4 === 3;

  return [
    'p-6 sm:p-8 flex flex-col gap-3 group hover:bg-black/5 transition-colors min-h-[160px] justify-center',
    'border-border',
    !isLastRowOnMobile && 'border-b',
    isLastColumnOnTablet ? 'sm:border-r-0' : 'sm:border-r',
    isLastColumnOnDesktop ? 'lg:border-r-0' : 'lg:border-r',
  ].filter(Boolean).join(' ');
}

function getTabButtonClasses(isActive: boolean) {
  const baseClasses = [
    'text-left whitespace-nowrap lg:whitespace-normal shrink-0 transition-all',
    'px-4 py-3 sm:px-5 sm:py-4',
    'border-b-2 lg:border-b-0 lg:border-l-2',
  ].join(' ');
  const stateClasses = isActive
    ? 'border-accent bg-accent/10 text-ink font-semibold'
    : 'border-transparent text-ink-muted hover:border-border hover:text-ink hover:bg-black/5';

  return `${baseClasses} ${stateClasses}`;
}

function getExampleFilename(name: string) {
  return `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.php`;
}

function Nav() {
  return (
    <nav className="relative z-20 flex flex-col gap-4 px-4 py-6 border-b border-border sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-12 sm:py-8">
      <div className="flex items-center gap-2 text-center sm:text-left">
        <div className="w-8 h-8 bg-accent rounded flex items-center justify-center text-bg-primary font-black text-xl">H</div>
        <span className="font-display text-lg font-bold tracking-tight text-ink italic sm:text-xl">Httpful (fork)</span>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium tracking-wide uppercase text-ink sm:justify-end sm:gap-6 sm:text-sm lg:gap-8">
        <a href="https://github.com/voku/httpful" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-colors">
          GitHub
        </a>
        <a href="#examples" className="hover:opacity-100 transition-colors hidden sm:block">
          Examples
        </a>
        <a href="https://packagist.org/packages/voku/httpful" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-dim transition-colors">
          v3.2.0
        </a>
      </div>
    </nav>
  );
}

function CodeBlock({ code, language = 'php' }: { code: string, language?: string }) {
  return (
    <div className="text-[13px] leading-relaxed font-mono overflow-auto scrollbar-hide">
      <SyntaxHighlighter
        language={language}
        style={prism}
        customStyle={{
          margin: 0,
          padding: '1.5rem',
          background: 'transparent',
          fontSize: '13px'
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

function HeroSection() {
  const heroCode = `<?php

declare(strict_types=1);

use Httpful\\Request;

require_once __DIR__ . '/vendor/autoload.php';

// Readable request setup with retry + transport helpers
$response = Request::get('https://api.example.com/items')
    ->withBearerToken('secret-token')
    ->withRetry(3)
    ->withRetryDelay(1)
    ->withRetryMaxTime(10)
    ->withCookieJar('/tmp/httpful.cookies')
    ->withCaBundle('/etc/ssl/certs/ca-bundle.crt')
    ->withHttp2PriorKnowledge()
    ->send();

echo $response->getEffectiveUrl() . "\\n";
echo $response->getTransferHttpVersion() . "\\n";
echo $response->getTotalTime() . "\\n";`;

  return (
    <section className="flex-1 grid items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-12 lg:px-12 lg:py-24 max-w-[1400px] mx-auto w-full">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-[0.2em] rounded mb-6">
            Readable cURL for PHP
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.9] text-ink mb-6">
            Stop writing <br className="hidden sm:block" /><span className="text-accent">cURL soup.</span>
          </h1>
          
          <p className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-md mb-8">
            Build REST calls with a fluent API, smart parsing, async and parallel helpers, transport diagnostics, and PSR-3 / PSR-7 / PSR-17 / PSR-18 support.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a 
              href="#examples"
              className="px-8 py-4 bg-ink text-bg-primary font-bold text-sm uppercase tracking-widest hover:bg-accent transition-colors flex items-center justify-center whitespace-nowrap"
            >
              Get Started
            </a>
            
            <div className="w-full px-5 py-4 bg-ink/5 border border-ink/10 flex items-center gap-3 font-mono text-sm overflow-x-auto sm:w-auto">
              <span className="opacity-40 mr-3 shrink-0">$</span> 
              <span className="text-ink shrink-0">composer require voku/httpful</span>
              <button 
                onClick={() => navigator.clipboard.writeText('composer require voku/httpful')}
                className="text-ink-muted hover:text-ink transition-colors shrink-0 ml-auto"
                title="Copy to clipboard"
              >
                Copy
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative"
      >
        <div className="bg-bg-secondary rounded-xl border border-border shadow-2xl p-4 sm:p-6 relative">
          <div className="flex gap-1.5 mb-6 opacity-30">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-accent"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <CodeBlock code={heroCode} />
            <div className="absolute -bottom-4 right-3 sm:right-4 lg:-right-4 bg-accent text-bg-primary px-4 py-3 text-xs font-black uppercase tracking-tighter rounded shadow-lg">
              Retry + Transport
            </div>
          </div>
        </motion.div>
    </section>
  );
}

function WhySection() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 relative border-t border-b border-border bg-bg-secondary">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6 text-ink tracking-tighter">Why Httpful (fork)?</h2>
        <p className="text-lg sm:text-xl text-ink-muted leading-relaxed max-w-3xl mx-auto">
          Forked from nategood/httpful and extended with async requests, parallel execution, modern transport helpers, and PSR HTTP interfaces. It keeps cURL&apos;s practical controls without making every request read like low-level setup code.
        </p>
      </div>
    </section>
  );
}

function FeatureGrid() {
  const features = [
    {
      title: "Readable REST methods",
      desc: "GET, PUT, POST, DELETE, HEAD, PATCH and OPTIONS with a fluent API."
    },
    {
      title: "Smart parsing",
      desc: "Automatic payload serialization plus JSON, XML, HTML, CSV and form helpers."
    },
    {
      title: "Auth + TLS",
      desc: "Basic auth, bearer tokens, client-side certificates, CA bundles and pinned keys."
    },
    {
      title: "Retry + routing",
      desc: "Retries, cookie jars, Alt-Svc, HSTS, no-proxy, proxy tunnel, resolve and connect-to."
    },
    {
      title: "Modern HTTP",
      desc: "HTTP/2 prior knowledge, HTTP/3 and HTTP/3-only request helpers."
    },
    {
      title: "Async + parallel",
      desc: "Request::sendAsync() plus curl_multi-based parallel request execution."
    },
    {
      title: "Download + aliases",
      desc: "Request downloads, request templates, and curl-style helper aliases."
    },
    {
      title: "PSR compatibility",
      desc: "PSR-3 / PSR-7 / PSR-17 / PSR-18 interfaces with transfer metadata helpers."
    }
  ];

  return (
    <section className="border-y border-border overflow-hidden bg-bg-primary">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <div key={i} className={getFeatureCardClasses(i, features.length)}>
            <h3 className="text-accent font-bold uppercase text-[11px] tracking-widest">{f.title}</h3>
            <p className="text-xs text-ink-muted leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ComparisonSection() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 border-b border-border bg-bg-secondary">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border border border-border rounded-xl overflow-hidden shadow-xl">
          <div className="p-8 sm:p-10 flex flex-col items-center text-center bg-bg-primary">
            <h3 className="font-bold uppercase text-[11px] tracking-widest mb-4 text-ink-muted">Raw cURL</h3>
            <p className="text-ink-muted/70 text-sm">Powerful, but verbose.</p>
          </div>
          <div className="p-8 sm:p-10 flex flex-col items-center text-center bg-bg-primary">
            <h3 className="font-bold uppercase text-[11px] tracking-widest mb-4 text-ink-muted">Generic PSR client</h3>
            <p className="text-ink-muted/70 text-sm">Portable, but ceremony-heavy.</p>
          </div>
          <div className="p-8 sm:p-10 flex flex-col items-center text-center bg-accent/5">
            <h3 className="font-bold uppercase text-[11px] tracking-widest mb-4 text-accent">Httpful (fork)</h3>
            <p className="text-ink text-sm">Readable API with practical cURL-level controls.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const TABS = [
  {
    id: "github",
    name: "GitHub JSON",
    desc: "The README and examples/github.php both show the basic GitHub API flow: add a header, expect JSON, send, then read the parsed associative array.",
    code: `<?php

declare(strict_types=1);

// JSON Example via GitHub-API

require_once __DIR__ . '/vendor/autoload.php';

$uri = 'https://api.github.com/users/voku';
$response = \\Httpful\\Client::get_request($uri)
    ->withHeader('X-Foo-Header', 'Just as a demo')
    ->expectsJson()
    ->send();

$result = $response->getRawBody();

echo $result['name'] . ' joined GitHub on ' . \\date('M jS Y', \\strtotime($result['created_at'])) . "\\n";`
  },
  {
    id: "forms",
    name: "Forms + Uploads",
    desc: "examples/post_form.php covers the short helper, the PSR-style long version, and multipart uploads with withAttachment().",
    code: `<?php

declare(strict_types=1);

require_once __DIR__ . '/vendor/autoload.php';

// ------------------- SHORT VERSION

$uri = 'https://postman-echo.com/post';
$result = \\Httpful\\Client::post_form($uri, ['foo1' => 'PHP']);
echo $result['form']['foo1'] . "\\n"; // response from postman

// ------------------- LONG VERSION

$query = \\http_build_query(['foo1' => 'PHP']);
$http = new \\Httpful\\Factory();

$response = (new \\Httpful\\Client())->sendRequest(
    $http->createRequest(
        \\Httpful\\Http::POST,
        'https://postman-echo.com/post',
        \\Httpful\\Mime::FORM,
        $query
    )
);
$result = $response->getRawBody();
echo $result['form']['foo1'] . "\\n"; // response from postman

// ------------------- LONG VERSION + UPLOAD

$form = ['foo1' => 'PHP'];
$http = new \\Httpful\\Factory();

$filename = __DIR__ . '/../tests/static/test_image.jpg';

$response = (new \\Httpful\\Client())->sendRequest(
    $http->createRequest(
        \\Httpful\\Http::POST,
        'https://postman-echo.com/post',
        \\Httpful\\Mime::FORM,
        $form
    )->withAttachment(['foo2' => $filename])
);
$result = $response->getRawBody();
echo $result['form']['foo1'] . "\\n"; // response from postman
echo $result['files']['test_image.jpg'] . "\\n"; // response from postman`
  },
  {
    id: "mime",
    name: "Custom MIME",
    desc: "examples/overrideMimeHandler.php demonstrates both overriding an existing parser and registering your own MIME handler class.",
    code: `<?php

declare(strict_types=1);

use Httpful\\Handlers\\DefaultMimeHandler;
use Httpful\\Handlers\\XmlMimeHandler;
use Httpful\\Mime;
use Httpful\\Setup;

require_once __DIR__ . '/vendor/autoload.php';

// Example setting a namespace for the XMLHandler parser
$conf = ['namespace' => 'http://example.com'];
Setup::registerMimeHandler(Mime::XML, new XmlMimeHandler($conf));

class SimpleCsvMimeHandler extends DefaultMimeHandler
{
    public function parse($body)
    {
        return \\str_getcsv($body);
    }

    public function serialize($payload)
    {
        $serialized = '';

        foreach ($payload as $line) {
            $serialized .= '"' . \\implode('","', $line) . '"' . "\\n";
        }

        return $serialized;
    }
}

Setup::registerMimeHandler(Mime::CSV, new SimpleCsvMimeHandler());`
  },
  {
    id: "scraping",
    name: "HTML Parsing",
    desc: "examples/scraping_imdb.php shows HTML parsing through expectsHtml(), returning a simple_html_dom parser tree.",
    code: `<?php

declare(strict_types=1);

require_once __DIR__ . '/vendor/autoload.php';

function scraping_imdb(string $url): array
{
    $return = [];

    $response = \\Httpful\\Client::get_request($url)
        ->expectsHtml()
        ->disableStrictSSL()
        ->send();

    /** @var \\voku\\helper\\HtmlDomParser $dom */
    $dom = $response->getRawBody();

    $return['Title'] = $dom->find('title', 0)->innertext;

    $rating = $dom->find('.ratingValue strong', 0);
    if ($rating) {
        $return['Rating'] = $rating->getAttribute('title');
    }

    return $return;
}

$data = scraping_imdb('http://imdb.com/title/tt0335266/');

foreach ($data as $k => $v) {
    echo '<strong>' . $k . ' </strong>' . $v . '<br>';
}`
  },
  {
    id: "xml",
    name: "XML Request",
    desc: "examples/xml.php compares the complex, medium, and shortcut client styles; this docs version adds the missing URI on the complex request so the sample is actually runnable on the current fork.",
    code: `<?php

declare(strict_types=1);

use Httpful\\Mime;

require_once __DIR__ . '/vendor/autoload.php';

$uri = 'https://www.w3schools.com/xml/note.xml';

$responseComplex = (new \\Httpful\\Client())
    ->sendRequest(
        (
            new \\Httpful\\Request(
                \\Httpful\\Http::GET,
                Mime::PLAIN
            )
        )->withUriFromString($uri)
            ->followRedirects()
    );

$responseMedium = \\Httpful\\Client::get_request($uri)
    ->withExpectedType(Mime::PLAIN)
    ->followRedirects()
    ->send();

$responseSimple = \\Httpful\\Client::get($uri);

if (
    $responseComplex->getRawBody() === $responseSimple->getRawBody()
    &&
    $responseComplex->getRawBody() === $responseMedium->getRawBody()
) {
    echo ' - same output - ';
}`
  },
  {
    id: "async",
    name: "Async Helper",
    desc: "The 3.2.0 README adds Request::sendAsync() as the simplest way to hand a request off to an async client.",
    code: `<?php

$promise = \\Httpful\\Request::get('https://api.example.com/items')
    ->authenticateWithBearerToken('secret-token')
    ->sendAsync();

$response = $promise->wait();

echo $response->getCode() . "\\n";`
  },
  {
    id: "retry",
    name: "Retry + TLS",
    desc: "The current README highlights retry configuration, cookie persistence, CA trust, and negotiated transport metadata on the same fluent request.",
    code: `<?php

$response = \\Httpful\\Request::get('https://api.example.com/items')
    ->withBearerToken('secret-token')
    ->withRetry(3)
    ->withRetryDelay(1)
    ->withRetryMaxTime(10)
    ->withCookieJar('/tmp/httpful.cookies')
    ->withCaBundle('/etc/ssl/certs/ca-bundle.crt')
    ->withHttp2PriorKnowledge()
    ->send();

echo $response->getEffectiveUrl() . "\\n";
echo $response->getTransferHttpVersion() . "\\n";
echo $response->getTotalTime() . "\\n";`
  },
  {
    id: "parallel",
    name: "Parallel Auth",
    desc: "The README's parallel example combines ClientMulti with Basic Auth and keeps the callback shape used by the library itself.",
    code: `<?php

/** @var \\Httpful\\Response[] $results */
$results = [];
$multi = new \\Httpful\\ClientMulti(
    static function (\\Httpful\\Response $response, \\Httpful\\Request $request) use (&$results) {
        $results[] = $response;
    }
);

$request = (new \\Httpful\\Request(\\Httpful\\Http::GET))
    ->withUriFromString('https://postman-echo.com/basic-auth')
    ->withBasicAuth('postman', 'password');

$multi->add_request($request);
// $multi->add_request(...); // add more calls here

$multi->start();`
  }
];

function CodeTabsSection() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const activeData = TABS.find(t => t.id === activeTab)!;

  return (
    <section id="examples" className="px-4 py-20 sm:px-6 sm:py-32 max-w-7xl mx-auto w-full">
      <div className="text-center mb-16">
        <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6 text-ink tracking-tighter">Examples from the library</h2>
        <p className="text-ink-muted text-lg">Synced with the current README, changelog, and shipped example files, including an XML example fix for the current fork.</p>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-[250px_1fr] lg:gap-8 xl:gap-16">
        <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={getTabButtonClasses(activeTab === tab.id)}
            >
              {tab.name}
            </button>
          ))}
        </div>
        
        <div className="min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full flex flex-col"
            >
              <div className="mb-6 sm:mb-8 p-5 sm:p-6 bg-black/5 border border-border rounded-xl">
                <p className="text-sm leading-relaxed text-ink-muted">{activeData.desc}</p>
              </div>
              <div className="flex-1 bg-bg-secondary border border-border p-2 relative shadow-lg rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">{getExampleFilename(activeData.name)}</span>
                </div>
                <CodeBlock code={activeData.code} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-32 border-y border-border bg-bg-secondary">
      <div className="max-w-4xl mx-auto text-center relative">
        <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6 text-ink tracking-tighter">Start building better.</h2>
        <p className="text-lg sm:text-xl text-ink-muted mb-10 sm:mb-12 max-w-2xl mx-auto">
          Use it when you want readable HTTP calls without giving up cURL&apos;s useful low-level controls. Requires PHP 8.0+.
        </p>
        
        <div className="flex flex-col items-center gap-6">
          <div className="flex w-full max-w-md flex-col items-stretch gap-3 bg-bg-primary px-5 py-4 border border-border font-mono text-sm shadow-2xl sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-6">
            <span className="text-ink truncate">composer require voku/httpful</span>
            <button 
              onClick={() => navigator.clipboard.writeText('composer require voku/httpful')}
              className="min-h-11 px-3 py-2 text-accent hover:text-accent-dim transition-colors shrink-0 uppercase text-[10px] tracking-widest font-bold"
              title="Copy to clipboard"
            >
              Copy
            </button>
          </div>
          
          <a href="https://github.com/voku/httpful" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-ink hover:text-accent underline underline-offset-4 transition-colors uppercase tracking-widest text-[10px]">
            View Documentation on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-6 lg:px-12 py-6 bg-bg-secondary flex flex-col md:flex-row justify-between items-center border-t border-border gap-4">
      <div className="text-[10px] uppercase tracking-widest text-ink-muted font-medium text-center md:text-left">
        voku/httpful &copy; {new Date().getFullYear()} &bull; Maintained by Lars Moelleken
      </div>
      <div className="flex gap-4 items-center">
        <div className="w-2 h-2 rounded-full bg-green-500"></div>
        <span className="text-[10px] text-ink-muted uppercase tracking-widest font-medium">Stable Build v3.2.0</span>
      </div>
    </footer>
  );
}
