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
    <div className="min-h-screen bg-bg-primary text-ink font-sans selection:bg-accent selection:text-bg-primary flex flex-col">
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

function Nav() {
  return (
    <nav className="relative z-20 flex justify-between items-center px-6 lg:px-12 py-8 border-b border-border">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-accent rounded flex items-center justify-center text-bg-primary font-black text-xl">H</div>
        <span className="font-display font-bold text-xl tracking-tight text-ink italic">Httpful (fork)</span>
      </div>
      <div className="flex items-center gap-6 lg:gap-8 text-sm font-medium tracking-wide uppercase opacity-70">
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

// Readable, chainable API
$response = Request::get('https://api.example.com')
    ->withBearerToken('your-token-here')
    ->withRetry(3)
    ->expectsJson()
    ->send();

if ($response->isSuccess()) {
    $data = $response->getRawBody();
    if (\\is_array($data) && isset($data['status'])) {
        echo $data['status'] . "\\n";
    }
}`;

  return (
    <section className="flex-1 grid lg:grid-cols-2 gap-12 px-6 lg:px-12 py-16 lg:py-24 items-center max-w-[1400px] mx-auto w-full">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-[0.2em] rounded mb-6">
            Readable cURL for PHP
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.9] text-ink mb-6">
            Stop writing <br className="hidden sm:block" /><span className="text-accent">cURL soup.</span>
          </h1>
          
          <p className="text-lg text-ink-muted leading-relaxed max-w-md mb-8">
            Build REST calls with a chainable API, smart MIME parsing, retries, parallel requests, async helpers, transfer diagnostics, and PSR compatibility.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a 
              href="#examples"
              className="px-8 py-4 bg-ink text-bg-primary font-bold text-sm uppercase tracking-widest hover:bg-accent transition-colors flex items-center justify-center whitespace-nowrap"
            >
              Get Started
            </a>
            
            <div className="px-6 py-4 bg-ink/5 border border-ink/10 flex items-center font-mono text-sm max-w-full overflow-x-auto">
              <span className="opacity-40 mr-3 shrink-0">$</span> 
              <span className="text-ink shrink-0 mr-4">composer require voku/httpful</span>
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
        <div className="bg-bg-secondary rounded-xl border border-border shadow-2xl p-6 relative">
          <div className="flex gap-1.5 mb-6 opacity-30">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-accent"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <CodeBlock code={heroCode} />
          <div className="absolute -bottom-4 right-4 lg:-right-4 bg-accent text-bg-primary px-4 py-3 text-xs font-black uppercase tracking-tighter rounded shadow-lg">
            Chainable API
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function WhySection() {
  return (
    <section className="py-24 px-6 relative border-t border-b border-border bg-bg-secondary">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-display text-4xl font-bold mb-6 text-ink tracking-tighter">Why Httpful (fork)?</h2>
        <p className="text-xl text-ink-muted leading-relaxed max-w-3xl mx-auto">
          Raw cURL is powerful but noisy. Many HTTP clients are clean but abstract away the useful cURL controls. Httpful (fork) sits in the practical middle: readable request code with access to the knobs you need in real systems.
        </p>
      </div>
    </section>
  );
}

function FeatureGrid() {
  const features = [
    {
      title: "Readable REST methods",
      desc: "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS."
    },
    {
      title: "Smart MIME handling",
      desc: "JSON, XML, HTML, CSV, forms, uploads and custom handlers."
    },
    {
      title: "Auth helpers",
      desc: "Basic auth, bearer tokens, client-side certificates."
    },
    {
      title: "Operational controls",
      desc: "Retry, timeout, cookie jar, TLS, CA bundle, pinned public key."
    },
    {
      title: "Modern transport helpers",
      desc: "HTTP/2, HTTP/3, Alt-Svc, HSTS, proxy and routing helpers."
    },
    {
      title: "Parallel execution",
      desc: "curl_multi wrapper via ClientMulti."
    },
    {
      title: "PSR compatibility",
      desc: "PSR-7, PSR-17, PSR-18 and PSR-3 integration points."
    },
    {
      title: "Debug visibility",
      desc: "Status helpers, transfer metadata and response debug summaries."
    }
  ];

  return (
    <section className="border-y border-border overflow-hidden bg-bg-primary">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <div key={i} className="p-8 border-b border-border border-r lg:[&:nth-child(4n)]:border-r-0 sm:max-lg:[&:nth-child(2n)]:border-r-0 flex flex-col gap-3 group hover:bg-black/5 transition-colors min-h-[160px] justify-center">
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
    <section className="py-24 px-6 border-b border-border bg-bg-secondary">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border border border-border rounded-xl overflow-hidden shadow-xl">
          <div className="p-10 flex flex-col items-center text-center bg-bg-primary">
            <h3 className="font-bold uppercase text-[11px] tracking-widest mb-4 text-ink-muted">Raw cURL</h3>
            <p className="text-ink-muted/70 text-sm">Powerful, but verbose.</p>
          </div>
          <div className="p-10 flex flex-col items-center text-center bg-bg-primary">
            <h3 className="font-bold uppercase text-[11px] tracking-widest mb-4 text-ink-muted">Generic PSR client</h3>
            <p className="text-ink-muted/70 text-sm">Portable, but ceremony-heavy.</p>
          </div>
          <div className="p-10 flex flex-col items-center text-center bg-accent/5">
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
    id: "chainable",
    name: "Chainable Build",
    desc: "Readable by default. No curl_setopt() archaeology. Build the request where you read it: method, URL, headers, expected MIME type, auth, retry and send.",
    code: `<?php

declare(strict_types=1);

use Httpful\\Request;

require_once __DIR__ . '/vendor/autoload.php';

$response = Request::get('https://api.example.com/users')
    ->withAddedHeader('X-App', 'demo')
    ->expectsJson()
    ->send();

if (!$response->isSuccess()) {
    throw new \\RuntimeException('Request failed: ' . $response->getTransferHttpVersion());
}

$users = $response->getRawBody();`
  },
  {
    id: "knobs",
    name: "Controls & TLS",
    desc: "Production knobs without production noise. Retries, cookies, TLS options, modern HTTP version helpers and transfer metadata are available directly on the flow.",
    code: `<?php

declare(strict_types=1);

use Httpful\\Request;

require_once __DIR__ . '/vendor/autoload.php';

$response = Request::get('https://api.example.com/items')
    ->withBearerToken('replace-with-token')
    ->withRetry(3)
    ->withRetryDelay(1)
    ->withRetryMaxTime(10)
    ->withCookieJar(\\sys_get_temp_dir() . '/httpful.cookies')
    ->withHttp2PriorKnowledge()
    ->expectsJson()
    ->send();

if ($response->hasErrors()) {
    throw new \\RuntimeException($response->debugInfo());
}

echo 'HTTP version: ' . $response->getTransferHttpVersion() . "\\n";
echo 'Total time: ' . $response->getTotalTime() . "\\n";`
  },
  {
    id: "parallel",
    name: "Parallel Requests",
    desc: "Do many requests without pretending loops are concurrency. Httpful (fork) wraps curl_multi behind a small API for parallel request execution.",
    code: `<?php

declare(strict_types=1);

use Httpful\\ClientMulti;
use Httpful\\Request;
use Httpful\\Response;

require_once __DIR__ . '/vendor/autoload.php';

/** @var list<Response> $responses */
$responses = [];

$multi = new ClientMulti(
    static function (Response $response, Request $request) use (&$responses): void {
        $responses[] = $response;
    }
);

$multi
    ->add_request(Request::get('https://api.example.com/users')->expectsJson())
    ->add_request(Request::get('https://api.example.com/projects')->expectsJson())
    ->add_request(Request::get('https://api.example.com/releases')->expectsJson());

$multi->start();

foreach ($responses as $response) {
    echo $response->getStatusCode() . ' ' . $response->getEffectiveUrl() . "\\n";
}`
  },
  {
    id: "psr",
    name: "PSR Factory",
    desc: "PSR-compatible where it matters. Use Httpful (fork) as a fluent client, or plug its factories into PSR-based code.",
    code: `<?php

declare(strict_types=1);

use Httpful\\Factory;
use Httpful\\Http;
use Httpful\\Mime;

require_once __DIR__ . '/vendor/autoload.php';

$factory = new Factory();

$request = $factory->createRequest(
    Http::POST,
    'https://api.example.com/events',
    Mime::JSON,
    \\json_encode(['event' => 'user.created'], \\JSON_THROW_ON_ERROR)
);

$response = $factory->createResponse(202);

echo $request->getMethod() . "\\n";
echo $response->getStatusCode() . "\\n";`
  },
  {
    id: "mime",
    name: "Custom MIME",
    desc: "Parsing is not hardcoded. Register custom MIME handlers when your API speaks CSV, vendor JSON, XML variants, or whatever format someone invented.",
    code: `<?php

declare(strict_types=1);

use Httpful\\Handlers\\DefaultMimeHandler;
use Httpful\\Setup;

require_once __DIR__ . '/vendor/autoload.php';

final class CsvMimeHandler extends DefaultMimeHandler
{
    public function parse($body): array
    {
        if (!\\is_string($body) || $body === '') return [];
        return \\array_map(
            static fn (string $line): array => \\str_getcsv($line),
            \\explode("\\n", \\trim($body))
        );
    }

    public function serialize($payload): string
    {
        return \\implode("\\n", \\array_map(
            static fn (array $row): string => \\implode(',', $row),
            $payload
        ));
    }
}

Setup::registerMimeHandler('text/csv', new CsvMimeHandler());`
  },
  {
    id: "error",
    name: "Detailed Errors",
    desc: "Centralized error handling and detailed diagnostics for robust integrations.",
    code: `<?php

declare(strict_types=1);

use Httpful\\Request;
use Httpful\\Exception\\ConnectionErrorException;

require_once __DIR__ . '/vendor/autoload.php';

try {
    $response = Request::get('https://api.example.com/fragile-endpoint')
        ->withRetry(3)
        ->expectsJson()
        ->send();

    if ($response->hasErrors()) {
        $diagnostics = $response->getRawHeaders();
        throw new \\RuntimeException(
            "API Error ({$response->getStatusCode()}): " . 
            $response->getErrorMessage() . "\\n" .
            \\print_r($diagnostics, true)
        );
    }
} catch (ConnectionErrorException $e) {
    // Centralized connection error handling
    \\error_log("Connection failed: " . $e->getMessage());
    throw $e;
}`
  },
  {
    id: "data-formats",
    name: "Data Formats",
    desc: "Seamlessly handle JSON, forms, and HTML. Fetch APIs, post forms, upload files, or even scrape DOM elements.",
    code: `<?php

// JSON Example via GitHub-API

require_once __DIR__ . '/vendor/autoload.php';

$uri = 'https://api.github.com/users/voku';
$response = \\Httpful\\Client::get_request($uri)
    ->withHeader('X-Foo-Header', 'Just as a demo')
    ->expectsJson()
    ->send();

$result = $response->getRawBody();

echo $result['name'] . ' joined GitHub on ' . \\date('M jS Y', \\strtotime($result['created_at'])) . "\\n";

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
echo $result['files']['test_image.jpg'] . "\\n"; // response from postman

// ------------------- HTML SCRAPING

function scraping_imdb(string $url): array
{
    // init
    $return = [];

    // create HTML DOM
    $response = \\Httpful\\Client::get_request($url)
        ->expectsHtml()
        ->disableStrictSSL()
        ->send();

    /** @var \\voku\\helper\\HtmlDomParser $dom */
    $dom = $response->getRawBody();

    // get title
    $return['Title'] = $dom->find('title', 0)->innertext;

    // get rating
    $val = $dom->find('.ratingValue strong', 0);
    if ($val) {
        $return['Rating'] = $val->getAttribute('title');
    }

    return $return;
}

// -----------------------------------------------------------------------------

$data = scraping_imdb('http://imdb.com/title/tt0335266/');

foreach ($data as $k => $v) {
    echo '<strong>' . $k . ' </strong>' . $v . '<br>';
}`
  },
  {
    id: "async",
    name: "Async Promises",
    desc: "Non-blocking HTTP requests using promises with built-in retry logic. Send multiple requests asynchronously and wait for all to complete.",
    code: `<?php

// init
$user = 'suckup_de';
$ARTICLES_ENDPOINT = 'https://dev.to/api/articles?page=1&per_page=2';

// Prepare client-side promise handling.
$client = new \\Httpful\\ClientPromise();

// Send a simple client-side request. (non async)
$articles = \\Httpful\\Request::get($ARTICLES_ENDPOINT . '?username=' . $user)
    ->withExpectedType(\\Httpful\\Mime::JSON)
    ->withRetry(2) // Retry up to 2 times on transient errors
    ->withRetryDelay(1) // Wait 1 second between retries
    ->send()
    ->getRawBody();

foreach ($articles as $article) {
    // Representation of an outgoing, client-side request.
    $request = \\Httpful\\Request::get($ARTICLES_ENDPOINT . '/' . $article['id'])
        ->withExpectedType(\\Httpful\\Mime::JSON)
        ->withRetry(3) // Configure up to 3 retries for async calls
        ->withRetryDelay(2); // 2 second delay between attempts

    // Sends a PSR-7 request in an asynchronous way.
    $client->sendAsyncRequest($request);
}

$promise = $client->getPromise();

// Add behavior for when the promise is resolved or rejected.
/** @var \\Httpful\\Response[] $results */
$results = [];
$promise->then(static function (\\Httpful\\Response $response, \\Httpful\\Request $request) use (&$results) {
    $results[] = $response;
});

// Wait for the promise to be fulfilled or rejected.
$promise->wait();

echo "Processed " . \\count($results) . " articles concurrently.\\n";`
  },
  {
    id: "auth",
    name: "Authentication",
    desc: "Built-in helpers for common authentication schemes: Basic Auth, Bearer Tokens, and more.",
    code: `<?php

require_once __DIR__ . '/vendor/autoload.php';

// ------------------- BASIC AUTHENTICATION

$response = \\Httpful\\Request::get('https://api.example.com/protected')
    ->withBasicAuth('username', 'password')
    ->expectsJson()
    ->send();

// ------------------- BEARER TOKEN (OAUTH 2 / JWT)

$response = \\Httpful\\Request::get('https://api.example.com/profile')
    ->withBearerToken('your-super-secret-token')
    ->expectsJson()
    ->send();

// ------------------- CUSTOM AUTH HEADER

$response = \\Httpful\\Request::get('https://api.example.com/custom-auth')
    ->withHeader('X-API-Key', 'your-api-key-here')
    ->expectsJson()
    ->send();`
  },
  {
    id: "diagnostics",
    name: "Diagnostics & cURL",
    desc: "Set low-level cURL options and leverage detailed transfer diagnostics to handle advanced connection requirements.",
    code: `<?php

require_once __DIR__ . '/vendor/autoload.php';

use Httpful\\Client;
use Httpful\\Mime;

$method = 'POST'; // e.g. GET or POST
$url = 'https://api.bitwarden.com/v1/items';
$session_token = 'secret-token';
$timeoutInSeconds = 10;
$rawBody = '{"name":"test"}';
$mime = Mime::JSON;

try {
    $response = match ($method) {
        'POST' => Client::post_request($url, $rawBody, $mime)
            ->withHeader('Authorization', 'Bearer ' . $session_token)
            ->withTimeout($timeoutInSeconds)
            ->withCurlOption(\\CURLOPT_NOPROXY, "api.bitwarden.com")
            ->send(),
        'GET' => Client::get_request($url, null, $mime)
            ->withHeader('Authorization', 'Bearer ' . $session_token)
            ->withTimeout($timeoutInSeconds)
            ->withCurlOption(\\CURLOPT_NOPROXY, "api.bitwarden.com")
            ->send(),
        default => throw new \\InvalidArgumentException("Unsupported HTTP method: " . $method)
    };

    if ($response->hasErrors()) {
        // debugInfo() provides extensive cURL transfer details for troubleshooting
        throw new \\RuntimeException('API Error: ' . $response->debugInfo(), $response->getStatusCode());
    }
    
    echo "Request successful!\\n";
} catch (\\Exception $e) {
    echo "Exception caught: " . $e->getMessage() . "\\n";
}`
  }
];

function CodeTabsSection() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const activeData = TABS.find(t => t.id === activeTab)!;

  return (
    <section id="examples" className="py-32 px-6 max-w-7xl mx-auto w-full">
      <div className="text-center mb-16">
        <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6 text-ink tracking-tighter">See it in action.</h2>
        <p className="text-ink-muted text-lg">Clean, readable, and powerful. Explore the patterns.</p>
      </div>
      
      <div className="grid lg:grid-cols-[250px_1fr] gap-8 xl:gap-16">
        <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-left px-5 py-4 transition-all whitespace-nowrap lg:whitespace-normal shrink-0 border-l-2 ${
                activeTab === tab.id 
                  ? 'border-accent bg-accent/10 text-ink font-semibold' 
                  : 'border-transparent text-ink-muted hover:border-border hover:text-ink hover:bg-black/5'
              }`}
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
              <div className="mb-8 p-6 bg-black/5 border border-border rounded-xl">
                <p className="text-sm leading-relaxed text-ink-muted">{activeData.desc}</p>
              </div>
              <div className="flex-1 bg-bg-secondary border border-border p-2 relative shadow-lg rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">{activeData.name.toLowerCase().replace(' ', '_')}.php</span>
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
    <section className="py-32 px-6 border-y border-border bg-bg-secondary">
      <div className="max-w-4xl mx-auto text-center relative">
        <h2 className="font-display text-5xl font-bold mb-6 text-ink tracking-tighter">Start building better.</h2>
        <p className="text-xl text-ink-muted mb-12 max-w-2xl mx-auto">
          Use it when you want readable HTTP calls without giving up cURL's useful low-level controls.
        </p>
        
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center justify-between gap-8 bg-bg-primary px-6 py-4 border border-border font-mono text-sm w-full max-w-md shadow-2xl">
            <span className="text-ink truncate">composer require voku/httpful</span>
            <button 
              onClick={() => navigator.clipboard.writeText('composer require voku/httpful')}
              className="text-accent hover:text-accent-dim transition-colors shrink-0 uppercase text-[10px] tracking-widest font-bold"
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

