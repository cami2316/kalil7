# 📖 Exemplo Prático: Adaptação do Template

Este documento mostra um exemplo real de como adaptar o template de **Biaggio Flooring** (Piso e Banheiro) para uma **empresa de Carpintaria**.

---

## 🔄 ANTES → DEPOIS

### INFORMAÇÕES DA EMPRESA

| Campo | Biaggio Flooring (Antes) | Carpintaria Silva (Depois) |
|-------|-------------------------|---------------------------|
| **companyName** | `'Biaggio Flooring'` | `'Carpintaria Silva'` |
| **niche** | `'Flooring & Bathroom Remodeling'` | `'Carpintaria & Marcenaria'` |
| **tagline** | `'Premium Craftsmanship'` | `'Madeira com Excelência'` |

---

### CONTATO

| Campo | Biaggio Flooring | Carpintaria Silva |
|-------|-----------------|-------------------|
| **phone** | `'321 4425003'` | `'11 98765 4321'` |
| **whatsapp** | `'3214425003'` | `'11987654321'` |
| **email** | `'biaggioflooringllc@gmail.com'` | `'contato@carpintariasilva.com.br'` |
| **instagram.handle** | `'@biaggioflooring'` | `'@carpintariasilva'` |
| **instagram.url** | `'https://www.instagram.com/biaggioflooring/'` | `'https://www.instagram.com/carpintariasilva/'` |

---

### LOCALIZAÇÃO

| Campo | Biaggio Flooring | Carpintaria Silva |
|-------|-----------------|-------------------|
| **city** | `'Orlando'` | `'São Paulo'` |
| **state** | `'Florida'` | `'São Paulo'` |
| **region** | `'Central Florida'` | `'Zona Sul de São Paulo'` |

#### serviceAreas

**Antes:**
```typescript
serviceAreas: [
  'Orlando',
  'Lake Nona',
  'Winter Park',
  'Celebration',
  'Greater Central Florida'
]
```

**Depois:**
```typescript
serviceAreas: [
  'Moema',
  'Brooklin',
  'Vila Mariana',
  'Itaim Bibi',
  'Zona Sul de SP'
]
```

---

### NÚMEROS

| Campo | Biaggio Flooring | Carpintaria Silva |
|-------|-----------------|-------------------|
| **yearsExperience** | `'15+'` | `'20+'` |
| **projectsCompleted** | `'500+'` | `'300+'` |

---

### HERO SECTION

**Antes:**
```typescript
heroTitle: 'Premium Flooring & Bathroom Remodeling in Central Florida',
heroSubtitle: 'Luxury flooring installation and bathroom remodeling in Central Florida. Trusted craftsmanship with over 15 years of experience.',
```

**Depois:**
```typescript
heroTitle: 'Móveis Planejados e Carpintaria sob Medida em São Paulo',
heroSubtitle: 'Fabricação artesanal de móveis personalizados e carpintaria de alta qualidade na Zona Sul de São Paulo. Mais de 20 anos transformando madeira em arte.',
```

---

### SERVIÇOS

**Antes (Pisos):**
```typescript
services: [
  {
    title: 'Flooring Installation',
    description: 'Hardwood, LVP, laminate, and tile installed with precision and long-lasting performance.',
    image: '/images/services/floor1.jpg',
    alt: 'Premium hardwood flooring installation',
  },
  // ...
]
```

**Depois (Carpintaria):**
```typescript
services: [
  {
    title: 'Móveis Planejados',
    description: 'Armários, guarda-roupas e móveis sob medida com acabamento artesanal e madeiras nobres.',
    image: '/images/services/moveis1.jpg',
    alt: 'Móveis planejados em madeira nobre',
  },
  {
    title: 'Portas e Janelas',
    description: 'Fabricação e instalação de portas, janelas e esquadrias em madeira maciça.',
    image: '/images/services/portas1.jpg',
    alt: 'Portas de madeira artesanais',
  },
  {
    title: 'Decks e Pergolados',
    description: 'Projetos externos em madeira tratada: decks, pergolados e revestimentos.',
    image: '/images/services/deck1.jpg',
    alt: 'Deck de madeira área externa',
  }
]
```

---

### VALORES/DIFERENCIAIS

**Antes (Pisos):**
```typescript
values: [
  {
    title: 'Precision Craftsmanship',
    description: 'Every layout, cut, and installation follows strict alignment and finish standards.'
  },
  // ...
]
```

