# Checklist — Pronto para campanhas

Use este checklist para garantir que tudo está configurado antes de rodar campanhas.

---

## Variáveis de ambiente (Vercel / .env)

| Variável | Obrigatório | Uso |
|----------|-------------|-----|
| `DATABASE_URL` | Sim | Conexão PostgreSQL (Supabase) |
| `NEXTAUTH_SECRET` | Sim | Sessão do painel admin |
| `NEXTAUTH_URL` | Sim | URL canônica do site (ex: `https://www.institutonexxa.com`) |
| `NEXT_PUBLIC_META_PIXEL_ID` | Sim | ID do Pixel Meta (ex: `354680354031310`) |
| `META_ACCESS_TOKEN` | Sim | Token da Conversions API (Meta Business) |
| `PERFECTPAY_WEBHOOK_TOKEN` | Sim | Token do webhook configurado na PerfectPay |
| `META_TEST_EVENT_CODE` | Não | Remover ou deixar vazio em produção |

---

## Fluxo de tracking

- [ ] **Pixel:** carrega só se `NEXT_PUBLIC_META_PIXEL_ID` estiver definido
- [ ] **Páginas com checkout:** `/front`, `/upsell`, `/bd_front` chamam `initFacebookTracking()` no load e `openCheckoutWithTracking()` em todos os botões de compra
- [ ] **Redirect:** checkout abre na mesma aba (sem popup), com UTMs + `metadata_fbp` e `metadata_fbc` na URL
- [ ] **InitiateCheckout:** dispara save-meta-ids, meta-capi e track-event (com plan, value, fbp, fbc no metadata)

---

## Webhook PerfectPay

- [ ] **URL do webhook:** `https://seu-dominio.com/api/webhook/perfectpay`
- [ ] **Token:** mesmo valor de `PERFECTPAY_WEBHOOK_TOKEN` (body.token ou header `x-perfectpay-token`)
- [ ] **Status aprovado:** `sale_status_enum === 2` → Purchase CAPI + User + Payment
- [ ] **Refund/Chargeback:** `sale_status_enum === 7 ou 9` → revoga acesso (isPremium false)
- [ ] **Idempotência:** usa `body.code` como chave; não processa duas vezes a mesma venda

---

## CAPI (Conversions API)

- [ ] **Purchase:** envia todos os PII disponíveis (email, phone, fn, ln, city, state, country, zp, db) + fbp, fbc, IP, user-agent
- [ ] **InitiateCheckout:** envia fbp, fbc, value, content_ids; geo via headers Vercel quando disponível
- [ ] **Produção:** sem `META_TEST_EVENT_CODE` para eventos reais

---

## PerfectPay — repasse de fbp/fbc

Para melhor atribuição, configure na PerfectPay (se disponível) o repasse dos parâmetros da URL para o webhook:

- `metadata_fbp` → enviar no payload do webhook (ex: `metadata._fbp`)
- `metadata_fbc` → enviar no payload do webhook (ex: `metadata._fbc`)

Assim o webhook consegue enviar fbp/fbc na Purchase mesmo quando o usuário não está no banco.

---

## Admin

- [ ] **Login:** `/auth` ou `/api/auth/signin`; após login, redirect para `/admin`
- [ ] **Dashboard:** Eventos, Pagamentos, Usuários, Logs, Meus IDs Meta
- [ ] **NEXTAUTH_URL:** deve ser exatamente o domínio que o usuário usa para acessar (evitar cookie em domínio diferente)

---

## Resumo rápido

1. Variáveis de ambiente preenchidas (incluindo `NEXTAUTH_URL` com o domínio correto).
2. Webhook PerfectPay apontando para `/api/webhook/perfectpay` com o token correto.
3. Em produção, remover ou deixar vazio `META_TEST_EVENT_CODE`.
4. Testar um fluxo completo: clique em um CTA → checkout → pagamento de teste → verificar evento Purchase no Events Manager e registro no admin.
