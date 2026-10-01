import assert from 'node:assert/strict';
import test from 'node:test';

// Run against `npm run build` followed by `npm start -- --port 3100`.
const base = process.env.CSP_TEST_URL || 'http://localhost:3100';

async function documentResponse(path = '/', headers = {}) {
  const response = await fetch(new URL(path, base), { headers });
  const html = await response.text();
  const policy = response.headers.get('content-security-policy') || '';
  const nonce = policy.match(/'nonce-([A-Za-z0-9+/]+=*)'/)?.[1];
  assert.ok(nonce, 'Document must receive a nonce-based CSP');
  assert.equal(Buffer.from(nonce, 'base64').length, 32);
  assert.match(response.headers.get('cache-control') || '', /no-store/);
  assert.doesNotMatch(policy, /'unsafe-eval'/);
  const scriptPolicy = policy.split(';').find((directive) => directive.trim().startsWith('script-src '));
  assert.ok(scriptPolicy);
  assert.doesNotMatch(scriptPolicy, /'unsafe-inline'|data:|https:/);
  assert.match(scriptPolicy, /'strict-dynamic'/);
  assert.match(policy, /script-src-attr 'none'/);
  assert.match(policy, /object-src 'none'/);
  assert.match(policy, /base-uri 'none'/);
  assert.match(policy, /frame-ancestors 'none'/);
  const scripts = [...html.matchAll(/<script\b([^>]*)>/gi)];
  assert.ok(scripts.length > 0, 'Check rendered scripts, not just the header');
  for (const [, attributes] of scripts) {
    assert.equal(attributes.match(/\bnonce="([^"]+)"/)?.[1], nonce,
      'Every initial framework and hydration script must match the response nonce');
  }
  return { response, html, nonce };
}

test('homepage renders authorized scripts and generates a fresh nonce for each response', async () => {
  const first = await documentResponse();
  const second = await documentResponse();
  assert.equal(first.response.status, 200);
  assert.match(first.html, /id="hero"/);
  assert.notEqual(first.nonce, second.nonce);
});

test('client headers cannot choose the nonce or bypass the policy', async () => {
  const { nonce, response } = await documentResponse('/', {
    'x-nonce': 'attacker-controlled',
    'content-security-policy': "script-src 'unsafe-inline'",
  });
  assert.equal(response.status, 200);
  assert.notEqual(nonce, 'attacker-controlled');
  assert.equal(response.headers.get('x-nonce'), null, 'Do not expose internal request headers');
});

test('Next.js prefetch responses also receive a fresh policy', async () => {
  const response = await fetch(new URL('/', base), {
    headers: { RSC: '1', 'next-router-prefetch': '1', purpose: 'prefetch' },
  });
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type') || '', /text\/x-component/);
  assert.match(response.headers.get('content-security-policy') || '', /'nonce-[A-Za-z0-9+/]+=*'/);
  assert.match(response.headers.get('cache-control') || '', /no-store/);
  await response.text();
});

test('404 documents are protected and can still hydrate', async () => {
  const { response } = await documentResponse('/csp-test-missing-page');
  assert.equal(response.status, 404);
});

test('static framework assets retain long-lived caching', async () => {
  const { html } = await documentResponse();
  const asset = html.match(/<script\b[^>]*src="(\/_next\/static\/[^" ]+)"/)?.[1];
  assert.ok(asset);
  const response = await fetch(new URL(asset, base));
  assert.equal(response.status, 200);
  assert.match(response.headers.get('cache-control') || '', /immutable/);
  assert.doesNotMatch(response.headers.get('cache-control') || '', /no-store/);
  await response.body?.cancel();
});