**Depois (Carpintaria):**
```typescript
values: [
  {
    title: 'Trabalho Artesanal',
    description: 'Cada peça é confeccionada manualmente com técnicas tradicionais de marcenaria.'
  },
  {
    title: 'Madeiras Nobres',
    description: 'Utilizamos apenas madeiras certificadas e de primeira qualidade.'
  },
  {
    title: 'Projetos Personalizados',
    description: 'Cada móvel é único, desenhado especialmente para o seu espaço.'
  }
]
```

---

### STATS (Estatísticas)

**Antes:**
```typescript
stats: [
  { value: '15+', label: 'Years Experience' },
  { value: '500+', label: 'Completed Projects' },
  { value: 'Licensed', label: '& Insured' },
  { value: '5-Star', label: 'Customer Rating' }
]
```

**Depois:**
```typescript
stats: [
  { value: '20+', label: 'Anos de Experiência' },
  { value: '300+', label: 'Projetos Entregues' },
  { value: 'Certificado', label: 'FSC' },
  { value: '100%', label: 'Satisfação' }
]
```

---

## 🖼️ IMAGENS: O QUE SUBSTITUIR

### Pasta `/public/images/services/`

**Antes (Pisos e Banheiros):**
- `floor1.jpg` → Piso de madeira
- `floor 2.jpg` → Piso vinilico
- `bath.jpg` → Banheiro remodelado
- `bath04.jpg` → Detalhe de azulejo

**Depois (Carpintaria):**
- `moveis1.jpg` → Armário planejado
- `moveis2.jpg` → Estante de madeira
- `portas1.jpg` → Porta de madeira maciça
- `deck1.jpg` → Deck área externa

### Pasta `/public/images/portfolio/`

Substituir todas as 7 fotos por projetos concluídos da carpintaria:
- Móveis entregues
- Ambientes finalizados
- Detalhes de acabamento

### Pasta `/public/logo/`

Substituir `logo white.svg` pelo logo da Carpintaria Silva

---

## 🎨 CORES: EXEMPLO

**Biaggio Flooring (Pisos - cores neutras/modernas):**
```javascript
colors: {
  brand: {
    primary: '#c69c6d',   // Dourado/bege
    accent: '#d4a574',    // Marrom claro
  }
}
```

**Carpintaria Silva (madeira - cores quentes):**
```javascript
colors: {
  brand: {
    primary: '#8B4513',   // Marrom madeira (SaddleBrown)
    accent: '#D2691E',    // Laranja terroso (Chocolate)
  }
}
```

---

## 📝 TEXTOS: COMPARAÇÃO

### Título da Homepage

**Antes:**
> "Precision Flooring & Bathroom Remodeling Designed To Last"

**Depois:**
> "Carpintaria Artesanal com Madeira de Qualidade"

### Descrição no Footer

**Antes:**
> "Luxury flooring installation and bathroom remodeling across Central Florida. Family-owned. Detail-driven. Built on trust."

**Depois:**
> "Móveis planejados e carpintaria artesanal na Zona Sul de São Paulo. Empresa familiar. Madeira certificada. Qualidade garantida."

---

## ⏱️ RESUMO DO PROCESSO

1. **Coletar informações** do cliente (usar CHECKLIST_NOVO_CLIENTE.md)
2. **Editar** `/lib/siteConfig.ts` com novos dados
3. **Substituir** todas as imagens em `/public/images/`
4. **Atualizar** logo em `/public/logo/`
5. **Ajustar** cores em `tailwind.config.js` (se necessário)
6. **Testar** localmente (`npm run dev`)
7. **Build** (`npm run build`)
8. **Deploy** (Vercel, Netlify, etc)

---

## ✅ RESULTADO

Com essas mudanças, você transforma:

❌ Site de Pisos e Banheiros em Orlando  
✅ Site de Carpintaria em São Paulo

**Tempo total**: 2-3 horas  
**Código alterado**: ~1 arquivo principal (siteConfig.ts)  
**Imagens**: ~15-20 fotos

---

## 💡 DICA PRO

Para economizar tempo com múltiplos clientes do mesmo nicho (ex: 3 carpintarias), você pode:

1. Criar uma versão "modelo" configurada para carpintaria
2. Duplicar essa versão
3. Só ajustar nome, contato, localização e fotos

Isso reduz o tempo de 2-3h para apenas 30-45 minutos por cliente!

---

**Pronto!** Agora você tem um exemplo completo de como adaptar o template para qualquer tipo de negócio.
